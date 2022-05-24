import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [patientsList, setPatientsList] = useState([]);
	const [isLoading, setIsLoagind] = useState(true);

	useEffect(() => {
		loadPatients();
	}, []);

	const loadPatients = async () => {
		setIsLoagind(true);
		const response = await axios.get(
			`https://randomuser.me/api/?page=${
				currentPage + 1
			}&results=50&seed=ab`
		);
		const info = response.data.info;
		const peopleList = response.data.results;
		setCurrentPage(info.page);
		setPatientsList([...patientsList, ...peopleList]);
		setIsLoagind(false);
	};

	return (
		<PatientsContext.Provider
			value={{ currentPage, patientsList, loadPatients, isLoading }}
		>
			{children}
		</PatientsContext.Provider>
	);
};

export const usePatients = () => useContext(PatientsContext);
