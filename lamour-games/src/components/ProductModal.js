import React from "react";

const ProductModal = ({ show, onClose, product }) => {
  if (!product || !show) return null; 

  const originalPrice = Number(product.price); 
  const salePercentage = product.sale ? parseFloat(product.sale) : 0; 
  const discountedPrice = salePercentage > 0 ? originalPrice * (1 - salePercentage / 100) : originalPrice;

  // Função para fechar o modal quando clicar fora dele
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('product-modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} style={{ width: "100%" }} />
        <p><strong>Preço Original:</strong> R${originalPrice.toFixed(2)}</p>
        {salePercentage > 0 && (
          <p className="sale-text">
            <strong>Promoção:</strong> {salePercentage}% OFF
          </p>
        )}
        {salePercentage > 0 && (
          <p style={{ color: "green" }}>
            <strong>Preço com Desconto:</strong> R${discountedPrice.toFixed(2)}
          </p>
        )}
        <p><strong>Descrição:</strong> {product.description}</p>
        <p><strong>Em Estoque:</strong> {product.inStock > 0 ? "Sim" : "Não"}</p>
        <div className="product-modal-footer">
          <button className="button-sec" onClick={onClose}>
            Fechar
          </button>
          <button className="button">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
