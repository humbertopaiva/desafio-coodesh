import { Button, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { usePagination } from "../../Providers/Pagination";
import { usePatients } from "../../Providers/Patients";

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = () => {
	const { itemsPerPage, setItemsPerPage, items, setItems, currentPage } =
		usePagination();
	const { changePage } = usePatients();

	return <h1>Paginacao</h1>;
};

export default Pagination;
