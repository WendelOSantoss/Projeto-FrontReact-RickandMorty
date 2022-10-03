const defaultUrl = "https://api-rickandmortydefinitive.herokuapp.com";

export const api = {
  createCharacter: async (character) => {
    const response = await fetch(defaultUrl + "/characters/create", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(character),
    });
    const newCharacter = await response.json();
    return newCharacter;
  },

  getAllCharacters: async () => {
    const response = await fetch(defaultUrl + "/characters");
    const allCharacters = await response.json();
    return allCharacters;
  },

  deleteCharacter: async (characterId) => {
    const response = await fetch(defaultUrl + "/characters/delete/" + characterId, {
      method: "DELETE",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const characterDeleted = await response.json();
    return characterDeleted;
  },

  updateCharacter: async (character) => {
    const response = await fetch(
      defaultUrl + "/characters/update/" + character._id,
      {
        method: "PUT",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(character),
      }
    );
    const characterUpdated = await response.json();
    return characterUpdated;
  },
};
