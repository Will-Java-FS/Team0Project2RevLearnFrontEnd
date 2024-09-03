/* eslint-disable no-undef */
export const darkMode = "class";
export const content = ["./src/**/*.{js,jsx,ts,tsx,html}"];
export const theme = {
	extend: {
		colors: { "logo-blue": "#008FF5" },
		fontFamily: {
			inter: ["Inter", "sans-serif"],
			suse: ["Suse", "sans-serif"]
		}
	}
};
export const plugins = [require("daisyui")];
export const daisyui = {
	themes: ["nord", "sunset"],
	darkTheme: "sunset",
	base: true,
	styled: true,
	utils: true,
	prefix: "",
	logs: true,
	themeRoot: ":root"
};
