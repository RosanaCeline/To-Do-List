import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Button from "../../components/Button/Button";
import CancelButton from "../../components/Button/CancelButton";
import * as taskService from "../../services/taskService";
import styles from "./Tasks.module.css";

export default function Tasks() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [datetime, setDatetime] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(50);
  const [editId, setEditId] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();
  const notify = (message) => toast.warning(message);

  useEffect(() => {
    document.title = "Minhas Tarefas - Lista de Tarefas";
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
  }, [auth]);

  // Carrega tarefas do backend
  useEffect(() => {
    if (!userId) return;
    const fetchTasks = async () => {
      try {
        const data = await taskService.listTasks(userId);
        setNotes(data);
      } catch (error) {
        notify("Erro ao carregar tarefas");
      }
    };
    fetchTasks();
  }, [userId]);

  const resetForm = () => {
    setIsExpanded(false);
    setTitle("");
    setContent("");
    setDatetime("");
    setCompleted(false);
    setTextareaHeight(50);
    setEditId(null);
  };

  const handleCancel = () => resetForm();

  // Adiciona ou edita tarefa
  const handleAddOrEditNote = async (e) => {
    e.preventDefault();
    if (!userId) return;

    // Validações
    if (!title.trim()) return notify("O título é obrigatório!");
    if (!content.trim()) return notify("O conteúdo da tarefa não pode estar vazio!");
    if (!datetime) return notify("A data e hora são obrigatórias!");

    const selectedDate = new Date(datetime);
    if (selectedDate < new Date()) return notify("A data e hora não podem ser anteriores ao momento atual!");

    const selectedDateISO = selectedDate.toISOString();
    // Evita duplicados por título ou por data/hora
    const duplicate = notes.some((note) => {
      const noteDate = new Date(note.dateTime).getTime(); // timestamp do backend
      const selectedTime = selectedDate.getTime();        // timestamp do input
      return (
        (note.title.trim().toLowerCase() === title.trim().toLowerCase() ||
        noteDate === selectedTime) &&
        note.id !== editId
      );
    });

    if (duplicate) return notify("Já existe uma tarefa com esse título ou data e hora!");


    const payload = {
      title,
      description: content,
      dateTime: selectedDate.toISOString(),
      completed,
    };

    try {
      if (editId) {
        const updated = await taskService.updateTask(editId, payload, userId);
        setNotes(notes.map((note) => (note.id === editId ? updated : note)));
        setEditId(null);
      } else {
        const newNote = await taskService.createTask(payload, userId);
        setNotes([newNote, ...notes]);
      }
      resetForm();
    } catch (error) {
      notify("Erro ao salvar a tarefa");
    }
  };

  // Deleta uma tarefa
  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      notify("Erro ao excluir tarefa");
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.description || note.content);

    if (note.dateTime) {
      const date = new Date(note.dateTime);
      // Ajusta para o horário local no formato yyyy-MM-ddTHH:mm
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setDatetime(local);
    } else {
      setDatetime("");
    }

    setCompleted(note.completed);
    setIsExpanded(true);

    const scrollHeight = Math.min(Math.max((note.description || note.content).length * 2, 50), 200);
    setTextareaHeight(scrollHeight);
    setEditId(note.id);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    const newHeight = Math.min(Math.max(e.target.scrollHeight, 50), 200);
    setTextareaHeight(newHeight);
  };

  // Botão de sair 
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("idToken");
    navigate("/login");
  };

  const formatDateTime = (dt) => {
    if (!dt) return "";
    return new Date(dt).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Minhas Tarefas</h1>
        <Button onClick={handleLogout} style={{ background: "#f44336" }}>Sair</Button>
      </div>

      <form onSubmit={handleAddOrEditNote} className={`${styles.form} ${isExpanded ? styles.expanded : ""}`}>
        {isExpanded && (
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        )}

        <textarea
          placeholder="Escreva uma tarefa..."
          value={content}
          onClick={() => setIsExpanded(true)}
          onChange={handleContentChange}
          className={styles.textarea}
          style={{ height: textareaHeight + "px" }}
        />

        {isExpanded && (
          <>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className={styles.input}
            />
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              Concluída
            </label>
          </>
        )}

        {isExpanded && (
          <div className={styles.actions}>
            <Button type="submit">{editId ? "Salvar" : "Adicionar"}</Button>
            <CancelButton resetCallback={handleCancel}>Cancelar</CancelButton>
          </div>
        )}
      </form>

      <div className={styles.grid}>
        {notes.map((note) => (
          <div
            key={note.id}
            className={styles.note}
            style={{
              opacity: note.completed ? 0.6 : 1,
              textDecoration: note.completed ? "line-through" : "none",
            }}
          >
            {note.title && <h3 className={styles.noteTitle}>{note.title}</h3>}
            <p className={styles.noteContent}>{note.description || note.content}</p>
            <p style={{ fontSize: "0.8rem", color: "#555" }}>{formatDateTime(note.dateTime)}</p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button className={styles.deleteBtn} onClick={() => handleDelete(note.id)}>Excluir</button>
              <button className={styles.deleteBtn} onClick={() => handleEdit(note)} style={{ color: "#6c63ff" }}>Editar</button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
