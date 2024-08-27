// tailwind.config.js
module.exports = {
	darkMode: "class", // Enables dark mode using the 'dark' class
	content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // Adjust the paths to match your project structure
	theme: {
		extend: {}
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["nord", "business"], // Include 'nord' as light theme and 'night' as dark theme
		darkTheme: "business", // Set 'night' as the default dark theme
		base: true, // Applies base styles such as background and foreground colors
		styled: true, // Includes daisyUI's design decisions for components
		utils: true, // Adds responsive and modifier utility classes
		prefix: "", // No prefix for daisyUI class names
		logs: true, // Show info about daisyUI config when building CSS
		themeRoot: ":root" // Attaches theme color CSS variables to the ':root' element
	}
};
