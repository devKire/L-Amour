import React from "react";
import { useNavigate } from "react-router-dom";
import stripePromise from '../stripe';
import { routes } from "../router/routes";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config"; 

const ProductModal = ({ show, onClose, product }) => {
  const navigate = useNavigate();

  if (!product || !show) return null; 

  const originalPrice = Number(product.price); 
  const salePercentage = product.sale ? parseFloat(product.sale) : 0; 
  const discountedPrice = salePercentage > 0 ? originalPrice * (1 - salePercentage / 100) : originalPrice;
  
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('product-modal-overlay')) {
      onClose();
    }
  };

  const handlePurchase = async () => {
    const user = auth.currentUser;
  
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);
  
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        
        if (userData.discordConnected) {
          handleCheckout();
        } else {
          alert("Por favor, conecte sua conta do Discord antes de finalizar a compra.");
          navigate(routes.userProfile); 
        }
      } else {
        console.error("Erro: Documento do usuário não encontrado.");
      }
    } else {
      navigate(routes.login);
    }
  };
  const handleCheckout = async () => {
    const stripe = await stripePromise;
  
    console.log('Enviando os seguintes itens para o backend:', {
      items: [{ id: product.name, price: originalPrice, quantity: 1 }], 
    });
  
    const response = await fetch('http://localhost:3001/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ id: product.name, price: originalPrice, quantity: 1 }], 
      }),
    });
  
    const session = await response.json();
  
    if (!session.id) {
      alert("Erro ao criar sessão de pagamento");
      return;
    }
  
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  
    if (result.error) {
      alert(result.error.message);
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
        <p><strong>Descrição:</strong></p>
        {product.description.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
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
        <p><strong>Em Estoque:</strong> {product.inStock > 0 ? "Sim" : "Não"}</p>
        <div className="product-modal-footer">
          <button className="button-sec" onClick={onClose}>
            Fechar
          </button>
          <button className="button" onClick={handlePurchase}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
