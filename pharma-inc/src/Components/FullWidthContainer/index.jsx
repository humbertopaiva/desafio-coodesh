import { Container, Wrap } from "@chakra-ui/react";

export const FullWidthContainer = ({ children, ...props }) => {
	return (
		<Container
			minW={"100vw"}
			w="100%"
			display={"flex"}
			justifyContent="center"
		>
			<Wrap maxW="1024px" w="100%" {...props}>
				{children}
			</Wrap>
		</Container>
	);
};
