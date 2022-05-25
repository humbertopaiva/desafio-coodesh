import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { usePatients } from "../Patients";
import { useNavigate, useParams } from "react-router-dom";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
	const { setPatientsList, patientsList } = usePatients();

	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagination, setPagination] = useState([]);

	useEffect(() => {
		const pagesIndex = getIndexArray();
		if (
			currentPage + 9 === pagesIndex[9] ||
			(currentPage === 1 && currentPage)
		)
			setPagination(pagesIndex);
	}, [currentPage]);

	// CRIA OS INDICES DO ARRAY DA PAGINACAO

	const getIndexArray = () =>
		Array.from({ length: 10 }).map((_, index) => index + currentPage);

	// CARREGA MAIS USUARIOS NA MESMA LISTA

	const loadMorePatients = async (callback) => {
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
		callback();
	};

	// TROCA A PAGINA DE USUARIOS

	const changePage = async (page, callback) => {
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
			callback();
		} catch {
			console.log((err) => err);
		}
	};

	return (
		<PaginationContext.Provider
			value={{
				isLoading,
				setIsLoading,
				currentPage,
				setCurrentPage,
				getIndexArray,
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
