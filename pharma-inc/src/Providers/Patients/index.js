import { createContext, useState, useContext, useEffect } from "react";

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
	const [patientsList, setPatientsList] = useState([]);
	const [searchPatient, setSearchPatient] = useState("");
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [filteredList, setFilteredList] = useState([patientsList]);

	const formattedPatientInfos = (patient) => {
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

	return (
		<PatientsContext.Provider
			value={{
				patientsList,
				setPatientsList,
				setSearchPatient,
				searchPatient,
				selectedPatient,
				setSelectedPatient,
				formattedPatientInfos,
				filteredList,
				setFilteredList,
			}}
		>
			{children}
		</PatientsContext.Provider>
	);
};

export const usePatients = () => useContext(PatientsContext);
