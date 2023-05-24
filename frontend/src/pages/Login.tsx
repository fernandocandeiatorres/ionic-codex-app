import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonIcon } from '@ionic/react';
import { homeSharp } from "ionicons/icons";
import { useHistory } from "react-router";
import axios from "axios";

import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const backendUrl = 'http://127.0.0.1:3333/api';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/login`, { email, password });

      // Lógica para tratar a resposta do backend após o login bem-sucedido
      console.log(response.data);
      window.location.href = '/';
    } catch (error) {
      // Lógica para tratar o erro de login
      console.error(error);
    };
      
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton routerLink="/home">
            <IonIcon icon={homeSharp}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleLogin}>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <IonHeader><h2>LOGIN</h2></IonHeader>
          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="solid"
            placeholder="fulanodetal@gmail.com"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
          <IonInput
            type='password'
            label="Senha"
            labelPlacement="floating"
            fill="solid"
            placeholder="*******"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
          <IonButton type="submit" expand="block">
            Login
          </IonButton>
          <IonButton slot="end"
            onClick={() => history.push("/register")}
            expand="block">
            Cadastrar Conta
          </IonButton>
        </form>
        
      </IonContent>
    </IonPage>
  );

};

export default LoginPage;
