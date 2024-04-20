import React, { useState } from 'react';

const Modal = () => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOverlayClick = (event) => {
    // Verifica se o clique foi fora do conteúdo do modal
    if (event.target.classList.contains('modal-overlay')) {
      handleCloseModal();
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <button className="close-button" onClick={handleCloseModal}>
            Fechar
          </button>
          <div className="modal">
            <iframe
              width="560"
              height="315"
              src="\assets\fortniteEvento.mp4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
