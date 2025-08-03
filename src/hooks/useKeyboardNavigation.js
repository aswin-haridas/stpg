import { useEffect } from "preact/hooks";

export const useKeyboardNavigation = (
  selectedThought,
  setSelectedThought,
  thoughts,
  inputRef,
  query,
  suggestion,
  onQueryInput
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

      // Handle Tab key to accept suggestion
      if (e.keyCode == 9) {
        e.preventDefault(); // Prevent focus change
        if (suggestion && selectedThought === 0) {
          onQueryInput(suggestion);
        }
      }

      // Handle Enter key when thought is selected
      if (e.key === "Enter" && selectedThought > 0) {
        e.preventDefault();
        const query = thoughts[selectedThought - 1];
        // This will be handled by the parent component since we don't have urls here
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
  }, [
    selectedThought,
    thoughts,
    setSelectedThought,
    inputRef,
    query,
    suggestion,
    onQueryInput,
  ]);
};
