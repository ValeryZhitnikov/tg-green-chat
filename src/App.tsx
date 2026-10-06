import { AppProvider, useAppContext } from "@/context/AppContext";
import { LoginScreen } from "@/screens/LoginScreen";
import { NewChatScreen } from "@/screens/NewChatScreen";
import { ChatScreen } from "@/screens/ChatScreen";

function AppRouter() {
	const { credentials, phone } = useAppContext();

	if (!credentials) return <LoginScreen />;
	if (!phone) return <NewChatScreen />;
	return <ChatScreen />;
}

export default function App() {
	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
}
