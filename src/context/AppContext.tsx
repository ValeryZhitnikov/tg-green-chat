import { createContext, useContext, useState, type ReactNode } from "react";
import type { Credentials } from "@/api/types";

interface AppContextValue {
	credentials: Credentials | null;
	setCredentials: (c: Credentials) => void;
	phone: string | null;
	setPhone: (p: string) => void;
	reset: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
	const [credentials, setCredentials] = useState<Credentials | null>(null);
	const [phone, setPhone] = useState<string | null>(null);

	const reset = () => {
		setCredentials(null);
		setPhone(null);
	};

	return (
		<AppContext.Provider value={{ credentials, setCredentials, phone, setPhone, reset }}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext(): AppContextValue {
	const ctx = useContext(AppContext);
	if (!ctx) throw new Error("useAppContext must be used within AppProvider");
	return ctx;
}
