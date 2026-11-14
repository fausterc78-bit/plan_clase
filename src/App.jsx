import { useState, useEffect } from 'react';
import './App.css'; // (o los imports que ya tenías)
function App() {
  const [sesion, setSesion] = useState(1);

  const planes = {
    1: {
      fecha: 'Sesión 1 (45-50 min)',
      tema: 'Uso de la Tecnología Actual: Consumo vs. Creación',
      objetivo:
        'Analizar el impacto de las herramientas digitales actuales (redes sociales e IA) en la vida cotidiana y distinguir entre consumo pasivo y uso productivo.',
      destrezas:
        'Pensamiento crítico, clasificación de hábitos digitales, identificación de riesgos en la red y trabajo colaborativo.',
      contenido:
        '• Herramientas digitales actuales y algoritmos.\n• Riesgos: desinformación, privacidad y distracción.\n• Ciudadanía digital responsable.',
      recursos:
        '• Pizarrón y marcadores.\n• Tarjetas de casos reales impresas.\n• Hojas de trabajo y lapiceros.',
      actividad:
        '1. Inicio (10 min): Diagnóstico "Mi huella diaria" clasificando apps usadas en las últimas 24h.\n2. Desarrollo (25 min): Análisis en equipos de 4 casos cotidianos sobre redes sociales e IA, definiendo problema, consecuencias y 2 acuerdos de uso.\n3. Cierre (15 min): Plenaria de 2 minutos por equipo y síntesis en el pizarrón.'
    },
    2: {
      fecha: 'Sesión 2 (45-50 min)',
      tema: 'Introducción al Desarrollo de Páginas Web (HTML)',
      objetivo:
        'Comprender cómo funciona una página web en el navegador y estructurar un documento básico utilizando etiquetas fundamentales de HTML.',
      destrezas:
        'Pensamiento lógico, sintaxis básica de marcado (HTML), organización visual de interfaces (wireframing) y creatividad digital.',
      contenido:
        '• Funcionamiento de navegador y código fuente.\n• Estructura base: <html>, <head>, <body>.\n• Etiquetas de texto: <h1>, <p>, listas y enlaces.',
      recursos:
        '• Computadoras con editor de texto / Vite.\n• Proyector multimedia.\n• Plantillas de bocetos web (wireframes).',
      actividad:
        '1. Inicio (10 min): Analogía "La construcción de una casa" (HTML estructura, CSS diseño, JS movimiento).\n2. Desarrollo (25 min): Taller práctico escribiendo el código de "Mi primera página web" y visualizándolo en el navegador.\n3. Cierre (15 min): Mini-feria de proyectos web mostrando los resultados en pantalla o boceto.'
    }
  };

  const datos = planes[sesion];

  return (
    <div className="pagina-fondo">
      {/* Selector superior para cambiar de sesión */}
      <div className="barra-sesiones">
        <button
          className={sesion === 1 ? 'tab-activa' : 'tab'}
          onClick={() => setSesion(1)}
        >
          Ver Sesión 1: Tecnología Actual
        </button>
        <button
          className={sesion === 2 ? 'tab-activa' : 'tab'}
          onClick={() => setSesion(2)}
        >
          Ver Sesión 2: Páginas Web (HTML)
        </button>
      </div>

      {/* Hoja estilo formato de plan de clase */}
      <div className="hoja-plan">
        {/* Banner superior verde */}
        <header className="banner-superior">
          <h1>Formato de Plan de clase</h1>
          <h2>Tecnologías del Aprendizaje y la Comunicación (TAC)</h2>
        </header>

        {/* Título coral */}
        <div className="seccion-titulo">
          <h3 className="titulo-coral">Plan de clase</h3>
        </div>

        {/* Datos generales con líneas verdes */}
        <div className="datos-generales">
          <div className="fila-datos">
            <div className="campo">
              <span className="etiqueta-campo">Curso:</span>
              <span className="linea-dato">Segundo Básico</span>
            </div>
            <div className="campo">
              <span className="etiqueta-campo">Asignatura:</span>
              <span className="linea-dato">Computación / TAC</span>
            </div>
            <div className="campo">
              <span className="etiqueta-campo">Fecha:</span>
              <span className="linea-dato">{datos.fecha}</span>
            </div>
          </div>

          <div className="fila-datos fila-segunda">
            <div className="campo campo-grande">
              <span className="etiqueta-campo">Tema:</span>
              <span className="linea-dato">{datos.tema}</span>
            </div>
            <div className="campo campo-mediano">
              <span className="etiqueta-campo">Docente:</span>
              <span className="linea-dato">Prof. Faustino Calel Salam</span>
            </div>
          </div>
        </div>

        {/* Cuadrícula de bloques verdes */}
        <div className="grid-bloques">
          <div className="bloque">
            <div className="bloque-header">OBJETIVO</div>
            <div className="bloque-cuerpo">{datos.objetivo}</div>
          </div>

          <div className="bloque">
            <div className="bloque-header">DESTREZAS</div>
            <div className="bloque-cuerpo">{datos.destrezas}</div>
          </div>

          <div className="bloque">
            <div className="bloque-header">CONTENIDO</div>
            <div className="bloque-cuerpo texto-pre">{datos.contenido}</div>
          </div>

          <div className="bloque">
            <div className="bloque-header">RECURSOS</div>
            <div className="bloque-cuerpo texto-pre">{datos.recursos}</div>
          </div>
        </div>

        {/* Bloque ancho inferior */}
        <div className="bloque bloque-ancho">
          <div className="bloque-header">ACTIVIDAD</div>
          <div className="bloque-cuerpo texto-pre">{datos.actividad}</div>
        </div>
      </div>
    </div>
  );
}

