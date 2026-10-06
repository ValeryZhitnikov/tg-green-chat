import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary";
}

const VARIANTS = {
	primary: "bg-blue-500 hover:bg-blue-600 text-white",
	secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
} as const;

export function Button({ children, variant = "primary", className = "", disabled, ...props }: ButtonProps) {
	return (
		<button
			className={`
        px-4 py-2 rounded-lg font-medium transition cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${className}
      `}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}
