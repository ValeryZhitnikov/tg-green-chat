import { useAppContext } from "@/context/AppContext";
import { useChat } from "@/hooks/useChat";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageList } from "@/components/MessageList";
import { MessageInput } from "@/components/MessageInput";

export function ChatScreen() {
	const { credentials, phone, setPhone } = useAppContext();

	if (!credentials || !phone) {
		return null;
	}

	const { messages, isSending, error, send } = useChat(credentials, phone);

	return (
		<div className="h-screen flex flex-col bg-white">
			<ChatHeader phone={phone} onBack={() => setPhone("")} />

			<MessageList messages={messages} />

			{error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2">{error}</p>}

			<MessageInput onSend={send} disabled={isSending} />
		</div>
	);
}
