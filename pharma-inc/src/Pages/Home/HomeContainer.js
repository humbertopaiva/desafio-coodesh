import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { usePatients } from "../../Providers/Patients";

const HomeContainer = ({ children, maxWidth }) => {
	const { loadPatients } = usePatients();

	useEffect(() => {
		loadPatients();
	}, []);

	return (
		<Flex as={"main"} justify="center">
			<Flex
				direction={"column"}
				maxWidth={maxWidth}
				width="full"
				justify={"space-between"}
				align="center"
				mt={10}
			>
				{children}
			</Flex>
		</Flex>
	);
};

export default HomeContainer;
