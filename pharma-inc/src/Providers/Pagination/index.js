import { createContext, useState, useContext, useEffect } from "react";
import { Button } from "@chakra-ui/react";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(50);

	return (
		<PaginationContext.Provider
			value={{
				isLoading,
				setIsLoading,
				currentPage,
				setCurrentPage,
				items,
				setItems,
				itemsPerPage,
				setItemsPerPage,
			}}
		>
			{children}
		</PaginationContext.Provider>
	);
};

export const usePagination = () => useContext(PaginationContext);
