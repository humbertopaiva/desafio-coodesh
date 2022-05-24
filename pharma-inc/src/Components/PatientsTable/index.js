import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Stack,
	Button,
	Icon,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { VscRootFolderOpened } from "react-icons/vsc";
import { usePatients } from "../../Providers/Patients";

const PatientsTable = () => {
	const { patientsList } = usePatients();
	useEffect(() => {
		console.log(patientsList);
	}, []);

	return (
		<TableContainer width={"100%"} m={"3rem 0"} borderRadius={4}>
			<Table variant="simple">
				<Thead bgColor={"yellow.500"} h={"70px"}>
					<Tr>
						<Th>Name</Th>
						<Th>Gender</Th>
						<Th>Birthday</Th>
						<Th isNumeric>Actions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{patientsList &&
						patientsList.map((patient, index) => {
							const date = new Date(patient.dob.date);
							return (
								<Tr
									key={patient.login.uuid}
									bgColor={
										index % 2 === 0 ? "#FFF" : "gray.50"
									}
								>
									<Td>
										{patient.name.first + patient.name.last}
									</Td>
									<Td>{patient.gender}</Td>
									<Td>{date.getMonth()}</Td>
									<Td isNumeric paddingX={0}>
										<Button
											rightIcon={<VscRootFolderOpened />}
											colorScheme="blue"
											variant="ghost"
										>
											Ver mais
										</Button>
									</Td>
								</Tr>
							);
						})}
				</Tbody>
				<Tfoot></Tfoot>
			</Table>
		</TableContainer>
	);
};

export default PatientsTable;
