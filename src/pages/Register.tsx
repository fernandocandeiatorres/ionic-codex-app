import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
// Falta implementar o restante além de email e senha
const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
 // seria interessante uma caixa de seleção para o gênero 
  const [genero, setGenero] = useState('');
  const [idade, setIdade] = useState('');

  const handleRegister = () => {
    // Adicionar a lógica para registrar o usuário (backend api etc etc)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput type="email" placeholder="Email" value={email} onIonChange={(e: any) => setEmail(e.target.value)} />
        <IonInput type="password" placeholder="Password" value={password} onIonChange={(e: any) => setPassword(e.target.value)} />
        <IonInput type="nome" placeholder="Nome" value={nome} onIonChange={(e: any) => setNome(e.target.value)} />
        <IonInput type="genero" placeholder="Gênero" value={genero}} onIonChange={(e: any) => setGenero(e.target.value)} />
        <IonInput type="Idade" placeholder="Idade" value={idade} onIonChange={(e: any) => setIdade(e.target.value)} />
        <IonButton expand="block" onClick={handleRegister}>Registrar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
