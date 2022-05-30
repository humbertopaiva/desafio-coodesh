import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	TableContainer,
	Heading,
	Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImNotification } from "react-icons/im";
import { Outlet, useParams } from "react-router-dom";
import { usePagination } from "../../Providers/Pagination";
import { usePatients } from "../../Providers/Patients";
import Pagination from "../Pagination";
import PatientLabel from "./PatientLabel";

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
	const { patientsList, searchPatient } = usePatients();
	const { changePage } = usePagination();
	const params = useParams();
	const [filteredList, setFilteredList] = useState(patientsList);

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
			{searchPatient.length > 0 && filteredList.length === 0 ? (
				<Flex direction={"column"} align={"center"} m={10}>
					<ImNotification fontSize={50} />
					<Heading>Patient not found</Heading>
				</Flex>
			) : (
				<TableContainer width={"100%"} m={"3rem 0"} borderRadius={4}>
					<Table variant="simple">
						{/* //TABLE HEADER */}
						<Thead h={"70px"}>
							<Tr fontSize={20}>
								<Th width={"35%"}>Name</Th>
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
											<PatientLabel
												name={name}
												gender={gender}
												country={country}
												birthdayMonth={birthdayMonth}
												patient={patient}
												key={id}
											/>
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
											<PatientLabel
												name={name}
												gender={gender}
												country={country}
												birthdayMonth={birthdayMonth}
												patient={patient}
												key={id}
											/>
										);
								  })}
						</Tbody>
						<Tfoot></Tfoot>
					</Table>
				</TableContainer>
			)}
			<Outlet />
		</>
	);
};

export default PatientsTable;
