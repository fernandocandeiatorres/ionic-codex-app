import React, { useState } from 'react';
import { IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios';
import { useHistory } from "react-router";

const Edit: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const id = localStorage.getItem('id');

  
    const handleRegister = () => {
        const accountData: any = {};
        if (name !== '') {
          accountData.name = name;
        } 
        
        if (email !== '') {
          accountData.email = email;
        }
        
        if (password !== '') {
          accountData.password = password;
        }
        
        if (age !== '') {
          accountData.age = age;
        }
        if (gender !== '') {
          accountData.gender = gender;
        }
        
        accountData.image = image;
      axios.patch(`http://localhost:3333/api/users/${id}`, accountData).then((response: any) => {
  
        // Processar a resposta recebida do backend
        const account: any = response.data;
        console.log(account);
        history.push("/user");
      }).catch((error: any) => {
        // Lidar com erros na chamada de API
        console.error(error);
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
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <IonButton expand="full" onClick={handleRegister}>
        Editar Conta
      </IonButton>
    </form>
  );
};

export default Edit;