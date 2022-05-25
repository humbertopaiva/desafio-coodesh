import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PatientsTable from "../Components/PatientsTable";
import Home from "../Pages/Home";
import { usePagination } from "../Providers/Pagination";

const MyRoutes = ({ maxWidth }) => {
	const { currentPage } = usePagination();
	const navigate = useNavigate();

	return (
		<Routes>
			<Route path="/" element={<Home maxWidth={maxWidth} />}>
				<Route path="pages/:id" element={<PatientsTable />}>
					{/* <Route path=":id" element={<PatientsTable />}></Route> */}
				</Route>
			</Route>
			<Route path="/pages" element={<Home maxWidth={maxWidth} />}></Route>
		</Routes>
	);
};

export default MyRoutes;
