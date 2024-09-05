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
	themes: ["nord", "dark"],
	darkTheme: "dark",
	base: true,
	styled: true,
	utils: true,
	prefix: "",
	logs: true,
	themeRoot: ":root"
};
