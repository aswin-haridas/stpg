import { hydrate, prerender as ssr } from "preact-iso";
import { useRef, useState, useEffect } from "preact/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Background from "./components/Background";
import { Void, SearchForm } from "./components";
import { useKeyboardNavigation, useUrlFetcher } from "./hooks";
import { processQuery, handleDefaultSearch } from "./utils/search";
import "./style.css";
import useThoughts from "./hooks/useThoughts";
import useAutocomplete from "./hooks/useAutocomplete";

// Create a client
const queryClient = new QueryClient();

export function App() {
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
      <Void />
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
if (typeof window !== "undefined") {
  hydrate(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    document.getElementById("app")
  );
}
export async function prerender(data) {
  return ssr(
    <QueryClientProvider client={queryClient}>
      <App {...data} />
    </QueryClientProvider>
  );
}
