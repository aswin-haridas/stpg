import { hydrate, prerender as ssr } from "preact-iso";
import { useEffect, useRef, useState } from "preact/hooks";
import Void from "./Void";
import "./style.css";
import "./styles/InputStyles.css";
import "./styles/Thoughts.css";
export function App() {
  const [q, setQ] = useState("");
  const [urls, setUrls] = useState({});
  const [selectedThought, setSelectedThought] = useState(0);
  const inputRef = useRef(null);
  const placeholder = "Wdyn?...";
  const thoughts = [
    "how to train your dragon",
    "why does moon follows me",
    "how to make a cake",
    "what is the meaning of life",
  ];

  console.log("xx", q, selectedThought);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle arrow down - select next thought
      if (e.key === "ArrowDown") {
        e.preventDefault(); // Prevent scroll
        setSelectedThought((prev) => {
          return (prev + 1) % 5;
        });
      }
      // Handle arrow up - select previous thought
      if (e.key === "ArrowUp") {
        e.preventDefault(); // Prevent scroll
        setSelectedThought((prev) => {
          return (prev - 1 + 5) % 5;
        });
      }
      // Handle Enter key when thought is selected
      if (e.key === "Enter" && selectedThought > 0) {
        e.preventDefault();
        const query = thoughts[selectedThought - 1];
        const url = handleDefaultSearch(query);
        window.open(url, "_self");
        setSelectedThought(0);
      }
    };

    // Focus or blur input based on thought selection
    selectedThought === 0
      ? inputRef.current?.focus()
      : inputRef.current?.blur();

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedThought, thoughts]);

  const contains = (str = " ", substr = " ") => {
    return str.toLowerCase().includes(substr.toLowerCase());
  };
  const handleDirectSiteNavigation = (query) => {
    const site = query.slice(1);
    return `https://${site}`;
  };
  const handleImageSearch = (query) => {
    const searchTerm = query.replace("@images", "").trim();
    return `https://www.google.com/search?hl=en&tbm=isch&q=${encodeURIComponent(
      searchTerm
    )}`;
  };
  const handleDefaultSearch = (query) => {
    return (
      urls[query] ||
      `https://www.google.com/search?q=${encodeURIComponent(query)}`
    );
  };
  const handleYoutubeSearch = (query) => {
    const searchTerm = query.replace(/@youtube|@yt/, "").trim();
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(
      searchTerm
    )}`;
  };
  useEffect(() => {
    inputRef.current?.focus();
    fetch(
      "https://raw.githubusercontent.com/aswin-haridas/Database/refs/heads/main/links.json"
    )
      .then((res) => res.json())
      .then(setUrls);
  }, []);
  const isDirectNavigation = (query) => {
    return query.startsWith("!");
  };
  const isImageSearch = (query) => {
    return contains(query, "@images");
  };
  const isYoutubeSearch = (query) => {
    return contains(query, "@youtube") || contains(query, "@yt");
  };
  const processQuery = (query) => {
    if (isDirectNavigation(query)) {
      return handleDirectSiteNavigation(query);
    } else if (isImageSearch(query)) {
      return handleImageSearch(query);
    } else if (isYoutubeSearch(query)) {
      return handleYoutubeSearch(query);
    } else {
      return handleDefaultSearch(query);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedThought > 0) {
      const query = thoughts[selectedThought - 1];
      const url = handleDefaultSearch(query);
      window.open(url, "_self");
      setSelectedThought(0);
      return;
    }

    if (!q.trim()) return;
    const query = q.trim().toLowerCase();
    const url = processQuery(query);
    window.open(url, "_self");
    setQ("");
  };

  const handleThoughtClick = (index) => {
    const query = thoughts[index];
    const url = handleDefaultSearch(query);
    window.open(url, "_self");
    setSelectedThought(0);
  };

  return (
    <>
      <Void />
      <form onSubmit={handleSubmit} className="container">
        <input
          ref={inputRef}
          placeholder={placeholder}
          className="raleway search"
          value={q}
          onInput={(e) => setQ(e.currentTarget.value)}
        />
        <div className="thinks raleway-light">
          {thoughts.map((thought, index) => (
            <div
              key={index}
              className={`think-item ${
                selectedThought === index + 1 ? "glow" : ""
              }`}
              onClick={() => handleThoughtClick(index)}
            >
              {thought}
            </div>
          ))}
        </div>
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
