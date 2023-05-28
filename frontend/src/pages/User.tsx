import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonLabel,
  IonItem,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { arrowBack, call, pencil } from 'ionicons/icons';
import { useHistory } from "react-router";
import axios from 'axios';

const UserPage = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const pegarDados = () => {
    axios.get('http://localhost:3333/api/dados-usuario', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const { email, age, name, gender, image } = response.data;

        // Atualize os elementos da página com os dados obtidos
        const nameElement = document.getElementById('name');
        if (nameElement) {
          nameElement.innerText = name;
        }

        const emailElement = document.getElementById('email');
        if (emailElement) {
          emailElement.innerText = email;
        }

        const genderElement = document.getElementById('gender');
        if (genderElement) {
          genderElement.innerText = gender;
        }

        const ageElement = document.getElementById('age');
        if (ageElement) {
          ageElement.innerText = age;
        }
      })
      .catch(error => {
        // Trate os erros da requisição
      });
  }

  const sair = () => {
    localStorage.removeItem('token');
    history.push("/login");
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start">
            <IonIcon icon={arrowBack}
            onClick={() => history.push("/home")} />
          </IonButton>
          <IonTitle>Perfil</IonTitle>
          <IonButton slot="end">
            <IonIcon icon={pencil} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="ion-padding">
          <IonItem>
            <IonAvatar slot="start">
              <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="User avatar" />
            </IonAvatar>
            <IonLabel>
              <h2 id="name">name</h2>
              <p id="email">email</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel id="gender">gender</IonLabel>
            <IonLabel id="age">age</IonLabel>
          </IonItem>
          <IonButton slot="end"
            expand="block"
            className="ion-padding-horizontal"
            onClick={() => sair()}>Logout</IonButton>
            <IonButton slot="end"
            expand="block"
            className="ion-padding-horizontal"
            onClick={() => pegarDados()}>DADOS</IonButton>
        </div>
        
      </IonContent>
    </>
  );
};

export default UserPage;
