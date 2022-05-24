import { Flex } from "@chakra-ui/react";

const HeaderContainer = ({ children, maxWidth }) => {
	return (
		<Flex as={"header"} bg={"#FFF"} minH={"70px"} justify="center">
			<Flex
				direction={["column", "row"]}
				maxWidth={maxWidth}
				width="full"
				justify={"space-between"}
				align="center"
			>
				{children}
			</Flex>
		</Flex>
	);
};

export default HeaderContainer;
