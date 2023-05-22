import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import axios from "axios";

// Falta implementar o restante além de email e senha
const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [nome, setNome] = useState('');
 // seria interessante uma caixa de seleção para o gênero 
  const [genero, setGenero] = useState('');
  const [idade, setIdade] = useState('');
  const [imagem, setImage] = useState('');
  const backendUrl: string = 'http://127.0.0.1:3333/api';


  const handleRegister = () => {
    // Dados para criar uma conta
    const accountData: any = {
      nome: nome,
      email: email,
      senha: senha,
      idade: idade,
      genero: genero,
      image: ''
    };
    // Faça a chamada de API para obter a lista de usuários
    axios.post(`${backendUrl}/perfils`, accountData).then((response: any) => {
    // Processar a resposta recebida do backend
    const account: any = response.data;
    console.log(account); // Exemplo de manipulação dos dados recebidos
  }).catch((error: any) => {
    // Lidar com erros na chamada de API
    console.error(error);
  });
  
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput type="email" placeholder="Email" value={email} onIonChange={(e: any) => setEmail(e.target.value)} />
        <IonInput type="password" placeholder="Senha" value={senha} onIonChange={(e: any) => setPassword(e.target.value)} />
        <IonInput type="text" placeholder="Nome" value={nome} onIonChange={(e: any) => setNome(e.target.value)} />
        <IonInput type="text" placeholder="Genero" value={genero} onIonChange={(e: any) => setGenero(e.target.value)} />
        <IonInput type="number" placeholder="Idade" value={idade} onIonChange={(e: any) => setIdade(e.target.value)} />
        <IonButton expand="block" onClick={() => handleRegister()}>Registrar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
