import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Aqui você pode adicionar a lógica para registrar o usuário
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput type="email" placeholder="Email" value={email} onIonChange={(e: any) => setEmail(e.target.value)} />
        <IonInput type="password" placeholder="Password" value={password} onIonChange={(e: any) => setPassword(e.target.value)} />
        <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
