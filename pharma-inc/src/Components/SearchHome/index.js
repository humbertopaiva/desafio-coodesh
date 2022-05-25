import { usePatients } from "../../Providers/Patients";
import SearchHomeContainer from "./SearchHomeContainer";

const SearchHome = () => {
	const { setSearchPatient } = usePatients();
	const handleSearchPatient = (event) => {
		setSearchPatient(event.target.value);
	};
	return <SearchHomeContainer handleSearchPatient={handleSearchPatient} />;
};

export default SearchHome;
