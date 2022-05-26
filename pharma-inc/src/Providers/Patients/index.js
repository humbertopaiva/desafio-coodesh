import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { usePagination } from "../Pagination";

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
	const [patientsList, setPatientsList] = useState([]);
	const [searchPatient, setSearchPatient] = useState("");
	const [selectedPatient, setSelectedPatient] = useState({});

	return (
		<PatientsContext.Provider
			value={{
				patientsList,
				setPatientsList,
				setSearchPatient,
				searchPatient,
				selectedPatient,
				setSelectedPatient,
			}}
		>
			{children}
		</PatientsContext.Provider>
	);
};

export const usePatients = () => useContext(PatientsContext);
