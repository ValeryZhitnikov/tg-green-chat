import { Button } from "@/components/ui/Button";

interface ChatHeaderProps {
	phone: string;
	onBack: () => void;
}

export function ChatHeader({ phone, onBack }: ChatHeaderProps) {
	return (
		<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
			<div>
				<p className="font-medium text-gray-900">+{phone}</p>
				<p className="text-xs text-gray-400">Telegram</p>
			</div>
			<Button variant="secondary" onClick={onBack}>
				Назад
			</Button>
		</div>
	);
}
