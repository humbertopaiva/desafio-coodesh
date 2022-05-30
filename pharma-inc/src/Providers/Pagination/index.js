import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { usePatients } from "../Patients";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

export const PaginationContext = createContext();

const defaultIndexArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const PaginationProvider = ({ children }) => {
	const { setPatientsList, patientsList, setSelectedPatient } = usePatients();
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagination, setPagination] = useState([defaultIndexArray]);
	// const [firstIndex, setFirstIndex] = useState(1);
	const [lastIndex, setLastIndex] = useState(0);
	const [prevPagination, setPrevPagination] = useState([]);
	const { pageIndex } = useParams();
	const { onOpen } = useDisclosure();

	useEffect(() => {
		const indexArray = Array.from({ length: 10 }).map((_, index) => {
			const firstIndex = Math.floor(currentPage / 10) * 10;

			console.log(Math.floor(currentPage / 10));
			if (currentPage < 10) return index + 1;

			return index + firstIndex;
		});
		setPagination(indexArray);
	}, [currentPage]);

	// CRIA OS INDICES DO ARRAY DA PAGINACAO

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

	const changePage = async (page, navigate = null) => {
		console.log("ENTROOOO");
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
