import React, { useState, useEffect } from "react"; 
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'; 
import { auth } from '../firebase-config'; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { Link, useNavigate } from "react-router-dom"; 
import { routes } from "../router/routes"; 
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";

const SignupPage = () => { 
  const [email, setEmail] = useState(''); 
  const [emailExists, setEmailExists] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); 

  const [username, setUsername] = useState(''); 
  const [usernameExists, setUsernameExists] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false); 

  const [password, setPassword] = useState(''); 
  const [passwordConfirm, setPasswordConfirm] = useState(''); 
  const [passwordError, setPasswordError] = useState(false); 

  const [error, setError] = useState(""); 
  const db = getFirestore();
  const navigate = useNavigate(); 
  const [createUserWithEmailAndPassword ] = useCreateUserWithEmailAndPassword(auth);

  const checkUsernameExists = async (username) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const existingUsers = querySnapshot.docs.map(doc => doc.data().username);
    return existingUsers.includes(username);
  };

  const checkEmailExists = async (email) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const existingEmails = querySnapshot.docs.map(doc => doc.data().email);
    return existingEmails.includes(email);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (user) => {
    const usernameRegex = /^.+$/; 
    return usernameRegex.test(user);
  };

  useEffect(() => {
    const validateInputs = async () => {
      if (username) {
        const userExists = await checkUsernameExists(username);
        setUsernameExists(userExists);
      } else {
        setUsernameExists(false);
      }

      if (email) {
        const emailExists = await checkEmailExists(email);
        setEmailExists(emailExists);
      } else {
        setEmailExists(false);
      }
    };

    validateInputs();
  }, [username, email]); 

  const handleRegister = async (e) => {
    e.preventDefault(); 
  
    if (password.length < 6 || password !== passwordConfirm) {
      setPasswordError(true);
      return;
    }

    if (usernameExists || emailExists) {
      return; 
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: user.email,
        createdAt: new Date(),
      });
  
      console.log("Cadastro realizado com sucesso!");
      navigate(routes.login); 
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const displayName = user.displayName; 
      const email = user.email; 
  
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
  
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          username: displayName || "Usuário_" + user.uid.substring(0, 5), 
          email: email, 
          createdAt: new Date(),
        });
      } else {
        console.log("Usuário já existe no Firestore:", docSnap.data());
      }
  
      alert("Usuário autenticado com sucesso!");
    } catch (error) {
      console.error("Erro ao autenticar com Google:", error);
    }
  };

  return ( 
    <div className="ls-container"> 
      <div className="form-ls">
        <div className="logolamour">
          <img src="/assets/logo.png" alt="Logo da L'AMour Games" />
        </div>
        <form> 
          <h1>Cadastro de Usuário</h1> 
         
          <div className="form-floating"> 
            <label htmlFor="username" className="form-label">Nome de Usuário</label> 
            <input 
              type="text" 
              className={`form-control ${!isUsernameValid || usernameExists ? 'is-invalid' : ''}`} 
              id="username" 
              placeholder="Nome de usuário" 
              onChange={(e) => { 
                const usernameValue = e.target.value; 
                setUsername(usernameValue); 
                setIsUsernameValid(isValidUsername(usernameValue)); 
                setUsernameExists(false); 
              }} 
              required 
              maxLength={32} 
            /> 
            {!isUsernameValid && <div className="invalid-feedback">Nome de usuário é obrigatório.</div>}
            {usernameExists && <div className="invalid-feedback">Seu nome de usuário já existe.</div>}
          </div>

          <div className="form-floating"> 
            <label htmlFor="email" className="form-label">Email</label> 
            <input 
              type="email" 
              className={`form-control ${!isEmailValid || emailExists ? 'is-invalid' : ''}`} 
              id="email" 
              placeholder="seu_email@exemplo.com" 
              onChange={(e) => { 
                const emailValue = e.target.value; 
                setEmail(emailValue); 
                setIsEmailValid(isValidEmail(emailValue)); 
                setEmailExists(false); 
              }} 
              required
              maxLength={256} 
            /> 
            {!isEmailValid && <div className="invalid-feedback">Por favor, insira um endereço de e-mail válido.</div>}
            {emailExists && <div className="invalid-feedback">Este e-mail já está em uso.</div>}
          </div> 

          <div className="form-floating"> 
            <label htmlFor="password" className="form-label">Senha</label> 
            <input 
              type="password" 
              className={`form-control ${passwordError ? 'is-invalid' : ''}`} 
              id="password" 
              placeholder="sua_senha123@#!*." 
              onChange={(e) => { 
                setPassword(e.target.value); 
                setPasswordError(e.target.value.length < 6); 
              }} 
              required 
            /> 
            {passwordError && <div className="invalid-feedback">A senha deve ter pelo menos 6 caracteres.</div>}
          </div> 

          <div className="form-floating"> 
            <label htmlFor="passwordConfirm" className="form-label">Confirme sua Senha</label> 
            <input 
              type="password" 
              className={`form-control ${password !== passwordConfirm ? 'is-invalid' : ''}`} 
              id="passwordConfirm" 
              placeholder="sua_senha123@#!*." 
              onChange={(e) => { 
                setPasswordConfirm(e.target.value); 
              }} 
              required 
              maxLength={100} 
            /> 
            {password !== passwordConfirm && <div className="invalid-feedback">As senhas não coincidem.</div>}
          </div> 

          {error && <p style={{ color: "red" }}>Todos os campos são obrigatórios</p>} 

          <button className="ls-button button" type="submit" onClick={handleRegister}>Cadastrar</button> 

          <p>Já tem uma conta? <Link to={routes.login}>Entrar</Link></p> 
        </form> 
      </div>
    </div> 
  ); 
}; 

export default SignupPage;
