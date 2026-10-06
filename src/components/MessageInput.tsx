import { useState, type KeyboardEvent } from "react";
import { MAX_MESSAGE_LENGTH } from "@/services/chatService";
import { Button } from "@/components/ui/Button";

interface MessageInputProps {
	onSend: (text: string) => void;
	disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
	const [text, setText] = useState("");

	const trimmed = text.trim();
	const canSend = trimmed.length > 0 && !disabled;

	const handleSend = () => {
		if (!canSend) return;
		onSend(trimmed);
		setText("");
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="border-t border-gray-200 bg-white p-3">
			<div className="flex items-end gap-2">
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Введите сообщение..."
					rows={3}
					maxLength={MAX_MESSAGE_LENGTH}
					disabled={disabled}
					className="
            flex-1 resize-none px-3 py-2 border border-gray-300 rounded-lg
            outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            disabled:opacity-50
          "
				/>
				<Button onClick={handleSend} disabled={!canSend}>
					Отправить
				</Button>
			</div>
			{text.length > MAX_MESSAGE_LENGTH - 200 && (
				<p className="text-xs text-gray-400 mt-1 text-right">
					{text.length} / {MAX_MESSAGE_LENGTH}
				</p>
			)}
		</div>
	);
}
