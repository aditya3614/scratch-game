import React, { createContext, useState } from "react";

// Create context
export const CharacterContext = createContext();

// Create provider component
export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]); // State for characters
  const [activeCharacter, setActiveCharacter] = useState(null); // State for active character

  // Function to add a new character
  const addCharacter = () => {
    const newCharacter = {
      id: characters.length + 1,
      name: `Character ${characters.length + 1}`,
    };
    setCharacters([...characters, newCharacter]);
  };

  return (
    <CharacterContext.Provider
      value={{ characters, activeCharacter, addCharacter, setActiveCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
