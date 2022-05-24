import "./App.css";
import Header from "./Layouts/Header";
import Home from "./Pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./Styles/theme";
import { api } from "./Services/api";
import { useEffect } from "react";

const maxWidth = "6xl";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Header maxWidth={maxWidth} />
			<Home maxWidth={maxWidth} />
		</ChakraProvider>
	);
}

export default App;
