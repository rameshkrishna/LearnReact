import Modal from "../components/BootStrapComponents/Modal";

import { useState } from "react";

interface ConfirmModalProps {
  ModalText: string[];
}

function ConfirmModal({ ModalText }: ConfirmModalProps) {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleToggleModal}
      >
        Open Modal
      </button>

      <Modal
        title={ModalText[1]}
        isOpen={showModal}
        onClose={handleToggleModal}
      >
        {ModalText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </Modal>
    </>
  );
}

export default ConfirmModal;
