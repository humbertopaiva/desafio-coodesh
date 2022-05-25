import { PaginationProvider } from "./Pagination";
import { PatientsProvider } from "./Patients";

const Providers = ({ children }) => {
	return (
		<PaginationProvider>
			<PatientsProvider>{children}</PatientsProvider>
		</PaginationProvider>
	);
};

export default Providers;
