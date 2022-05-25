import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import LoadMoreButton from "../../Components/LoadMoreButton";
import Pagination from "../../Components/Pagination";
import PatientsTable from "../../Components/PatientsTable";
import SearchHome from "../../Components/SearchHome";
import { usePagination } from "../../Providers/Pagination";
import HomeContainer from "./HomeContainer";

const Home = ({ maxWidth }) => {
	const location = useLocation();
	const params = useParams();
	const navigate = useNavigate();

	console.log("home", params);

	return (
		<HomeContainer maxWidth={maxWidth}>
			<SearchHome />
			<Outlet />
			{!location.pathname.includes("/pages/") && <PatientsTable />}
			<LoadMoreButton />
		</HomeContainer>
	);
};

export default Home;
