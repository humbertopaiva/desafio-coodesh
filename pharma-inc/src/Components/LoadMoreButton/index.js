import { Button, Flex, Spinner } from "@chakra-ui/react";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../../Providers/Pagination";

const LoadMoreButton = () => {
	const { loadMorePatients, isLoading, currentPage } = usePagination();
	const navigate = useNavigate();
	return (
		<Flex
			w="100%"
			justify="center"
			align={"center"}
			direction="column"
			p={6}
		>
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
		</Flex>
	);
};

export default LoadMoreButton;
