import { createContext, useState, useContext, useEffect } from "react";

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
	const [patientsList, setPatientsList] = useState([]);
	const [searchPatient, setSearchPatient] = useState("");
	const [selectedPatient, setSelectedPatient] = useState(null);

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
