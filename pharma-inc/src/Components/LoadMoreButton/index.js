import { Button, Spinner } from "@chakra-ui/react";
import { AiOutlineReload } from "react-icons/ai";
import { usePatients } from "../../Providers/Patients";

const LoadMoreButton = () => {
	const { loadPatients, isLoading } = usePatients();
	return (
		<>
			{isLoading && <Spinner size={"xl"} marginY={12} />}
			<Button
				leftIcon={<AiOutlineReload />}
				colorScheme="pink"
				variant="solid"
				mb={12}
				onClick={() => {
					loadPatients();
				}}
			>
				Carregar mais
			</Button>
		</>
	);
};

export default LoadMoreButton;
