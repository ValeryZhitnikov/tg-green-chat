export interface Credentials {
	idInstance: string;
	apiTokenInstance: string;
}

export interface SendMessageRequest {
	chatId: string;
	message: string;
}

export interface SendMessageResponse {
	idMessage: string;
}

export interface SetSettingsRequest {
	webhookUrl: string;
	outgoingWebhook: "yes" | "no";
	stateWebhook: "yes" | "no";
	incomingWebhook: "yes" | "no";
}

export interface SetSettingsResponse {
	saveSettings: boolean;
}

export interface Notification {
	receiptId: number;
	body: NotificationBody;
}

export interface NotificationBody {
	typeWebhook: string;
	instanceData: {
		idInstance: number;
		wid: string;
		typeInstance: string;
	};
	timestamp: number;
	idMessage: string;
	senderData: {
		chatId: string;
		chatName: string;
		sender: string;
		senderName: string;
		senderContactName: string;
		senderPhoneNumber: number;
	};
	messageData: {
		typeMessage: string;
		textMessageData?: {
			textMessage: string;
		};
	};
}

export interface DeleteNotificationResponse {
	result: boolean;
	reason: string;
}
