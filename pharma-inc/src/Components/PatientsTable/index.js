import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableContainer,
	Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { VscRootFolderOpened } from "react-icons/vsc";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { usePagination } from "../../Providers/Pagination";
import { usePatients } from "../../Providers/Patients";
import Pagination from "../Pagination";

const formattedPatient = (patient) => {
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
	const gender = patient.gender;
	const name = patient.name.first + " " + patient.name.last;
	const birthdayMonth = months[date.getMonth()];
	const country = patient.location.country;

	return {
		id,
		name,
		gender,
		birthdayMonth,
		country,
	};
};

//COMPONENTE

const PatientsTable = () => {
	const { patientsList, searchPatient, setSelectedPatient, selectedPatient } =
		usePatients();
	const { changePage } = usePagination();
	const params = useParams();
	const [filteredList, setFilteredList] = useState(patientsList);
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = (patient) => {
		setSelectedPatient(patient);
		navigate(`${location.pathname}/${patient.login.uuid}`);
	};

	//RENDERIZA A LISTA DE NOMES BUSCADOS
	useEffect(() => {
		const newFilteredList = patientsList.filter((patient) => {
			const { name, country } = formattedPatient(patient);
			const searchString = searchPatient.toLowerCase();
			if (
				name.toLowerCase().includes(searchString) ||
				country.toLowerCase().includes(searchString)
			)
				return patient;
		});
		setFilteredList(newFilteredList);
		if (!searchPatient) setFilteredList(patientsList);
	}, [searchPatient]);

	useEffect(() => {
		params.pageIndex && changePage(params.pageIndex);
	}, []);

	return (
		<>
			<Pagination />
			<TableContainer width={"100%"} m={"3rem 0"} borderRadius={4}>
				<Table variant="simple">
					{/* //TABLE HEADER */}
					<Thead bgColor={"yellow.500"} h={"70px"}>
						<Tr>
							<Th>Name</Th>
							<Th>Gender</Th>
							<Th>Birthday</Th>
							<Th>Country</Th>
							<Th isNumeric>Actions</Th>
						</Tr>
					</Thead>
					{/* //TABLE BODY */}
					<Tbody>
						{!searchPatient
							? patientsList.map((patient, index) => {
									const {
										id,
										name,
										gender,
										country,
										birthdayMonth,
									} = formattedPatient(patient);

									return (
										<Tr
											key={id}
											bgColor={
												index % 2 === 0
													? "#FFF"
													: "gray.50"
											}
										>
											<Td>{name}</Td>
											<Td>{gender}</Td>
											<Td>{birthdayMonth}</Td>
											<Td>{country}</Td>
											<Td isNumeric>
												<Button
													rightIcon={
														<VscRootFolderOpened />
													}
													colorScheme="blue"
													variant="link"
													onClick={() => {
														handleClick(patient);
													}}
												>
													details
												</Button>
											</Td>
										</Tr>
									);
							  })
							: filteredList.map((patient, index) => {
									const {
										id,
										name,
										gender,
										country,
										birthdayMonth,
									} = formattedPatient(patient);

									return (
										<Tr
											key={id}
											bgColor={
												index % 2 === 0
													? "#FFF"
													: "gray.50"
											}
										>
											<Td>{name}</Td>
											<Td>{gender}</Td>
											<Td>{birthdayMonth}</Td>
											<Td>{country}</Td>
											<Td isNumeric>
												<Button
													rightIcon={
														<VscRootFolderOpened />
													}
													colorScheme="blue"
													variant="link"
													onClick={() => {
														handleClick(patient);
													}}
												>
													details
												</Button>
											</Td>
										</Tr>
									);
							  })}
					</Tbody>
					<Tfoot></Tfoot>
				</Table>
			</TableContainer>
			<Outlet />
		</>
	);
};

export default PatientsTable;
