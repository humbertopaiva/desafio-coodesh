import { FullWidthContainer } from "../../Components/FullWidthContainer";
import { Image, Flex } from "@chakra-ui/react";
import logo from "../../Assets/logo.png";

export const BannerLogo = () => {
	return (
		<FullWidthContainer
			justify={"center"}
			mb={6}
			mt={6}
			bgGradient="linear(to-r, red.100 0%, blue.50 25%, teal.100 50%)"
			borderRadius="8px"
		>
			<Flex minH="200px" maxW={"500px"} w="100%" p="2rem 0">
				<Image alt="logo" src={logo} boxSize={"100%"} />
			</Flex>
		</FullWidthContainer>
	);
};
