import LoadMoreButton from "../../Components/LoadMoreButton";
import PatientsTable from "../../Components/PatientsTable";
import SearchHome from "../../Components/SearchHome";
import HomeContainer from "./HomeContainer";

const Home = ({ maxWidth }) => {
	return (
		<HomeContainer maxWidth={maxWidth}>
			<SearchHome />
			<PatientsTable />
			<LoadMoreButton />
		</HomeContainer>
	);
};

export default Home;
