import { Button, Spinner } from "@chakra-ui/react";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../../Providers/Pagination";

const LoadMoreButton = () => {
	const { loadMorePatients, isLoading, currentPage } = usePagination();
	const navigate = useNavigate();
	return (
		<>
			{isLoading && <Spinner size={"xl"} marginY={12} />}
			<Button
				leftIcon={<AiOutlineReload />}
				colorScheme="pink"
				variant="solid"
				mb={12}
				onClick={() => {
					loadMorePatients(navigate(`/pages/${currentPage + 1}`));
				}}
			>
				Load more
			</Button>
		</>
	);
};

export default LoadMoreButton;
