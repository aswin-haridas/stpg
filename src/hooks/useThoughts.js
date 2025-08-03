import { useState, useEffect } from "preact/hooks";
import api from "../utils/axios";
import useWebsocket from "./useWebsocket";

export default function useThoughts(query) {
  const { sendMessage, lastMessage } = useWebsocket();

  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        sendMessage(query);
      }
    }, 1000); // 2 seconds debounce

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (lastMessage) {
      const thoughtsArray = lastMessage
        .split(",")
        .map((thought) => thought.trim());

      setThoughts(thoughtsArray);
    }
  }, [lastMessage]);

  return thoughts;
}
