import { Button, Stack } from "@chakra-ui/react";
import { usePagination } from "../../Providers/Pagination";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Pagination = () => {
	const { currentPage, changePage, pagination } = usePagination();
	const prev = currentPage - 1;
	const navigate = useNavigate();

	return (
		<>
			<Flex
				minW={"100%"}
				justify={"center"}
				mt={12}
				bgColor="gray.100"
				padding={5}
				borderRadius={4}
			>
				<Stack direction={"row"}>
					{/* BOTAO PAGINA ANTERIOR */}
					{prev > 1 && (
						<Button
							variant="link"
							_focus={{
								outline: "none",
							}}
							onClick={() => {
								changePage(prev);
								navigate(`/pages/${prev}`);
							}}
						>
							Prev
						</Button>
					)}
					{pagination.map((page) => {
						return (
							page > 0 && (
								// BOTAO DO NUMERO DA PAGINA
								<Button
									key={page}
									variant="link"
									onClick={() => {
										changePage(
											page,
											navigate(`/pages/${page}`)
										);
									}}
									color={page === currentPage && "orange.400"}
									width={"50px"}
									_focus={{
										outline: "none",
									}}
								>
									{page}
								</Button>
							)
						);
					})}

					{/* BOTAO PROXIMA PAGINA */}
					<Button
						variant="link"
						_focus={{
							outline: "none",
						}}
						onClick={() => {
							changePage(currentPage + 1);
							navigate(`/pages/${currentPage + 1}`);
						}}
					>
						Next {`>`}
					</Button>
				</Stack>
			</Flex>
		</>
	);
};

export default Pagination;