export default App;import { useState, useEffect } from 'react';

// Reemplaza estos valores con los de tu cuenta de NocoDB
const NOCODB_URL = 'https://app.nocodb.com/api/v3/data/pi7zdtgxtl7aopg/mv65qthwqg52b3b/records?pageSize=25';
const API_TOKEN = 'https://app.nocodb.com/account/tokens';

export default function SeccionComentarios() {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [listaComentarios, setListaComentarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  // 1. Obtener los registros existentes (GET)
  const obtenerComentarios = async () => {
    try {
      const respuesta = await fetch(NOCODB_URL, {
        method: 'GET',
        headers: {
          'xc-token': API_TOKEN,
          'Content-Type': 'application/json',
        },
      });
      const datos = await respuesta.json();
      setListaComentarios(datos.list || []);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  // 2. Guardar un nuevo registro en NocoDB (POST)
  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !comentario.trim()) return;

    setCargando(true);
    try {
      const respuesta = await fetch(NOCODB_URL, {
        method: 'POST',
        headers: {
          'xc-token': API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre: nombre,
          Comentario: comentario,
        }),
      });

      if (respuesta.ok) {
        setNombre('');
        setComentario('');
        obtenerComentarios(); // Recarga la lista automáticamente
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Comentarios de la Clase</h3>

      <form onSubmit={enviarComentario} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <textarea
          placeholder="Escribe tu comentario sobre la clase..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
          rows="3"
          style={{ padding: '8px' }}
        />
        <button type="submit" disabled={cargando} style={{ padding: '10px', backgroundColor: '#119c73', color: 'white', border: 'none', cursor: 'pointer' }}>
          {cargando ? 'Enviando...' : 'Publicar Comentario'}
        </button>
      </form>

      <div>
        {listaComentarios.map((item) => (
          <div key={item.Id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <strong>{item.Nombre}</strong>
            <p style={{ margin: '5px 0 0' }}>{item.Comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}import { useState, useEffect } from 'react';

// Reemplaza estos valores con los de tu cuenta de NocoDB
const NOCODB_URL = 'https://app.nocodb.com/api/v2/tables/mv65qthwqg52b3b/records';
const API_TOKEN = 'TU_TOKEN_DE_NOCODB_AQUI';

export default function SeccionComentarios() {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [listaComentarios, setListaComentarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  // 1. Obtener los registros existentes (GET)
  const obtenerComentarios = async () => {
    try {
      const respuesta = await fetch(NOCODB_URL, {
        method: 'GET',
        headers: {
          'xc-token': API_TOKEN,
          'Content-Type': 'application/json',
        },
      });
      const datos = await respuesta.json();
      setListaComentarios(datos.list || []);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  // 2. Guardar un nuevo registro en NocoDB (POST)
  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !comentario.trim()) return;

    setCargando(true);
    try {
      const respuesta = await fetch(NOCODB_URL, {
        method: 'POST',
        headers: {
          'xc-token': API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre: nombre,
          Comentario: comentario,
        }),
      });

      if (respuesta.ok) {
        setNombre('');
        setComentario('');
        obtenerComentarios(); // Recarga la lista automáticamente
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Comentarios de la Clase</h3>

      <form onSubmit={enviarComentario} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <textarea
          placeholder="Escribe tu comentario sobre la clase..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
          rows="3"
          style={{ padding: '8px' }}
        />
        <button type="submit" disabled={cargando} style={{ padding: '10px', backgroundColor: '#119c73', color: 'white', border: 'none', cursor: 'pointer' }}>
          {cargando ? 'Enviando...' : 'Publicar Comentario'}
        </button>
      </form>

      <div>
        {listaComentarios.map((item) => (
          <div key={item.Id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <strong>{item.Nombre}</strong>
            <p style={{ margin: '5px 0 0' }}>{item.Comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}