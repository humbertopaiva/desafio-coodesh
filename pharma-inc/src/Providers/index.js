import { PaginationProvider } from "./Pagination";
import { PatientsProvider } from "./Patients";

const Providers = ({ children }) => {
	return (
		<PatientsProvider>
			<PaginationProvider>{children}</PaginationProvider>
		</PatientsProvider>
	);
};

export default Providers;
