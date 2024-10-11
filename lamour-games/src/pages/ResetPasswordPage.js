import React, { useState } from "react";
import { auth } from "../firebase-config"; 
import { sendPasswordResetEmail } from "firebase/auth"; 
import { useNavigate } from "react-router-dom"; 
import { routes } from "../router/routes";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true); 

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Um link para redefinição de senha foi enviado para seu e-mail. Verifique sua caixa de entrada e também a pasta de spam.");
      navigate(routes.login); 
    } catch (err) {
      console.error(err); 
      setError("Erro ao enviar o link de redefinição. Verifique se o e-mail está correto.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="ls-container">
      <div className="form-ls">
        <h1>Redefinir Senha</h1>
        <form onSubmit={handleResetPassword}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Seu endereço de e-mail</label>
          </div>

          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}

          <button 
            className="ls-button button mb-3" 
            type="submit" 
            disabled={loading} 
          >
            {loading ? "Enviando..." : "Enviar Link de Redefinição"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
