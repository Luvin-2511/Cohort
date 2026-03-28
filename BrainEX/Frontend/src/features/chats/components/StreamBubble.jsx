import { memo } from "react";
import { useMemo } from "react"
import ReactMarkdown from "react-markdown";;
import remarkGfm from "remark-gfm";

const StreamBubble = ({ text }) => {
  return (
    <div className="message-bubble ai stream-bubble">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
};

export default memo(StreamBubble);
