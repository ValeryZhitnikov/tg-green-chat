import type { Message } from "@/services/chatService";

interface MessageBubbleProps {
	message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
	const isOutgoing = message.direction === "outgoing";

	return (
		<div className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-2`}>
			<div
				className={`
          max-w-xs px-3 py-2 rounded-2xl
          ${isOutgoing ? "bg-blue-500 text-white rounded-br-sm" : "bg-gray-200 text-gray-900 rounded-bl-sm"}
        `}
			>
				<p className="whitespace-pre-wrap break-words">{message.text}</p>
			</div>
		</div>
	);
}
