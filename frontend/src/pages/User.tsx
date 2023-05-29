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
import { useEffect } from 'react';

const UserPage = () => {
  const history = useHistory();
  const id = localStorage.getItem('id');
  let Image: string | "" = "";

  useEffect(() => {
    axios.get(`http://localhost:3333/api/users/${id}`)
      .then(response => {
        const { email, age, name, gender, image } = response.data.user;
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
        
        const imageElement = document.getElementById('image');
        if (imageElement) {
          Image = "./ionic-codex-app/backend/tmp/uploads/" + image;
          imageElement.setAttribute("src", Image);
        }
        
      })
  }, []);


  const sair = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    history.push("/login");
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={() => history.push("/home")}>
            <IonIcon icon={arrowBack}  />
          </IonButton>
          <IonTitle>Perfil</IonTitle>
          <IonButton slot="end" routerLink="/edit">
            <IonIcon icon={pencil} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="ion-padding">
          <IonItem>
            <IonAvatar slot="start">
              <img src={Image} alt="User avatar" />
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
          <IonButton slot="end" expand="block" className="ion-padding-horizontal" onClick={() => sair()}>Logout</IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default UserPage;
