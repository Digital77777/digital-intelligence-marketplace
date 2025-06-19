import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

interface ChatAreaProps {
  chat: { sender: "user" | "assistant"; text: string }[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSend: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  chat,
  input,
  setInput,
  isLoading,
  handleSend,
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-[320px] shadow-lg">
      <div className="flex flex-col gap-3 pt-4 px-4 pb-3">
        <div className="overflow-y-auto max-h-60 space-y-3 pr-2">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`rounded-lg px-3 py-2 text-sm ${
                msg.sender === "user"
                  ? "bg-blue-100 dark:bg-blue-800 self-end text-blue-900 dark:text-blue-100"
                  : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-200 self-start"
              }`}
              style={{ maxWidth: "90%" }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-end gap-2 mt-2">
          <Textarea
            placeholder="Paste code or ask a programming question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-h-[40px] max-h-[120px] text-xs"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            variant="default"
            className="px-3 py-2"
            disabled={isLoading || !input.trim()}
          >
            <Terminal className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
