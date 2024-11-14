import { Message } from "ai";
import React from "react";
import MessageBox from "./messageBox";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import aiLoad from "../app/aiLoad.gif";

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

{/* <Image
            src={aiLoad}
            alt="Description of animation"
            width={30}
            height={30}
            unoptimized // Disable optimization to preserve animation
          /> */}

      {isLoading && (
        <div className="flex flex-row gap-2 justify-center items-center text-muted-foreground text-sm">
          AI Medi Assist is processing{" "}
          <Image
            src={aiLoad}
            alt="Description of animation"
            width={30}
            height={30}
            unoptimized // Disable optimization to preserve animation
          />
        </div>
      )}
    </div>
  );
};

export default Messages;
