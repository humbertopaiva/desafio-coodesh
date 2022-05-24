import { Flex } from "@chakra-ui/react";

const HomeContainer = ({ children, maxWidth }) => {
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
