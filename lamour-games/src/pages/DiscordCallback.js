import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config"; 
import { doc, setDoc } from "firebase/firestore"; 
import { routes } from "../router/routes"; 

const DiscordCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      exchangeCodeForAccessToken(code); 
    } else {
      navigate(routes.home); 
      setLoading(false); 
    }
  }, [navigate]);

  const exchangeCodeForAccessToken = async (code) => {
    const tokenUrl = 'https://discord.com/api/oauth2/token';
    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_DISCORD_CLIENT_ID,
      client_secret: process.env.REACT_APP_DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.REACT_APP_DISCORD_REDIRECT_URI,
    });
  
    // Log das credenciais para depuração
    console.log('Client ID:', process.env.REACT_APP_DISCORD_CLIENT_ID);
    console.log('Client Secret:', process.env.REACT_APP_DISCORD_CLIENT_SECRET);
    console.log('Redirect URI:', process.env.REACT_APP_DISCORD_REDIRECT_URI);
  
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });
      const data = await response.json();
      
      if (response.ok) {
        console.log('Token de acesso obtido:', data.access_token);
        await linkDiscordAccount(data.access_token); 
      } else {
        console.error('Erro ao obter o token:', response.status, response.statusText, data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição para o token:', error);
      setLoading(false);
    }
  };
  
  const linkDiscordAccount = async (accessToken) => {
    try {
      const userResponse = await fetch('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await userResponse.json();
  
      if (!userResponse.ok) {
        console.error('Erro ao obter informações do usuário:', userData);
        return;
      }
  
      const currentUser = auth.currentUser;
      console.log("Usuário autenticado:", currentUser);
  
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        console.log("Preparando para vincular conta do Discord:", userData);
  
        // Monta a URL do avatar do Discord
        const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
  
        await setDoc(userDocRef, {
          discordId: userData.id,
          discordUsername: userData.username, 
          discordAvatar: avatarUrl,           
          discordConnected: true,
        }, { merge: true });
  
        console.log("Conta do Discord vinculada com sucesso!");
      } else {
        console.error('Nenhum usuário autenticado encontrado');
      }
    } catch (error) {
      console.error('Erro ao vincular a conta do Discord:', error);
    } finally {
      setLoading(false);
      navigate(routes.home);
    }
  };
  

  return (
    <div>
      {loading ? <p>Processando...</p> : <p>Conta do Discord vinculada com sucesso!</p>}
    </div>
  );
};

export default DiscordCallback;
