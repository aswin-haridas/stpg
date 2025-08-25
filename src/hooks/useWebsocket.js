import { useEffect, useState } from "react";

export default function useWebsocket() {
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setLastMessage(event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setSocket(null);
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return { socket, sendMessage, lastMessage };
}
