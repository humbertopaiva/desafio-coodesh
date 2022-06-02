import { useEffect } from "react";
import { usePatients } from "../../Providers/Patients";
import SearchHomeContainer from "./SearchHomeContainer";

const SearchHome = () => {
	const {
		setSearchPatient,
		patientsList,
		setFilteredList,
		searchPatient,
		formattedPatientInfos,
	} = usePatients();

	const handleSearchPatient = (event) => {
		setSearchPatient(event.target.value);
	};

	useEffect(() => {
		const newFilteredList = patientsList.filter((patient) => {
			const { name, country } = formattedPatientInfos(patient);
			const searchString = searchPatient.toLowerCase();
			if (
				name.toLowerCase().trim().includes(searchString.trim()) ||
				country.toLowerCase().trim().includes(searchString.trim())
			) {
				console.log("Tem");
				return patient;
			}
		});

		setFilteredList(newFilteredList);
		if (!searchPatient) setFilteredList(patientsList);
	}, [searchPatient]);

	return <SearchHomeContainer handleSearchPatient={handleSearchPatient} />;
};

export default SearchHome;
