import "./App.css";
import Header from "./Layouts/Header";
import Home from "./Pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./Styles/theme";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./Routes/MyRoutes";

const maxWidth = "6xl";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Header maxWidth={maxWidth} />
				<MyRoutes maxWidth={maxWidth} />
			</BrowserRouter>
			{/* <Home /> */}
		</ChakraProvider>
	);
}

export default App;
