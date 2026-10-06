import { useEffect, useRef } from "react";
import type { Message } from "@/services/chatService";
import { MessageBubble } from "@/components/ui/MessageBubble";

interface MessageListProps {
	messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="flex-1 overflow-y-auto p-4 bg-gray-50">
			{messages.length === 0 ? (
				<p className="text-center text-gray-400 mt-8">Нет сообщений. Напишите первым!</p>
			) : (
				messages.map((message) => <MessageBubble key={message.id} message={message} />)
			)}
			<div ref={bottomRef} />
		</div>
	);
}
