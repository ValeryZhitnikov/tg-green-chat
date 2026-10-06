import { useState, useCallback } from "react";
import type { Credentials } from "@/api/types";
import { configureInstance } from "@/services/chatService";

export function useAuth() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const login = useCallback(async (credentials: Credentials): Promise<boolean> => {
		setIsLoading(true);
		setError(null);

		try {
			await configureInstance(credentials);
			return true;
		} catch (e) {
			setError(e instanceof Error ? e.message : "Не удалось войти. Проверьте данные.");
			return false;
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { login, isLoading, error };
}
