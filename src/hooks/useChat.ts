import { useState, useEffect, useCallback } from "react";
import type { Credentials } from "@/api/types";
import * as api from "@/api/greenApi";
import { parseIncomingMessage, isMessageFromPhone, toChatId, type Message } from "@/services/chatService";

export function useChat(credentials: Credentials, phone: string) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const send = useCallback(
		async (text: string) => {
			const trimmed = text.trim();
			if (!trimmed) return;

			setIsSending(true);
			setError(null);

			try {
				const response = await api.sendMessage(credentials, {
					chatId: toChatId(phone),
					message: trimmed,
				});

				setMessages((prev) => [
					...prev,
					{
						id: response.idMessage,
						text: trimmed,
						direction: "outgoing",
					},
				]);
			} catch (e) {
				setError(e instanceof Error ? e.message : "Не удалось отправить");
			} finally {
				setIsSending(false);
			}
		},
		[credentials, phone]
	);

	useEffect(() => {
		const controller = new AbortController();
		let cancelled = false;

		const poll = async () => {
			while (!cancelled) {
				try {
					const notification = await api.receiveNotification(credentials);

					if (cancelled) break;

					if (notification?.receiptId) {
						const incoming = parseIncomingMessage(notification);

						if (incoming && isMessageFromPhone(notification, phone)) {
							setMessages((prev) => {
								return [...prev, incoming];
							});
						}

						await api.deleteNotification(credentials, notification.receiptId);
					}
				} catch (e) {
					if (cancelled) return;
					console.error("Polling error:", e);
					await new Promise((r) => setTimeout(r, 2000));
				}
			}
		};

		poll();

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, [credentials, phone]);

	return { messages, isSending, error, send };
}
