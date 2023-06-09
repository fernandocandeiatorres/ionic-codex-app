import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
}
  from "@ionic/react";
import React, { useState } from "react";
import { trash, person, pencilSharp, closeSharp } from "ionicons/icons";
import { useHistory } from "react-router";
import './Home.css';
import axios from "axios";
import { useEffect } from 'react';



const Home: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [completos, setCompletos] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const id = localStorage.getItem('id');
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:3333/api/users/${id}`)
      .then(response => {
        const Todos = response.data.user.todos;
        const Completos = response.data.user.completos;
        if (Todos) {
          setTodos(Todos.split('-?!$%'));
        } else {
          setTodos([]);
        }
        if(Completos) {
          setCompletos(Completos.split('-?!$%'));
        } else {
          setCompletos([]);
        }
      })
  }, []);

  const atualizar = () => {
    const todosString = todos.join('-?!$%');
    const completosString = completos.join('-?!$%');
    const accountData: any = {
      todos: todosString,
      completos: completosString
    };
    
    axios.patch(`http://localhost:3333/api/users/${id}`, accountData).then((response: any) => {
      const account: any = response.data;
      console.log(account);
    }).catch((error: any) => {
      console.error(error);
    });

  };

  const isLoged = () =>{
    if(localStorage.getItem('token')){
      return true
    }
    else{
      return false
    }
  }
  // Lógica para marcar uma task como completa, ou desmarcar
  // Basicamente qnd vc marca, você adiciona a string "completed" no final
  // da palavra
  const handleTodoChange = (event: CustomEvent, index: number) => {
    const newTodos = [...todos];
    if (event.detail.checked) {
      newTodos[index] = `${todos[index]} (completed)`;
    } else {
      newTodos[index] = todos[index].replace(" (completed)", "");
    }
    setTodos(newTodos);
    atualizar();
  };

  // como as tasks completa tem a string "completed" no final da palavra
  // realizamos uma filtragem a partir disso.
  const handleClearCompleted = () => {
    const oldCompletos = [...completos];
    const newCompletos = todos.filter((todo) => todo.endsWith("(completed)"));
    const allCompletos = oldCompletos.concat(newCompletos);
    const newTodos = todos.filter((todo) => !todo.endsWith("(completed)"));
    setTodos(newTodos);
    setCompletos(allCompletos);
    atualizar();
  };

  // apaga uma task especifica da lista
  const handleEraseTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    atualizar();
  };

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      const newTodos = [...todos];
      if (editingIndex !== null) {
        newTodos[editingIndex] = todoText;
        setEditingIndex(null);
      } else {
        newTodos.push(todoText);
      }
      setTodos(newTodos);
      setTodoText("");
      setShowModal(false);
      atualizar();
    }
  };

  const direcionar = ()=>{
    atualizar();
    if(isLoged()){
      history.push("/user")
    }
    else{
      history.push("/login")
    }
  }

  const handleEditTodo = (index: number) => {
    setTodoText(todos[index].replace(" (completed)", ""));
    setEditingIndex(index);
    setShowModal(true);
    atualizar();
  };

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton
            slot="end"
            className="ion-padding-horizontal"
            onClick={() => direcionar()}
          >
            <IonIcon icon={person}></IonIcon>
          </IonButton>
          <IonTitle slot="start">ToDex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="full">
          {todos.map((todo, index) => (
            <IonItem key={index}>
              <IonLabel>{todo.replace(" (completed)", "")}</IonLabel>
              <IonCheckbox
                slot="start"
                checked={todo.endsWith("(completed)")}
                onIonChange={(e) => handleTodoChange(e, index)}
              />
              <IonButton slot="end" onClick={() => handleEditTodo(index)}>
                <IonIcon icon={pencilSharp}></IonIcon>
              </IonButton>
              <IonButton slot="end" fill="solid" onClick={() => handleEraseTodo(index)}>
                <IonIcon icon={trash}></IonIcon>
              </IonButton>
            </IonItem>
          ))}
          <IonItem>
            <IonButton expand="block" onClick={() => setShowModal(true)}>
              Adicionar Tarefa
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton expand="block" onClick={handleClearCompleted}>
              Limpar Tarefas Completas
            </IonButton>
          </IonItem>
        </IonList >

        <IonList lines="full">
          {completos.map((todo, index) => (
            <IonItem key={index}>
              <IonLabel>{todo.replace(" (completed)", "")}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                {editingIndex !== null ? "Edit Todo" : "Add Todo"}
              </IonTitle>
              <IonButton slot="end" onClick={() => setShowModal(false)}>
                <IonIcon icon={closeSharp}></IonIcon>
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating"></IonLabel>
              <IonInput
                value={todoText}
                onIonInput={(e) => setTodoText(e.detail.value!)}
              >
              </IonInput>
            </IonItem>
            <IonButton expand="block" onClick={handleAddTodo}>
              {editingIndex !== null ? "Save Changes" : "Add Todo"}
            </IonButton>
          </IonContent>

        </IonModal>
        <IonButton expand="block" onClick={atualizar}>
          Salvar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Home;
