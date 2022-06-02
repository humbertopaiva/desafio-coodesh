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
import { Outlet, useLocation, useParams } from "react-router-dom";
import { usePagination } from "../../Providers/Pagination";
import { usePatients } from "../../Providers/Patients";
import Pagination from "../Pagination";
import PatientLabel from "./PatientLabel";

//COMPONENTE

const PatientsTable = () => {
	const { patientsList, searchPatient, formattedPatientInfos, filteredList } =
		usePatients();
	const { changePage } = usePagination();
	const location = useLocation();
	const params = useParams();
	const [pathname, setPathname] = useState(location.pathname);

	//RENDERIZA A LISTA DE NOMES BUSCADOS

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

						{/* TABLE BODY */}
						<Tbody>
							{!searchPatient
								? patientsList.map((patient) => {
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
								: filteredList.map((patient) => {
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
