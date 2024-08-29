module.exports = {
	darkMode: "class", // Enables dark mode using the 'dark' class
	content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // Adjust the paths to match your project structure
	theme: {
		extend: {}
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["nord", "business"], // Include 'nord' and 'business' themes
		darkTheme: "business", // Set 'business' as the default dark theme
		base: true,
		styled: true,
		utils: true,
		prefix: "",
		logs: true,
		themeRoot: ":root"
	}
};
