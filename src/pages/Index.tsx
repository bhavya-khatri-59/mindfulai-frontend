
import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  emotion?: string;
  action?: string;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call to your FastAPI backend
      // const response = await fetch('http://localhost:8000/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ thought: text })
      // });
      // const data = await response.json();

      // Simulated response for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const simulatedResponse = {
        emotion: "This appears to be a stress-related concern with underlying anxiety. The tone suggests you're seeking support and validation.",
        action: "Try taking 5 deep breaths right now. Consider breaking down your tasks into smaller, manageable steps. Remember that it's okay to ask for help when you need it."
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you're going through a challenging time. Let me help you process these feelings.",
        isUser: false,
        emotion: simulatedResponse.emotion,
        action: simulatedResponse.action,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {messages.length === 0 ? (
        <WelcomeScreen onStartChat={sendMessage} />
      ) : (
        <div className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4 sticky top-0 z-10">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white/30" />
              </div>
              <h1 className="font-semibold text-gray-900">MindfulAI</h1>
              <div className="ml-auto text-xs text-gray-500">
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </div>
            </div>
          </header>

          <ScrollArea className="flex-1">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  emotion={message.emotion}
                  action={message.action}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isLoading && <TypingIndicator />}
            </div>
          </ScrollArea>
        </div>
      )}

      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default Index;
