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
	IconButton,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { ImNotification } from "react-icons/im";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { usePagination } from "../../Providers/Pagination";
import { usePatients } from "../../Providers/Patients";
import Pagination from "../Pagination";
import PatientLabel from "./PatientLabel";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

//COMPONENTE

const PatientsTable = () => {
	const {
		patientsList,
		searchPatient,
		formattedPatientInfos,
		filteredList,
		setPatientsList,
		setFilteredList,
	} = usePatients();
	const { changePage } = usePagination();
	const location = useLocation();
	const params = useParams();
	const [pathname, setPathname] = useState(location.pathname);
	const [genderIsActive, setGenderIsActive] = useState(false);
	const [currentList, setCurrentList] = useState(patientsList);

	const handleGenderIsActive = () => {
		setGenderIsActive(!genderIsActive);
	};

	//RENDERIZA A LISTA DE NOMES BUSCADOS

	useEffect(() => {
		params.pageIndex && changePage(params.pageIndex);
	}, []);

	useEffect(() => {
		if (!searchPatient) {
			if (genderIsActive) {
				setCurrentList([
					...patientsList.filter(
						(patient) => patient.gender === "female"
					),
					...patientsList.filter(
						(patient) => patient.gender === "male"
					),
				]);
			} else setCurrentList(patientsList);
		}

		if (searchPatient) {
			if (genderIsActive) {
				setCurrentList([
					...filteredList.filter(
						(patient) => patient.gender === "female"
					),
					...filteredList.filter(
						(patient) => patient.gender === "male"
					),
				]);
			} else setCurrentList(filteredList);
		}
	}, [genderIsActive, patientsList, searchPatient]);

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
								<Th>
									Gender
									<IconButton
										aria-label="Search database"
										variant={"ghost"}
										icon={
											genderIsActive ? (
												<IoIosArrowUp />
											) : (
												<IoIosArrowDown />
											)
										}
										onClick={() => {
											handleGenderIsActive();
										}}
									/>
								</Th>
								<Th>Birthday</Th>
								<Th>Country</Th>
								<Th isNumeric>Actions</Th>
							</Tr>
						</Thead>

						{/* TABLE BODY */}
						<Tbody>
							{!searchPatient
								? currentList.map((patient) => {
										const {
											id,
											name,
											gender,
											country,
											birthdayMonth,
										} = formattedPatientInfos(patient);

										return (
											<PatientLabel
												name={name}
												gender={gender}
												country={country}
												birthdayMonth={birthdayMonth}
												patient={patient}
												key={id}
												pathname={pathname}
											/>
										);
								  })
								: currentList.map((patient) => {
										const {
											id,
											name,
											gender,
											country,
											birthdayMonth,
										} = formattedPatientInfos(patient);

										const locationPath = toString(
											location.pathname
										);

										return (
											<PatientLabel
												name={name}
												gender={gender}
												country={country}
												birthdayMonth={birthdayMonth}
												patient={patient}
												key={id}
												pathname={pathname}
											/>
										);
								  })}
						</Tbody>
						<Tfoot></Tfoot>
					</Table>
				</TableContainer>
			)}

			{/* ABRE MODAL COM INFORMACOES PERSONALIZADAS SOBRE O PACIENTE */}
			<Outlet />
		</>
	);
};

export default PatientsTable;
