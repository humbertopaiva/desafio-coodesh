import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { usePagination } from "../Pagination";

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
	const [patientsList, setPatientsList] = useState([]);
	const [searchPatient, setSearchPatient] = useState("");

	const {
		isLoading,
		setIsLoading,
		currentPage,
		setCurrentPage,
		offSet,
		setOffSet,
	} = usePagination();

	const changePage = (page) => {
		const sliceParam = page * 50;
		if (page < currentPage) {
			setIsLoading(true);
			setPatientsList(patientsList.slice(0, sliceParam));
			setCurrentPage(page);
			setIsLoading(false);
			return;
		} else loadPatients(page);
	};

	const loadPatients = async (page = currentPage) => {
		setIsLoading(true);
		const response = await axios.get(
			`https://randomuser.me/api/?page=${page + 1}&results=50&seed=ab`
		);
		const info = response.data.info;
		const peopleList = response.data.results;
		const listData = [...patientsList, ...peopleList];

		setCurrentPage(info.page);
		setPatientsList(listData);
		setIsLoading(false);
	};

	return (
		<PatientsContext.Provider
			value={{
				currentPage,
				patientsList,
				loadPatients,
				isLoading,
				changePage,
				setSearchPatient,
				searchPatient,
			}}
		>
			{children}
		</PatientsContext.Provider>
	);
};

export const usePatients = () => useContext(PatientsContext);
