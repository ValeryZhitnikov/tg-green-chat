import { useState, type SubmitEvent } from "react";
import { useAppContext } from "@/context/AppContext";
import { normalizePhone } from "@/services/chatService";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function NewChatScreen() {
	const { setPhone, reset } = useAppContext();
	const [inputPhone, setInputPhone] = useState("");
	const [error, setError] = useState<string | null>(null);

	const normalized = normalizePhone(inputPhone);
	const canSubmit = normalized.length === 11;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		setError(null);

		if (!canSubmit) {
			setError("Введите номер телефона в международном формате");
			return;
		}

		setPhone(normalized);
	};

	return (
		<Card title="Новый чат">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Input
					id="phone"
					label="Номер телефона получателя"
					placeholder="79991234567"
					value={inputPhone}
					onChange={(e) => setInputPhone(e.target.value)}
					autoComplete="off"
					autoFocus
				/>

				<p className="text-xs text-gray-400">Укажите номер в международном формате без «+» и пробелов.</p>

				{error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}

				<Button type="submit" disabled={!canSubmit}>
					Начать чат
				</Button>

				<Button type="button" variant="secondary" onClick={reset}>
					Выйти
				</Button>
			</form>
		</Card>
	);
}
