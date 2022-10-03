import { useState } from "react";
import { api } from "../../utils/api/api";
import "./form.css";

export function Form({ getALL, handleModal }) {
  const [newCharacter, setNewCharacter] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    await api.createCharacter(newCharacter);
    await getALL();
    setLoading(false);
    handleModal();
  }

  return (
    <>
      {loading ? (
        <div> loading...</div>
      ) : (
        <div className="form">
          <form onSubmit={handleSubmit} className="form-inputs">
            <section>
              <span>Name:</span>
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setNewCharacter({ ...newCharacter, name: event.target.value });
                }}
              ></input>
            </section>
            <section>
              <span>imageUrl:</span>
              <input
                type="text"
                name="imageUrl"
                onChange={(event) => {
                  setNewCharacter({ ...newCharacter, imageUrl: event.target.value });
                }}
              ></input>
            </section>           
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
