/* eslint-disable no-undef */
export const darkMode = "class";
export const content = ["./src/**/*.{js,jsx,ts,tsx,html}"];
export const theme = {
	extend: {
		colors: {
			primary: "#ff5858", // Example color
			primaryActive: "#f09819", // Example active color
			danger: "#ff4d4d", // Example color
			dangerActive: "#cc0000", // Example active color
			success: "#4caf50", // Example color
			successActive: "#388e3c", // Example active color
			warning: "#ff9800", // Example color
			warningActive: "#f57c00" // Example active color
		},
		fontFamily: {
			inter: ["Inter", "sans-serif"],
			suse: ["Suse", "sans-serif"]
		}
	}
};
export const plugins = [require("daisyui")];
export const daisyui = {
	themes: [
		{
			light: {
				"primary": "#ff700a",
				"secondary": "#d05700",
				"accent": "#008ff5",
				"neutral": "#4b5563",
				"base-100": "#d1d5db",
				"base-200": "#b5b9be",
				"base-300": "#9b9ea2",
				"info": "#22d3ee",
				"success": "#1dbc0e",
				"warning": "#f0bc23",
				"error": "#991b1b",

				"--rounded-box": "0.2rem", // border radius rounded-box utility class, used in card and other large boxes
				"--rounded-btn": "0.2rem", // border radius rounded-btn utility class, used in buttons and similar element
				"--rounded-badge": "0.2rem", // border radius rounded-badge utility class, used in badges and similar
				"--animation-btn": "0.25s", // duration of animation when you click on button
				"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
				"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
				"--border-btn": "1px", // border width of buttons
				"--tab-border": "1px", // border width of tabs
				"--tab-radius": "0.2rem", // border radius of tabs
			},
		},
		{
			dark: {
				"primary": "#008ff5",
				"secondary": "#0366ad",
				"accent": "#ff700a",
				"neutral": "#4b5563",
				"base-100": "#1f2937",
				"base-200": "#19222e",
				"base-300": "#141c26",
				"info": "#22d3ee",
				"success": "#1dbc0e",
				"warning": "#f0bc23",
				"error": "#991b1b",

				"--rounded-box": "0.2rem", // border radius rounded-box utility class, used in card and other large boxes
				"--rounded-btn": "0.2rem", // border radius rounded-btn utility class, used in buttons and similar element
				"--rounded-badge": "0.2rem", // border radius rounded-badge utility class, used in badges and similar
				"--animation-btn": "0.25s", // duration of animation when you click on button
				"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
				"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
				"--border-btn": "1px", // border width of buttons
				"--tab-border": "1px", // border width of tabs
				"--tab-radius": "0.2rem", // border radius of tabs
			},
		},
	],
	darkTheme: "dark",
	base: true,
	styled: true,
	utils: true,
	prefix: "",
	logs: true,
	themeRoot: ":root"
};
