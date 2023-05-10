import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Envie o "token" para o backend
    const response = await fetch('https://sitedobackend.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      // Se o login for bem sucedido, redirecione para a página inicial
      window.location.href = '/';
    } else {
      // Se o login falhar, exiba uma mensagem de erro
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton routerLink="/home">Home</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleLogin}>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <IonHeader>Login</IonHeader>
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
        </form>
      </IonContent>
    </IonPage>
  );

};

export default LoginPage;
