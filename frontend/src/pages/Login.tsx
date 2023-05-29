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
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    axios.post('http://localhost:3333/api/login', formData)
      .then((response) => {
        const { token, id } = response.data;
        console.log(response.data)
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        history.push("/home");
      })
      
  };

  return (
    <IonPage>
      <IonHeader>
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
