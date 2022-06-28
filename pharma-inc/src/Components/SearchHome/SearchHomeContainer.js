import {
	Text,
	Stack,
	InputGroup,
	InputRightAddon,
	Input,
} from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";

const SearchHomeContainer = ({ handleSearchPatient, searchPatient }) => {
	return (
		<Stack direction="column">
			<Text fontSize="md" mb={6}>
				A empresa Pharma Inc, está trabalhando em um projeto em
				colaboração com sua base de clientes para facilitar a gestão e
				visualização da informação dos seus pacientes de maneira simples
				e objetiva em um Dashboard onde podem listar, filtrar e expandir
				os dados disponíveis. O seu objetivo nesse projeto, é trabalhar
				no desenvolvimento do Front end que consumirá a API da empresa
				Pharma Inc seguindo os requisitos propostos neste desafio.
			</Text>
			<InputGroup size="lg">
				<Input
					bgColor="#FFF"
					_focus={{
						outline: "none",
					}}
					onChange={handleSearchPatient}
					value={searchPatient}
					placeholder="Search for name or country"
				/>
				<InputRightAddon
					bgColor={"#FFF"}
					color="gray.400"
					children={<RiUserSearchLine />}
				/>
			</InputGroup>
		</Stack>
	);
};

export default SearchHomeContainer;
