import { useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PatientModal from "../Components/PatientModal";
import PatientsTable from "../Components/PatientsTable";
import Home from "../Pages/Home";
import { usePagination } from "../Providers/Pagination";

const MyRoutes = ({ maxWidth }) => {
	return (
		<Routes>
			<Route path="/" element={<Home maxWidth={maxWidth} />}></Route>
			<Route path="/pages" element={<Home maxWidth={maxWidth} />}>
				<Route path=":id" element={<PatientsTable />}>
					<Route path=":patientId" element={<PatientModal />} />
				</Route>
			</Route>
			<Route path="/test" element={<PatientModal />}></Route>
		</Routes>
	);
};

export default MyRoutes;
