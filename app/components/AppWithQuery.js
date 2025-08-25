'use client'

import { useRef, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Background from "../../src/components/Background";
import { Void, SearchForm } from "../../src/components";
import { useKeyboardNavigation, useUrlFetcher } from "../../src/hooks";
import { processQuery, handleDefaultSearch } from "../../src/utils/search";
import useThoughts from "../../src/hooks/useThoughts";
import useAutocomplete from "../../src/hooks/useAutocomplete";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [q, setQ] = useState("");
  const [selectedThought, setSelectedThought] = useState(0);
  const inputRef = useRef(null);
  const urls = useUrlFetcher();
  const thoughts = useThoughts(q);
  const { suggestion, saveToHistory } = useAutocomplete(q);

  // Use the keyboard navigation hook
  useKeyboardNavigation(
    selectedThought,
    setSelectedThought,
    thoughts,
    inputRef,
    q,
    suggestion,
    setQ
  );

  // Focus input on initial load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedThought > 0) {
      const query = thoughts[selectedThought - 1];
      const url = handleDefaultSearch(query, urls);
      window.open(url, "_self");
      setSelectedThought(0);
      return;
    }

    if (!q.trim()) return;
    const query = q.trim().toLowerCase();
    saveToHistory(query);
    const url = processQuery(query, urls);
    window.open(url, "_self");
    setQ("");
  };

  const handleThoughtClick = (index) => {
    const query = thoughts[index];
    const url = handleDefaultSearch(query, urls);
    window.open(url, "_self");
    setSelectedThought(0);
  };

  const placeholder = "Search for something...";

  return (
    <>
      <Background />
      <SearchForm
        thoughts={thoughts}
        onSubmit={handleSubmit}
        inputRef={inputRef}
        suggestion={suggestion}
        placeholder={placeholder}
        query={q}
        onQueryInput={setQ}
        selectedThought={selectedThought}
        onThoughtClick={handleThoughtClick}
      />
    </>
  );
}

export default function AppWithQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}