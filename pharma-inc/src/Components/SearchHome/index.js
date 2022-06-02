import { useEffect } from "react";
import { usePagination } from "../../Providers/Pagination";
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
	const { currentPage } = usePagination();

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
				return patient;
			}
		});

		setFilteredList(newFilteredList);
		if (!searchPatient) setFilteredList(patientsList);
	}, [searchPatient]);

	useEffect(() => {
		setSearchPatient("");
		setFilteredList([]);
	}, [currentPage]);

	return (
		<SearchHomeContainer
			handleSearchPatient={handleSearchPatient}
			searchPatient={searchPatient}
		/>
	);
};

export default SearchHome;
