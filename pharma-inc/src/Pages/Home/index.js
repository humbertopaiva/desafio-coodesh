import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { FullWidthContainer } from "../../Components/FullWidthContainer";
import LoadMoreButton from "../../Components/LoadMoreButton";
import SearchHome from "../../Components/SearchHome";
import Header from "../../Layouts/Header";
import { usePagination } from "../../Providers/Pagination";

const Home = () => {
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
		<FullWidthContainer>
			<SearchHome />
			<Outlet />
			<LoadMoreButton />
		</FullWidthContainer>
	);
};

export default Home;
