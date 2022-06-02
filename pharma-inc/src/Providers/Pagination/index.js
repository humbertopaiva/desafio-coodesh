import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { usePatients } from "../Patients";

export const PaginationContext = createContext();
const totalOfPages = 10;

export const PaginationProvider = ({ children }) => {
	const { setPatientsList, patientsList } = usePatients();
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagination, setPagination] = useState([]);

	useEffect(() => {
		const indexArray = Array.from({ length: totalOfPages }).map(
			(_, index) => {
				const firstIndex =
					Math.floor(currentPage / totalOfPages) * totalOfPages;
				if (currentPage < totalOfPages) return index + 1;

				return index + firstIndex;
			}
		);
		setPagination(indexArray);
	}, [currentPage]);

	// CARREGA MAIS USUARIOS NA MESMA LISTA

	const loadMorePatients = async () => {
		setIsLoading(true);
		const response = await axios.get(
			`https://randomuser.me/api/?page=${
				currentPage + 1
			}&results=50&seed=ab`
		);
		const info = response.data.info;
		const peopleList = response.data.results;
		const listData = [...patientsList, ...peopleList];

		setCurrentPage(info.page);
		setPatientsList(listData);
		setIsLoading(false);
	};

	// TROCA A PAGINA DE USUARIOS

	const changePage = async (page, navigate) => {
		if (page !== currentPage) {
			setIsLoading(true);
			try {
				const response = await axios.get(
					`https://randomuser.me/api/?page=${page}&results=50&seed=ab`
				);
				const info = response.data.info;
				const peopleList = response.data.results;
				setCurrentPage(info.page);
				setPatientsList(peopleList);
				setIsLoading(false);

				if (navigate) navigate();
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<PaginationContext.Provider
			value={{
				isLoading,
				setIsLoading,
				currentPage,
				setCurrentPage,
				changePage,
				loadMorePatients,
				pagination,
			}}
		>
			{children}
		</PaginationContext.Provider>
	);
};

export const usePagination = () => useContext(PaginationContext);
