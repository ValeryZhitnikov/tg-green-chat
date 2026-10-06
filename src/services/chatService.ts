import type { Credentials, Notification, SetSettingsRequest } from "@/api/types";
import * as api from "@/api/greenApi";

export const MAX_MESSAGE_LENGTH = 4096;

export interface Message {
	id: string;
	text: string;
	direction: "incoming" | "outgoing";
}

const HTTP_API_SETTINGS: SetSettingsRequest = {
	webhookUrl: "",
	outgoingWebhook: "yes",
	stateWebhook: "yes",
	incomingWebhook: "yes",
};

export async function configureInstance(credentials: Credentials): Promise<void> {
	const response = await api.setSettings(credentials, HTTP_API_SETTINGS);
	if (!response.saveSettings) {
		throw new Error("Не удалось сохранить настройки инстанса");
	}
}

export function normalizePhone(phone: string | number): string {
	return String(phone).replace(/\D/g, "");
}

export function toChatId(phone: string): string {
	return `${phone}@c.us`;
}

export function parseIncomingMessage(notification: Notification): Message | null {
	const { body } = notification;

	if (body.typeWebhook !== "incomingMessageReceived") return null;
	if (body.messageData.typeMessage !== "textMessage") return null;

	const text = body.messageData.textMessageData?.textMessage;
	if (!text) return null;

	return {
		id: body.idMessage,
		text,
		direction: "incoming",
	};
}

export function isMessageFromPhone(notification: Notification, phone: string): boolean {
	const actual = normalizePhone(notification.body.senderData.senderPhoneNumber);
	return phone === actual;
}
