import { Message } from "ai";
import React from "react";
import MessageBox from "./messageBox";
import {Loader2} from "lucide-react";

type IProps = {
  messages: Message[];
  isLoading: boolean;
};

const Messages = ({ messages, isLoading }: IProps) => {
  return (
    <div className="flex flex-col gap-1 overflow-y-auto">
      {messages.map((m, index) => (
        <MessageBox key={index} role={m.role} content={m.content} />
      ))}
      
      {isLoading && (
        <div className="flex justify-center items-center text-muted-foreground text-sm">
          <Loader2 className="mr-2 size-3.5 animate-spin" /> AI is processing your query...
        </div>
      )}
    </div>
  );
};

export default Messages;
