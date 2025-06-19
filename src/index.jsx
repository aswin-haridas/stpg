import { hydrate, prerender as ssr } from "preact-iso";
import { useEffect, useRef, useState } from "preact/hooks";

import Void from "./Void";
import "./style.css";

export function App() {
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const websiteUrls = {
    instagram: "https://www.instagram.com",
    github: "https://www.github.com",
    // Add more websites as needed
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      const url =
        websiteUrls[query] ||
        `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      window.location.href = url;
      setSearchQuery(""); // Clear the input after redirection
    }
  };

  return (
    <>
      <Void />
      <div className={"container"}>
        <input
          ref={inputRef}
          placeholder={"Search"}
          className={"raleway search"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
