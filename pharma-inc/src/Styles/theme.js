import { extendTheme } from "@chakra-ui/react";

const colors = {
	brand: {
		mustard: "#FFE45C",
		summerSky: "#2ECBE9",
		pacificBlue: "#127FC8",
		smalt: "#00468B",
	},
};

const global = {
	styles: {
		global: {
			"html, body": {
				backgroundColor: "gray.50",
			},
		},
	},
};

export const theme = extendTheme({ ...global, ...colors });
