import { useState, type SubmitEvent } from "react";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginScreen() {
	const { setCredentials } = useAppContext();
	const { login, isLoading, error } = useAuth();

	const [idInstance, setIdInstance] = useState("");
	const [apiTokenInstance, setApiTokenInstance] = useState("");

	const canSubmit = idInstance.trim().length > 0 && apiTokenInstance.trim().length > 0;

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		if (!canSubmit || isLoading) return;

		const credentials = {
			idInstance: idInstance.trim(),
			apiTokenInstance: apiTokenInstance.trim(),
		};

		const success = await login(credentials);
		if (success) {
			setCredentials(credentials);
		}
	};

	return (
		<Card title="Войти">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Input
					id="idInstance"
					label="idInstance"
					placeholder="110100001"
					value={idInstance}
					onChange={(e) => setIdInstance(e.target.value)}
					disabled={isLoading}
					autoComplete="off"
				/>

				<Input
					id="apiTokenInstance"
					label="apiTokenInstance"
					type="password"
					placeholder="Токен"
					value={apiTokenInstance}
					onChange={(e) => setApiTokenInstance(e.target.value)}
					disabled={isLoading}
					autoComplete="off"
				/>

				{error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}

				<Button type="submit" disabled={!canSubmit || isLoading}>
					{isLoading ? "Проверка..." : "Войти"}
				</Button>
			</form>
		</Card>
	);
}
