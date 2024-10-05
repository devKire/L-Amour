// AdminModal.js
import React, { useState } from "react";

export default function AdminModal({ admin, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modalAdm">
        <span className="close-button" onClick={handleClose}>
          &times;
        </span>
        <div className="admin-bio">
          <h3>Sobre:</h3>
          <p>{admin.bio}</p>
          <h3>Contato:</h3>
          <p>Discord: {admin.discord}</p>
          <p>Whatsapp: {admin.whats}</p>
          <div className="admin-gif">
            <img src={admin.gif} alt="Admin Gif" />
          </div>
        </div>
      </div>
    </div>
  );
}
