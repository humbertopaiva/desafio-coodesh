import {
	Text,
	Stack,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Input,
} from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";

const SearchHomeContainer = ({ handleSearchPatient }) => {
	return (
		<Stack direction="column">
			<Text fontSize="lg" mb={6}>
				Ut dolorum fuga et tempora quos est sunt natus aut dolor veniam
				ut voluptates molestiae. Sed excepturi placeat ut sunt quia sed
				laboriosam magnam At repellat nihil
			</Text>
			<InputGroup size="lg">
				<InputLeftAddon
					bgColor={"#FFF"}
					color="gray.400"
					children="Searching..."
				/>
				<Input
					borderLeft={"none"}
					borderRight={"none"}
					bgColor="#FFF"
					_focus={{
						outline: "none",
					}}
					onChange={handleSearchPatient}
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
