import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom MindCore theme colors
				mindcore: {
					dark: '#121220',
					darker: '#0A0A14',
					accent: '#00D1FF',
					accent2: '#7B4DFF',
					accent3: '#FF3E9A',
					secondary: '#2A2B52',
					text: '#E0E0FF',
					'text-muted': '#9090BB',
					glow: '#3A00FF',
					cyan: '#00D1FF',
					violet: '#7B4DFF',
					navy: '#161642',
					terminal: '#1A1F2C'
				}
			},
			fontFamily: {
				orbitron: ['Orbitron', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						opacity: '0.8',
						filter: 'blur(10px) brightness(1.1)',
					},
					'50%': { 
						opacity: '0.4',
						filter: 'blur(12px) brightness(0.9)',
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'data-flow': {
					'0%': { transform: 'translateY(0)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(-300px)', opacity: '0' }
				},
				'text-flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'scan-line': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'background-pan': {
					'0%': { backgroundPosition: '0% center' },
					'100%': { backgroundPosition: '-200% center' }
				},
				'terminal-typing': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'text-glow': {
					'0%, 100%': {
						'text-shadow': '0 0 20px rgba(0, 209, 255, 0.5), 0 0 40px rgba(0, 209, 255, 0.2)'
					},
					'50%': {
						'text-shadow': '0 0 10px rgba(0, 209, 255, 0.3), 0 0 20px rgba(0, 209, 255, 0.1)'
					}
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.2' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'data-flow': 'data-flow 8s linear infinite',
				'text-flicker': 'text-flicker 0.5s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'scan-line': 'scan-line 3s linear infinite',
				'background-pan': 'background-pan 3s linear infinite',
				'terminal-typing': 'terminal-typing 3s steps(40, end)',
				'shimmer': 'shimmer 2s infinite',
				'text-glow': 'text-glow 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite'
			},
			boxShadow: {
				'neon': '0 0 5px theme(colors.mindcore.accent), 0 0 20px theme(colors.mindcore.accent)',
				'neon-violet': '0 0 5px theme(colors.mindcore.accent2), 0 0 20px theme(colors.mindcore.accent2)',
				'neon-strong': '0 0 10px theme(colors.mindcore.accent), 0 0 30px theme(colors.mindcore.accent), 0 0 50px theme(colors.mindcore.accent)',
				'card': '0 4px 20px rgba(0, 0, 0, 0.5), 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-cyberpunk': 'linear-gradient(to right, #000428, #004e92)',
				'gradient-terminal': 'linear-gradient(to bottom, rgba(26, 31, 44, 0.8), rgba(26, 31, 44, 0.9))',
				'gradient-glow': 'linear-gradient(90deg, #00D1FF, #7B4DFF, #00D1FF)',
				'grid-pattern': 'linear-gradient(rgba(123, 77, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 77, 255, 0.1) 1px, transparent 1px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
