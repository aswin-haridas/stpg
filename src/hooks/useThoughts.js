import React from "react";
import { useState, useEffect } from "preact/hooks";
import axios from "axios";

export default function useThoughts(query) {
  const [thoughts, setThoughts] = useState([]);
  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchThoughts = async () => {
        try {
          const response = await axios.post("http://localhost:8000/thoughts", {
            text: query,
          });
          const thoughtsArray = response.data.result
            .split(",")
            .map((thought) => thought.trim());

          setThoughts(thoughtsArray);
        } catch (error) {
          console.error("Failed to fetch thoughts:", error);
        }
      };
      if (query) {
        fetchThoughts();
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
  }, [query]);

  return thoughts;
}
