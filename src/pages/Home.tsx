import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
  };

  // como as tasks completa tem a string "completed" no final da palavra
  // realizamos uma filtragem a partir disso.
  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.endsWith("(completed)"));
    setTodos(newTodos);
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
    }
  };

  const handleEditTodo = (index: number) => {
    setTodoText(todos[index].replace(" (completed)", ""));
    setEditingIndex(index);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {todos.map((todo, index) => (
            <IonItem key={index}>
              <IonLabel>{todo.replace(" (completed)", "")}</IonLabel>
              <IonCheckbox
                slot="start"
                checked={todo.endsWith("(completed)")}
                onIonChange={(e) => handleTodoChange(e, index)}
              />
              <IonButton slot="end" onClick={() => handleEditTodo(index)}>
                Edit
              </IonButton>
            </IonItem>
          ))}
          <IonItem>
            <IonButton expand="block" onClick={() => setShowModal(true)}>
              Add Todo
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton expand="block" onClick={handleClearCompleted}>
              Clear completed
            </IonButton>
          </IonItem>
        </IonList>
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                {editingIndex !== null ? "Edit Todo" : "Add Todo"}
              </IonTitle>
              <IonButton slot="end" onClick={() => setShowModal(false)}>
                Close
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Todo Text</IonLabel>
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
      </IonContent>
    </IonPage>
  );
};
export default Home;
