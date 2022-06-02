import { Tr, Td, Button } from "@chakra-ui/react";
import { useState } from "react";
import { VscRootFolderOpened } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { usePagination } from "../../../Providers/Pagination";
import { usePatients } from "../../../Providers/Patients";

const PatientLabel = ({ name, gender, birthdayMonth, country, patient }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setSelectedPatient } = usePatients();
	const { currentPage } = usePagination();
	const [pageUrl, setPageUrl] = useState(currentPage);

	const handleClick = () => {
		setSelectedPatient(patient);
		navigate(`/pages/${pageUrl}/${patient.login.uuid}`);
	};

	return (
		<Tr
			borderBottom={"1px solid #DCDCDC"}
			_hover={{
				bgColor: "gray.100",
			}}
		>
			<Td>{name}</Td>
			<Td>{gender}</Td>
			<Td>{birthdayMonth}</Td>
			<Td>{country}</Td>
			<Td isNumeric>
				<Button
					rightIcon={<VscRootFolderOpened />}
					colorScheme="blue"
					variant="solid"
					onClick={() => {
						handleClick();
					}}
				>
					details
				</Button>
			</Td>
		</Tr>
	);
};

export default PatientLabel;
