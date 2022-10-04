import Modal from "react-modal";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Form } from "../components/form/form";
import "./header.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    rigth: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "40%",
    height: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.4)",
  },
};

Modal.setAppElement("#root");

export function Header({ getALL }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <header className="header">
        <section className="header-section">
          <img src="https://img.icons8.com/color/344/rick-sanchez.png" alt="logo" height="40" width="40"></img>
          <h2 className="name">Rick and Morty Personagens</h2>
        </section>
        <section>
          <button className="modal-button" onClick={handleModal}>
            <MdAddCircle size={28} />
            Adicionar Personagem
          </button>
        </section>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="Form Create"
      >
        <Form getALL={getALL} handleModal={handleModal} />
      </Modal>
    </>
  );
}
