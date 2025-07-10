import { useEffect } from "preact/hooks";
import { handleDefaultSearch } from "../utils/search";

export const useKeyboardNavigation = (
  selectedThought,
  setSelectedThought,
  thoughts,
  inputRef
) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle arrow down - select next thought
      if (e.key === "ArrowDown") {
        e.preventDefault(); // Prevent scroll
        setSelectedThought((prev) => (prev + 1) % (thoughts.length + 1));
      }

      // Handle arrow up - select previous thought
      if (e.key === "ArrowUp") {
        e.preventDefault(); // Prevent scroll
        setSelectedThought(
          (prev) => (prev - 1 + thoughts.length + 1) % (thoughts.length + 1)
        );
      }

      // Handle Enter key when thought is selected
      if (e.key === "Enter" && selectedThought > 0) {
        e.preventDefault();
        const query = thoughts[selectedThought - 1];
        const url = handleDefaultSearch(query);
        window.open(url, "_self");
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
  }, [selectedThought, thoughts, setSelectedThought, inputRef]);
};
