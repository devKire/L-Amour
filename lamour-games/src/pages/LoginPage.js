import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config"; // Importe a configuração do Firebase
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Importe as funções necessárias
import { routes } from "../router/routes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para armazenar erros
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    setError(""); // Limpa qualquer erro anterior

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login realizado com sucesso!");
      navigate(routes.home); // Redireciona para a página inicial após login
    } catch (err) {
      setError(err.message); // Captura e define a mensagem de erro
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate(routes.home); // Redireciona após login bem-sucedido
    } catch (error) {
      console.error("Erro ao autenticar com Google:", error);
      setError("Erro ao autenticar com Google. Tente novamente.");
    }
  };

  return (
    <div className="ls-container">
      <div className="form-ls">
        <div className="logolamour">
          <img src="/assets/logo.png" alt="Logo da L'AMour Games" />
        </div>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
              required
            />
            <label htmlFor="floatingInput">Seu endereço de e-mail</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
              required
            />
            <label htmlFor="floatingPassword">Sua senha</label>

          </div>

          {error && <p className="text-danger">Senha ou email incorretos.</p>} {/* Mostra mensagem de erro */}

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Lembrar meu login
            </label>
          </div>

          <button className="ls-button button mb-3" type="submit">Entrar</button>
          
          {/* <button className="gsi-material-button mb-4" type="button" onClick={signInWithGoogle}>
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: "block" }}
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Entrar com o Google</span>
              <span style={{ display: "none" }}>Entrar com o Google</span>
            </div>
          </button> */}

          <p>Não tem uma conta? <Link to={routes.signup}>Cadastre-se</Link></p>
          {/* <p>
              Esqueceu sua senha? 
              <Link to={routes.resetPassword}>Redefina sua senha</Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
