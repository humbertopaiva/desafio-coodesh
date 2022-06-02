import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LoadMoreButton from "../../Components/LoadMoreButton";
import SearchHome from "../../Components/SearchHome";
import { usePagination } from "../../Providers/Pagination";
import HomeContainer from "./HomeContainer";

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
			changePage(params.pageIndex);
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
