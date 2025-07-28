import React, { useEffect } from "react";
import io from "socket.io-client";

export default function useAutocomplete(q) {
  const [suggestions, setSuggestions] = React.useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("autocomplete_response", (data) => {
      setSuggestions(data.suggestions);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getAutocomplete = (q) => {
    const socket = io("http://localhost:8000");
    socket.emit("get_autocomplete", { q });
  };

  return { suggestions, getAutocomplete };
}
