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
	Skeleton,
	Spinner,
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
							// PATIENT INFOS

							const months = [
								"Jan",
								"Fev",
								"Mar",
								"Abr",
								"Mai",
								"Jun",
								"Jul",
								"Ago",
								"Set",
								"Out",
								"Nov",
								"Dez",
							];
							const date = new Date(patient.dob.date);
							const id = patient.login.uuid;
							const name =
								patient.name.first + " " + patient.name.last;
							const birthdayMonth = months[date.getMonth()];

							return (
								<Tr
									key={id}
									bgColor={
										index % 2 === 0 ? "#FFF" : "gray.50"
									}
								>
									<Td>{name}</Td>
									<Td>{patient.gender}</Td>
									<Td>{birthdayMonth}</Td>
									<Td isNumeric>
										<Button
											rightIcon={<VscRootFolderOpened />}
											colorScheme="blue"
											variant="link"
										>
											see more
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
