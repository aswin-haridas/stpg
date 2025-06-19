import { hydrate, prerender as ssr } from "preact-iso";
import { useEffect, useRef } from "preact/hooks";

import Void from "./Void";
import "./style.css";

export function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    // This will only run on the client side after hydration
    // The check for typeof window ensures this doesn't run during SSR
    if (typeof window !== "undefined" && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Void />
      <div className={"container"}>
        <input
          ref={inputRef}
          placeholder={"Search"}
          className={"raleway search"}
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
