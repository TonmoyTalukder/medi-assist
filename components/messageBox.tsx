import Markdown from "./markdown";
import { Card, CardContent, CardFooter } from "./ui/card";

type IProps = {
  role: string;
  content: string;
};

const MessageBox = ({ role, content }: IProps) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <Card
      style={{
        maxWidth: '70%',
        borderRadius: isUser ? '20px 20px 5px 20px': '20px 20px 20px 5px'
      }}
        className={`${
          isUser ? "bg-sky-500 text-right" : "bg-muted/50 text-left"
        } rounded-lg p-4 px-0`}
      >
        <CardContent className="text-sm">
          <Markdown text={content} />
        </CardContent>
        
        {role !== "user" && (
          <CardFooter className="border-t bg-muted/50 px-6 py-3 text-xs text-muted-foreground">
            Disclaimer: The medical advice and recommendations provided by this
            application are for informational purposes only and should not
            replace professional medical diagnosis, treatment, or advice.
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default MessageBox;
