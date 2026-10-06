import type { ReactNode } from "react";

interface CardProps {
	title?: string;
	children: ReactNode;
}

export function Card({ title, children }: CardProps) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">
				{title && <h1 className="text-xl font-semibold text-gray-900 mb-6">{title}</h1>}
				{children}
			</div>
		</div>
	);
}
