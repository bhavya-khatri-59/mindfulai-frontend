
import { Brain, Heart, Lightbulb, MessageCircle } from "lucide-react";

interface WelcomeScreenProps {
  onStartChat: (message: string) => void;
}

export function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  const suggestions = [
    {
      icon: Brain,
      text: "I'm feeling overwhelmed with work lately",
      category: "Stress"
    },
    {
      icon: Heart,
      text: "I want to build more confidence in myself",
      category: "Self-esteem"
    },
    {
      icon: Lightbulb,
      text: "I'm struggling to stay motivated",
      category: "Motivation"
    },
    {
      icon: MessageCircle,
      text: "I need help processing my emotions today",
      category: "Emotional Support"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-xl">
          <Brain className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          MindfulAI
        </h1>
        
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Share your thoughts and feelings. I'll help you understand your emotions and suggest positive actions to improve your wellbeing.
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Try starting with:
        </h3>
        
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onStartChat(suggestion.text)}
            className="w-full p-4 text-left bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                <suggestion.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">{suggestion.text}</div>
                <div className="text-xs text-gray-500">{suggestion.category}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
