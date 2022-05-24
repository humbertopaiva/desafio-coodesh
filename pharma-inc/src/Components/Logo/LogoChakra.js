import { Flex, Text, Image } from "@chakra-ui/react";

const LogoChakra = () => {
	return (
		<Flex align={"center"}>
			<Image
				src="https://iconape.com/wp-content/png_logo_vector/p-logo.png"
				alt="logo"
				maxH={"40px"}
			/>
			<Text fontWeight={"bold"} ml={3} fontSize={20}>
				Pharma Inc
			</Text>
		</Flex>
	);
};

export default LogoChakra;
