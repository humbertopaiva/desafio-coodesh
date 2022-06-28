import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PatientModal from "../Components/PatientModal";
import PatientsTable from "../Components/PatientsTable";
import Home from "../Pages/Home";
import { usePagination } from "../Providers/Pagination";

const MyRoutes = () => {
	const { changePage, currentPage } = usePagination();

	useEffect(() => {
		changePage(currentPage);
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/pages" element={<Home />}>
				<Route path=":pageIndex" element={<PatientsTable />}>
					<Route path=":patientId" element={<PatientModal />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default MyRoutes;
