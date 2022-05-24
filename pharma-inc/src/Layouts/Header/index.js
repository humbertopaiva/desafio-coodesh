import { Avatar } from "@chakra-ui/react";
import Logo from "../../Components/Logo";
import HeaderContainer from "./HeaderContainer";

const Header = ({ maxWidth }) => {
	return (
		<HeaderContainer maxWidth={maxWidth}>
			<Logo />
			<Avatar />
		</HeaderContainer>
	);
};

export default Header;
