import type {
	Credentials,
	SendMessageRequest,
	SendMessageResponse,
	SetSettingsRequest,
	SetSettingsResponse,
	Notification,
	DeleteNotificationResponse,
} from "@/api/types";

const API_URL = import.meta.env.VITE_GREEN_API_URL;

function buildUrl(credentials: Credentials, method: string): string {
	const { idInstance, apiTokenInstance } = credentials;
	return `${API_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
}

export async function sendMessage(credentials: Credentials, payload: SendMessageRequest): Promise<SendMessageResponse> {
	const response = await fetch(buildUrl(credentials, "sendMessage"), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error(`SendMessage failed: ${response.status}`);
	}

	return response.json();
}

export async function setSettings(
	credentials: Credentials,
	settings: SetSettingsRequest
): Promise<SetSettingsResponse> {
	const response = await fetch(buildUrl(credentials, "setSettings"), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(settings),
	});

	if (!response.ok) {
		throw new Error(`SetSettings failed: ${response.status}`);
	}

	return response.json();
}

export async function receiveNotification(credentials: Credentials): Promise<Notification | null> {
	const response = await fetch(`${buildUrl(credentials, "receiveNotification")}?receiveTimeout=10`);

	if (!response.ok) {
		throw new Error(`ReceiveNotification failed: ${response.status}`);
	}

	const text = await response.text();
	if (!text || text === "null") return null;

	return JSON.parse(text) as Notification;
}

export async function deleteNotification(
	credentials: Credentials,
	receiptId: number
): Promise<DeleteNotificationResponse> {
	const response = await fetch(`${buildUrl(credentials, "deleteNotification")}/${receiptId}`, { method: "DELETE" });

	if (!response.ok) {
		throw new Error(`DeleteNotification failed: ${response.status}`);
	}

	return response.json();
}
