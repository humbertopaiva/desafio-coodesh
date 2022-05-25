import { Button, Stack } from "@chakra-ui/react";
import { usePagination } from "../../Providers/Pagination";
import { Flex, Text, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Pagination = () => {
	const { currentPage, changePage, pagination, setCurrentPage } =
		usePagination();
	const prev = pagination[0];
	const [current, setCurrent] = useState(1);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setCurrent(currentPage);
	}, [currentPage]);

	return (
		<>
			<Flex minW={"100%"} justify={"space-between"} mt={12}>
				<Text fontWeight={"bold"} color="gray.500">
					Página:
				</Text>
				<Stack direction={"row"}>
					{prev > 1 && (
						<Button
							variant="link"
							_focus={{
								outline: "none",
							}}
							onClick={() => {
								changePage(prev - 1);
								navigate(`/pages/${prev - 1}`);
							}}
						>
							Anterior
						</Button>
					)}
					{pagination.map((page, index, arr) => (
						<Button
							key={page}
							variant="link"
							onClick={() => {
								changePage(page, navigate(`/pages/${page}`));
							}}
							color={page === current && "orange.400"}
							width={"50px"}
							_focus={{
								outline: "none",
							}}
						>
							{index !== arr.length - 1 ? page : page + " ..."}
						</Button>
					))}
				</Stack>
			</Flex>
			<Divider border={"2px solid gray.200"} mt={3} />
		</>
	);
};

export default Pagination;
