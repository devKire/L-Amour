import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase-config";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; 
import { routes } from "../router/routes"; 
import { FaPen } from "react-icons/fa"; 
import Header from "../components/Header";
import Section from "../components/Section";

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingProfileImg, setIsEditingProfileImg] = useState(false);
  const [discordConnected, setDiscordConnected] = useState(false); 
  const navigate = useNavigate(); 

  const [usernameExists, setUsernameExists] = useState(false);
  
  const checkUsernameExists = async (username) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const existingUsers = querySnapshot.docs.map(doc => doc.data().username);
    return existingUsers.includes(username);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("Usuário não está autenticado.");
        return;
      }

      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        setUserInfo(userSnapshot.data());
        setNewUsername(userSnapshot.data().username);
        setDiscordConnected(userSnapshot.data().discordConnected || false);
      } else {
        console.log("Nenhum documento encontrado para o usuário!");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const checkUsername = async () => {
      if (newUsername) {
        const exists = await checkUsernameExists(newUsername);
        setUsernameExists(exists);
      } else {
        setUsernameExists(false);
      }
    };
    
    checkUsername();
  }, [newUsername]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = async () => {
    if (!newUsername) {
      setError("O nome de usuário não pode estar vazio.");
      return;
    }

    if (usernameExists) {
      setError("Este nome de usuário já está em uso. Por favor, escolha outro.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("Usuário não está autenticado.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { username: newUsername });
      setUserInfo((prevInfo) => ({ ...prevInfo, username: newUsername }));
      setSuccess("Nome de usuário atualizado com sucesso!");
    } catch (error) {
      setError("Falha ao atualizar o nome de usuário: " + error.message);
      console.error("Erro ao atualizar o documento do Firestore:", error);
    } finally {
      setIsEditingUsername(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Você saiu com sucesso!");
      navigate(routes.login); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const connectDiscord = () => {
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID; 
    const redirectUri = process.env.REACT_APP_DISCORD_REDIRECT_URI;
    const scopes = "identify guilds"; 
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes}`;

    window.location.href = authUrl; 
  };


  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

return (
  <>
    <Header />
    <div className="user-profile-container">
      <Section title="Informações do Usuário" subtitle="">
        {userInfo ? (
          <div>
            {/* Exibição da imagem de perfil do usuário */}
            {userInfo.profileImg && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={userInfo.profileImg}
                  alt="Profile"
                  width="100"
                  height="100"
                  style={{ borderRadius: "50%", marginBottom: "10px", marginRight: "10px" }} 
                />
                <span onClick={() => setIsEditingProfileImg(!isEditingProfileImg)} style={{ cursor: "pointer" }}>
                  <FaPen />
                </span>
              </div>
            )}

            {/* Exibir o email e o nome de usuário */}
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Nome de Usuário:</strong> {userInfo.username} 
              <span onClick={() => setIsEditingUsername(!isEditingUsername)} style={{ cursor: "pointer", marginLeft: "5px" }}>
                <FaPen />
              </span>
            </p>

            {/* Exibir os dados do Discord, se estiver conectado */}
            {discordConnected && (
              <div>
                <p>
                  <strong>Discord:</strong> {userInfo.discordUsername}
                </p>
                <img
                  src={userInfo.discordAvatar}
                  alt="Avatar do Discord"
                  width="100"
                  height="100"
                  style={{ borderRadius: "50%", marginTop: "10px" }}
                />
              </div>
            )}

            <p><strong>Data de Criação da Conta:</strong> {formatDate(userInfo.createdAt)}</p>

            
            {/* Formulário de edição do nome de usuário */}
            {isEditingUsername && (
              <div className="edit-username-form">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Novo Nome de Usuário"
                />
                {usernameExists && <div className="text-danger">Este nome de usuário já está em uso.</div>}
                <button onClick={handleUsernameChange}>Atualizar Nome de Usuário</button>
              </div>
            )}

            <button onClick={connectDiscord}>
              {discordConnected ? "Discord Conectado" : "Conectar ao Discord"}
            </button>

            <button onClick={handleLogout}>Sair</button>
          </div>
        ) : (
          <p>Carregando informações do usuário...</p>
        )}
      </Section>
    </div>
  </>
);
};

export default UserProfilePage;
