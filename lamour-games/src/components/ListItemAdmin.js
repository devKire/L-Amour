// ListItemAdmin.js
import React, { useState } from 'react';
import AdminModal from './AdminModal';

export default function ListItemAdmin({ imageUrl, alt, subtitle, onClick, adminData }) {
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleClick = () => {
    setSelectedAdmin(adminData);
  };

  return (
    <>
      <li onClick={handleClick}>
        <a className="list-item" target="_blank" href={adminData.url}>
          <img src={imageUrl} alt={alt} />
          <h3>{subtitle}</h3>
        </a>
      </li>
      {selectedAdmin && (
        <AdminModal admin={selectedAdmin} onClose={() => setSelectedAdmin(null)} />
      )}
    </>
  );
}
