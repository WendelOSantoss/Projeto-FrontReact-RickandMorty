import { Card } from '../../components/card/card';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';
import './home.css';
import { api } from '../../utils/api/api';
import { useState, useEffect } from 'react';
import { CgCloseR } from 'react-icons/cg';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    rigth: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '40%',
    height: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
  },
};

Modal.setAppElement('#root');

export function Home() {
  const [characterList, setCharacterList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uniqueCharacter, setUniqueCharacter] = useState({});
  const [editCharacter, setEditCharacter] = useState(false);

  async function getCharacter() {
    const characters = await api.getAllCharacters();
    setCharacterList(characters);
  }

  function deleteCharacter(characterId) {
    api.deleteCharacter(characterId);
    const newCharacterList = characterList;
    newCharacterList.map((character, index) => {
      if (character._id === characterId) {
        newCharacterList.splice(index, 1);
        setCharacterList(newCharacterList);
        handleModal();
      }
    });
  }

  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function changeCharacter(event) {
    event.preventDefault();

    const updatedCharacter = {
      _id: uniqueCharacter._id,
      name: event.target.name.value,
      imageUrl: event.target.imageUrl.value,
    };

    const newCharacterList = characterList;
    newCharacterList.map((item, index) => {
      if (item._id === updatedCharacter._id) {
        newCharacterList.splice(index, 1, updatedCharacter);
        setCharacterList(newCharacterList);
        handleModal();
      }
    });
    setEditCharacter(false);
    api.updateCharacter(updatedCharacter);
  }

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <>
    <section className="home">
      <Header getALL={getCharacter} />
      <div className="card-list">
        {characterList.map((item, index) => {
          return (
            <button
              className="button-card"
              onClick={() => {
                setUniqueCharacter(item);
                handleModal();
              }}
              key={index}
            >
              <Card
                name={item.name}
                imageUrl={item.imageUrl}
              />
            </button>
          );
        })}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="Card Details"
      >
        {editCharacter ? (
          <>
            <div className="form">
              <form onSubmit={changeCharacter} className="form-inputs">
                <section>
                  <span>Name:</span>
                  <input
                    type="text"
                    name="name"
                    defaultValue={uniqueCharacter.name}
                  ></input>
                </section>
                <section>
                  <span>imageUrl:</span>
                  <input
                    type="text"
                    name="imageUrl"
                    defaultValue={uniqueCharacter.imageUrl}
                  ></input>
                </section>
                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <section className='color'>
              <section className="display-button">
                <button className="button" onClick={handleModal}>
                  <CgCloseR size={28} color="red" />
                </button>
              </section>
              <h2>{uniqueCharacter.name}</h2>
              <img src={uniqueCharacter.imageUrl} alt="personagem" height="100" width="100"></img>
            </section>
            <button className='btn-submit'
              onClick={() => {
                setEditCharacter(true);
              }}
            >
              Edit
            </button>
            <button className='btn-submit'
              onClick={() => {
                deleteCharacter(uniqueCharacter._id);
              }}
            >
              Delete
            </button>
          </>
        )}
      </Modal>
    </section>
    <Footer />
    </>
  );
}