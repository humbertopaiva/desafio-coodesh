import LoadMoreButton from "../../Components/LoadMoreButton";
import Pagination from "../../Components/Pagination";
import PatientsTable from "../../Components/PatientsTable";
import SearchHome from "../../Components/SearchHome";
import HomeContainer from "./HomeContainer";

const Home = ({ maxWidth }) => {
	return (
		<HomeContainer maxWidth={maxWidth}>
			<SearchHome />
			<Pagination />
			<PatientsTable />
			<LoadMoreButton />
		</HomeContainer>
	);
};

export default Home;
