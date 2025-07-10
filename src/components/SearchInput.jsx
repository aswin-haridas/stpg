import "../styles/InputStyles.css";

const SearchInput = ({ inputRef, placeholder, value, onInput }) => {
  return (
    <input
      ref={inputRef}
      placeholder={placeholder[Math.floor(Math.random() * placeholder.length)]}
      className="raleway search"
      value={value}
      onInput={(e) => onInput(e.currentTarget.value)}
    />
  );
};

export default SearchInput;
