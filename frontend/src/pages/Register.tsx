import React, { useState } from 'react';
import { IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [age, setAge] = useState('');

  const handleRegister = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('gender', gender);
    formData.append('image', image!);
    formData.append('age', age);

    axios.post('http://localhost:3333/api/register', formData).then((response) => {
        console.log(response.data);
        // Faça algo com a resposta da API, como redirecionar para a página de perfil ou exibir uma mensagem de sucesso
      })
      .catch((error) => {
        console.error(error);
        // Trate o erro, exiba uma mensagem de erro ou execute outra lógica adequada
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };


  return (
    <form>
      <IonInput
        placeholder="Nome"
        value={name}
        onIonChange={(e) => setName(e.detail.value!)}
      />
      <IonInput
        placeholder="Email"
        value={email}
        onIonChange={(e) => setEmail(e.detail.value!)}
      />
      <IonInput
        placeholder="Password"
        value={password}
        type="password"
        onIonChange={(e) => setPassword(e.detail.value!)}
      />
      <IonInput
        placeholder="Gender"
        value={gender}
        onIonChange={(e) => setGender(e.detail.value!)}
      />
      <IonInput
        placeholder="Age"
        value={age}
        type="number"
        onIonChange={(e) => setAge(e.detail.value!)}
      />
      <IonButton expand="full" onClick={handleRegister}>
        Criar Conta
      </IonButton>
    </form>
  );
};

export default RegisterForm;