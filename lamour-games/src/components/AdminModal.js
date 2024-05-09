// AdminModal.js
import React, { useState } from 'react';


export default function AdminModal({ admin, onClose }) {
  const [isOpen, setIsOpen] = useState(false); // Initialize isOpen as false

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Call the onClose function to notify the parent component
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      
      <div className="modalAdm">
        <span className="close-button" onClick={handleClose}>&times;</span>
        <div className="admin-bio">
          <img src={admin.imageUrl} alt={admin.alt} />
          <h2>{admin.subtitle}</h2>
          <h3>Sobre:</h3>
          <p>{admin.bio}</p>
          <h3>Contato:</h3>
          <p>Discord: {admin.discord}</p>
          <p>Whatsapp: {admin.whats}</p>
        </div>
      </div>
    </div>
  );
}
