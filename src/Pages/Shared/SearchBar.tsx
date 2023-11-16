import React, { useState } from "react";

interface Props {
  // Define the type of setResults as needed
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

const SearchBar: React.FC<Props> = (props: Props) => {
  const [input, setInput] = useState("");

  const fetchData = (value: string) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user: any) => {
          return {
            value: value && user && user.name && user.name.toLowerCase().includes(value)
          };
        });
        props.setResults(results);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
