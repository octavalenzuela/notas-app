import { useEffect, useState } from "react";
import api from "./api.js";
import "./App.css";

function App() {
  // estado para las notas
  const [notes, setNotes] = useState([]);

  // estado para el formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [importancia, setImportancia] = useState("leve");

  // cargar notas al inicio
  useEffect(() => {
    fetchNotes();
  }, []);

  // trae las notas del backend
  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error al obtener notas:", error);
    }
  };

  // crear nota
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaNota = {
      titulo,
      descripcion,
      importancia,
    };

    try {
      const response = await api.post("/notes", nuevaNota);
      setNotes((prev) => [...prev, response.data]);

      // limpiar formulario
      setTitulo("");
      setDescripcion("");
      setImportancia("leve");
    } catch (error) {
      console.error("Error al crear nota:", error);
    }
  };

  // eliminar nota
  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Notas App (Java + React)</h1>

      {/* Formulario para crear nota */}
      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            Título:
            <input
              className="input"
              placeholder="Ingrese título de la nota"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="label">
            Descripción:
            <textarea
              className="textarea"
              placeholder="Ingrese descripción de la nota"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="label">
            Importancia:
            <select
              className="select"
              value={importancia}
              onChange={(e) => setImportancia(e.target.value)}
            >
              <option value="leve">Leve</option>
              <option value="normal">Normal</option>
              <option value="importante">Importante</option>
              <option value="muy importante">Muy importante</option>
            </select>
          </label>
        </div>

        <button className="btn btn-primary" type="submit">
          Crear Nota
        </button>
      </form>

      {/* Lista de notas */}
      <h2 className="section-title">Notas</h2>
      {notes.length === 0 ? (
        <p className="empty-state">No hay notas todavía. ¡Crea la primera!</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3 className="note-title">{note.titulo}</h3>
              <p className="note-description">{note.descripcion}</p>
              <p className="note-importancia">
                <strong>Relevancia:</strong> {note.importancia}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(note.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
