// tailwind.config.js - Extended configuration with custom theme
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Custom color palette for agriculture theme
                primary: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                },
                secondary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                },
                accent: {
                    green: "#10b981",
                    blue: "#1d4ed8",
                    yellow: "#f59e0b",
                    red: "#ef4444",
                },
                agriculture: {
                    soil: "#8b5a2b",
                    leaf: "#22c55e",
                    sky: "#0ea5e9",
                    sun: "#f59e0b",
                    water: "#06b6d4",
                },
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "Segoe UI",
                    "system-ui",
                    "-apple-system",
                    "sans-serif",
                ],
                display: [
                    "Inter",
                    "Segoe UI",
                    "system-ui",
                    "-apple-system",
                    "sans-serif",
                ],
            },
            fontSize: {
                "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
                xs: ["0.75rem", { lineHeight: "1rem" }],
                sm: ["0.875rem", { lineHeight: "1.25rem" }],
                base: ["1rem", { lineHeight: "1.5rem" }],
                lg: ["1.125rem", { lineHeight: "1.75rem" }],
                xl: ["1.25rem", { lineHeight: "1.75rem" }],
                "2xl": ["1.5rem", { lineHeight: "2rem" }],
                "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
                "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
                "5xl": ["3rem", { lineHeight: "1" }],
                "6xl": ["3.75rem", { lineHeight: "1" }],
                "7xl": ["4.5rem", { lineHeight: "1" }],
                "8xl": ["6rem", { lineHeight: "1" }],
                "9xl": ["8rem", { lineHeight: "1" }],
            },
            spacing: {
                18: "4.5rem",
                88: "22rem",
                128: "32rem",
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem",
            },
            boxShadow: {
                soft: "0 4px 12px rgba(0, 0, 0, 0.1)",
                medium: "0 8px 25px rgba(0, 0, 0, 0.15)",
                hard: "0 12px 40px rgba(0, 0, 0, 0.2)",
                "colored-green": "0 4px 12px rgba(34, 197, 94, 0.3)",
                "colored-blue": "0 4px 12px rgba(59, 130, 246, 0.3)",
                "colored-yellow": "0 4px 12px rgba(245, 158, 11, 0.3)",
                "inner-soft": "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            },
            animation: {
                spin: "spin 1s linear infinite",
                ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                bounce: "bounce 1s infinite",
                "fade-in": "fadeIn 0.3s ease-out",
                "slide-in": "slideIn 0.4s ease-out",
                "slide-up": "slideUp 0.3s ease-out",
                "scale-in": "scaleIn 0.2s ease-out",
                float: "float 3s ease-in-out infinite",
                glow: "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideIn: {
                    "0%": { transform: "translateX(-100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(34, 197, 94, 0.5)" },
                    "100%": { boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
            gradientColorStops: {
                "primary-gradient": {
                    "0%": "#16a34a",
                    "100%": "#2563eb",
                },
                "success-gradient": {
                    "0%": "#059669",
                    "100%": "#10b981",
                },
                "light-gradient": {
                    "0%": "#f0fdf4",
                    "100%": "#eff6ff",
                },
            },
            screens: {
                xs: "475px",
                "3xl": "1600px",
            },
            zIndex: {
                100: "100",
                1000: "1000",
            },
            transitionProperty: {
                height: "height",
                spacing: "margin, padding",
                "colors-transform":
                    "color, background-color, border-color, fill, stroke, transform",
            },
            transitionTimingFunction: {
                "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            scale: {
                102: "1.02",
                103: "1.03",
            },
            cursor: {
                grab: "grab",
                grabbing: "grabbing",
            },
        },
    },
    plugins: [
        // Custom plugin for additional utilities
        function ({ addUtilities, addComponents, theme }) {
            addUtilities({
                ".text-shadow": {
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                },
                ".text-shadow-lg": {
                    textShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
                ".text-shadow-none": {
                    textShadow: "none",
                },
                ".backface-hidden": {
                    "backface-visibility": "hidden",
                },
                ".transform-gpu": {
                    transform: "translateZ(0)",
                },
                ".scrollbar-hide": {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                ".scrollbar-thin": {
                    "scrollbar-width": "thin",
                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                        borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "linear-gradient(135deg, #16a34a, #2563eb)",
                        borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "linear-gradient(135deg, #10b981, #1d4ed8)",
                    },
                },
            });

            addComponents({
                ".btn": {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: theme("borderRadius.lg"),
                    fontWeight: theme("fontWeight.semibold"),
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    "&:disabled": {
                        opacity: "0.5",
                        cursor: "not-allowed",
                    },
                },
                ".btn-primary": {
                    background: "linear-gradient(135deg, #16a34a, #2563eb)",
                    color: "white",
                    padding: `${theme("spacing.3")} ${theme("spacing.6")}`,
                    boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
                    "&:hover:not(:disabled)": {
                        background: "linear-gradient(135deg, #15803d, #1d4ed8)",
                        boxShadow: "0 6px 20px rgba(34, 197, 94, 0.4)",
                        transform: "translateY(-1px)",
                    },
                    "&:active:not(:disabled)": {
                        transform: "translateY(0)",
                    },
                },
                ".btn-secondary": {
                    backgroundColor: "white",
                    color: theme("colors.gray.700"),
                    padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
                    border: `1px solid ${theme("colors.gray.200")}`,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                        backgroundColor: theme("colors.gray.50"),
                        borderColor: theme("colors.gray.300"),
                        transform: "translateY(-1px)",
                    },
                },
                ".card": {
                    backgroundColor: "white",
                    borderRadius: theme("borderRadius.xl"),
                    boxShadow: theme("boxShadow.lg"),
                    padding: theme("spacing.6"),
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        boxShadow: theme("boxShadow.xl"),
                        transform: "translateY(-2px)",
                    },
                },
                ".gradient-text": {
                    background: "linear-gradient(135deg, #16a34a, #2563eb)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                },
                ".glass-effect": {
                    background: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                },
                ".input-field": {
                    width: "100%",
                    padding: `${theme("spacing.2")} ${theme("spacing.3")}`,
                    border: `1px solid ${theme("colors.gray.300")}`,
                    borderRadius: theme("borderRadius.lg"),
                    background: "rgba(255, 255, 255, 0.8)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        borderColor: theme("colors.gray.400"),
                    },
                    "&:focus": {
                        outline: "none",
                        borderColor: "transparent",
                        boxShadow: `0 0 0 2px ${theme("colors.blue.500")}`,
                        transform: "translateY(-1px)",
                    },
                },
                ".weather-card": {
                    backgroundColor: "white",
                    padding: theme("spacing.3"),
                    borderRadius: theme("borderRadius.lg"),
                    textAlign: "center",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    },
                },
                ".prediction-card": {
                    padding: theme("spacing.6"),
                    borderRadius: theme("borderRadius.lg"),
                    marginBottom: theme("spacing.6"),
                    background:
                        "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)",
                    borderLeft: `4px solid ${theme("colors.green.600")}`,
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.1)",
                },
                ".crop-image": {
                    width: theme("spacing.16"),
                    height: theme("spacing.16"),
                    borderRadius: theme("borderRadius.lg"),
                    objectFit: "cover",
                    marginRight: theme("spacing.4"),
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    },
                },
                ".confidence-bar": {
                    width: "100%",
                    height: theme("spacing.3"),
                    backgroundColor: theme("colors.gray.200"),
                    borderRadius: theme("borderRadius.full"),
                    overflow: "hidden",
                    marginBottom: theme("spacing.2"),
                },
                ".confidence-fill": {
                    height: "100%",
                    background: "linear-gradient(90deg, #059669, #22c55e)",
                    borderRadius: theme("borderRadius.full"),
                    transition: "all 0.5s ease",
                },
                ".alternative-item": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: theme("spacing.3"),
                    backgroundColor: theme("colors.gray.50"),
                    borderRadius: theme("borderRadius.lg"),
                    border: "1px solid transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: theme("colors.gray.100"),
                        borderColor: theme("colors.gray.200"),
                        transform: "translateX(2px)",
                    },
                },
                ".loading-spinner": {
                    animation: "spin 1s linear infinite",
                    borderRadius: "50%",
                    width: theme("spacing.5"),
                    height: theme("spacing.5"),
                    border: `2px solid transparent`,
                    borderTop: `2px solid white`,
                    marginRight: theme("spacing.2"),
                },
                ".error-alert": {
                    padding: theme("spacing.3"),
                    backgroundColor: "#fef2f2",
                    border: `1px solid #fecaca`,
                    borderRadius: theme("borderRadius.lg"),
                    color: "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: theme("spacing.4"),
                },
                ".info-panel": {
                    padding: theme("spacing.4"),
                    backgroundColor: "#fffbeb",
                    border: `1px solid #fed7aa`,
                    borderRadius: theme("borderRadius.lg"),
                    marginTop: theme("spacing.6"),
                },
                ".empty-state": {
                    textAlign: "center",
                    padding: `${theme("spacing.12")} 0`,
                },
                ".fade-in": {
                    animation: "fadeIn 0.3s ease-out",
                },
                ".slide-in": {
                    animation: "slideIn 0.4s ease-out",
                },
            });
        },
    ],
    darkMode: "class", // Enable dark mode
};
