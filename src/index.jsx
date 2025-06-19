import { hydrate, prerender as ssr } from "preact-iso";
import { useEffect, useRef, useState } from "preact/hooks";
import Void from "./Void";
import "./style.css";

export function App() {
  const inputRef = useRef(null);
  const [q, setQ] = useState("");
  const [urls, setUrls] = useState({});

  useEffect(() => {
    inputRef.current?.focus();
    fetch(
      "https://raw.githubusercontent.com/aswin-haridas/Database/main/links.json"
    )
      .then((res) => res.json())
      .then(setUrls);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    const query = q.trim().toLowerCase();
    const url =
      urls[query] || `https://www.google.com/search?q=${encodeURIComponent(q)}`;
    window.open(url, "_self");
    setQ("");
  };

  return (
    <>
      <Void />
      <form onSubmit={handleSubmit} className="container">
        <input
          ref={inputRef}
          placeholder="Find."
          className="raleway search"
          value={q}
          onInput={(e) => setQ(e.currentTarget.value)}
        />
      </form>
    </>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return ssr(<App {...data} />);
}
