import Messages from "./messages";
import { Badge } from "./ui/badge";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

type IProps = {
  reportData?: string;
};

const ChatComponent = ({ reportData }: IProps) => {
  const { toast } = useToast();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "api/medichatgemini",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && input.trim()) {
      event.preventDefault(); // Prevents adding a new line
      handleSubmit(event, {
        data: {
          reportData: reportData as string,
        },
      });
    }
  }

  return (
    <div className="bg-muted/70 relative flex flex-col h-[90vh] rounded-xl p-4 gap-4">
      <Badge
        variant={"outline"}
        className={`absolute right-3 top-1.5 text-base ${reportData && "bg-[#00B612]"}`}
      >
        {reportData ? "✓ Report Added" : "No Report Added"}
      </Badge>

      <div className="flex-1 mb-10 overflow-y-auto max-h-[calc(100vh-150px)] p-4 mt-2">
        <Messages messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} /> {/* Marker to auto-scroll */}
      </div>

      <form
        className="sticky bottom-0 z-10 bg-background border-t border-muted rounded-lg"
        onSubmit={(event) => {
          event.preventDefault();
          if (!reportData) {
            toast({
              variant: "destructive",
              description: "Upload a valid report!",
            });
            return;
          }
          handleSubmit(event, {
            data: {
              reportData: reportData as string,
            },
          });
        }}
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your query here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none "
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            disabled={isLoading}
            type="submit"
            size="sm"
            className="ml-auto"
          >
            {isLoading ? "Analysing..." : "Ask"}
            {isLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <CornerDownLeft className="size-3.5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
