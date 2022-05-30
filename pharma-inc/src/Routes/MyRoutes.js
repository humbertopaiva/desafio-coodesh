import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PatientModal from "../Components/PatientModal";
import PatientsTable from "../Components/PatientsTable";
import Home from "../Pages/Home";
import { usePagination } from "../Providers/Pagination";

const MyRoutes = ({ maxWidth }) => {
	const { currentPage, changePage } = usePagination();
	useEffect(() => {
		changePage(currentPage);
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Home maxWidth={maxWidth} />}></Route>
			<Route path="/pages" element={<Home maxWidth={maxWidth} />}>
				<Route path=":pageIndex" element={<PatientsTable />}>
					<Route path=":patientId" element={<PatientModal />}></Route>
				</Route>
			</Route>
		</Routes>
	);
};

export default MyRoutes;
