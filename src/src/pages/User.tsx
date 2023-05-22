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
// Ainda não consegui adicionar essa tela de usuario, mas comecei a implementar já
const UserPage = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start">
            <IonIcon icon={arrowBack} />
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
              <h2>Fulano de Tal</h2>
              <p>fulanotalsilva@gmail.com</p>
            </IonLabel>
          </IonItem>
          <IonItem>   
        <IonIcon slot="start" icon={call} />           
         <IonLabel>Phone: +1 555-555-5555</IonLabel>         
        </IonItem>
          <IonButton expand="block">Logout</IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default UserPage;
