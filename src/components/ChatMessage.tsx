
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  emotion?: string;
  coping_mechanism?: string;
  action?: string;
  alternative_coping?: string;
  timestamp: Date;
}

export function ChatMessage({ 
  message, 
  isUser, 
  emotion, 
  coping_mechanism, 
  action, 
  alternative_coping, 
  timestamp 
}: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 mb-6 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-2xl p-4 shadow-sm",
        isUser 
          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md" 
          : "bg-white border border-gray-100 rounded-bl-md"
      )}>
        <p className="text-sm leading-relaxed mb-2">{message}</p>
        
        {emotion && coping_mechanism && action && alternative_coping && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl">
              <h4 className="font-semibold text-green-800 text-xs uppercase tracking-wide mb-1">Emotion Analysis</h4>
              <p className="text-green-700 text-sm">{emotion}</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-xl">
              <h4 className="font-semibold text-orange-800 text-xs uppercase tracking-wide mb-1">Current Coping Mechanism</h4>
              <p className="text-orange-700 text-sm">{coping_mechanism}</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-xl">
              <h4 className="font-semibold text-purple-800 text-xs uppercase tracking-wide mb-1">Suggested Action</h4>
              <p className="text-purple-700 text-sm">{action}</p>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-xl">
              <h4 className="font-semibold text-teal-800 text-xs uppercase tracking-wide mb-1">Alternative Coping Strategy</h4>
              <p className="text-teal-700 text-sm">{alternative_coping}</p>
            </div>
          </div>
        )}
        
        <div className="mt-2 text-xs opacity-60">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
