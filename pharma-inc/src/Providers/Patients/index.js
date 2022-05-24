import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [patientsList, setPatientsList] = useState([]);

	useEffect(() => {
		const getList = async () => {
			const response = await axios.get(
				"https://randomuser.me/api/?page=1&results=10"
			);
			const info = response.data.info;
			const peopleList = response.data.results;

			console.log("INFO", info);
			console.log("People List", peopleList);

			setCurrentPage(info.page);
			setPatientsList([...patientsList, ...peopleList]);
		};

		getList();
	}, []);

	return (
		<PatientsContext.Provider value={{ currentPage, patientsList }}>
			{children}
		</PatientsContext.Provider>
	);
};

export const usePatients = () => useContext(PatientsContext);
