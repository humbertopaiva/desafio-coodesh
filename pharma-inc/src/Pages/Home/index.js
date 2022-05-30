import axios from "axios";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import LoadMoreButton from "../../Components/LoadMoreButton";
import Pagination from "../../Components/Pagination";
import PatientsTable from "../../Components/PatientsTable";
import SearchHome from "../../Components/SearchHome";
import { usePagination } from "../../Providers/Pagination";
import { usePatients } from "../../Providers/Patients";
import HomeContainer from "./HomeContainer";
import { changePage } from "../../Providers/Pagination";

const Home = ({ maxWidth }) => {
	const navigate = useNavigate();
	const params = useParams();
	const { changePage } = usePagination();

	useEffect(() => {
		if (!params.pageIndex) {
			navigate("/pages/1");
			return;
		}

		if (params.patientId) {
			changePage(params.pageIndex, null, params.patientId);
		}
	}, []);

	return (
		<HomeContainer maxWidth={maxWidth}>
			<SearchHome />
			<Outlet />
			<LoadMoreButton />
		</HomeContainer>
	);
};

export default Home;
