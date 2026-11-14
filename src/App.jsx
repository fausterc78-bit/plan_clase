import { useState, useEffect } from 'react';

const NOCODB_URL = 'https://app.nocodb.com/api/v2/tables/mv65qthwqg52b3b/records';
const API_TOKEN = 'TU_TOKEN_DE_NOCODB_AQUI';

function SeccionComentarios() {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [listaComentarios, setListaComentarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    let activo = true;

    const cargarComentarios = async () => {
      try {
        const respuesta = await fetch(NOCODB_URL, {
          method: 'GET',
          headers: {
            'xc-token': API_TOKEN,
            'Content-Type': 'application/json',
          },
        });
        const datos = await respuesta.json();
        if (activo) {
          setListaComentarios(datos.list || []);
        }
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      }
    };

    cargarComentarios();
    return () => {
      activo = false;
    };
  }, []);

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
        const recarga = await fetch(NOCODB_URL, {
          method: 'GET',
          headers: {
            'xc-token': API_TOKEN,
            'Content-Type': 'application/json',
          },
        });
        const datos = await recarga.json();
        setListaComentarios(datos.list || []);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fff', border: '1px solid #119c73', borderRadius: '8px' }}>
      <h3 style={{ color: '#119c73', marginBottom: '15px' }}>Comentarios y Retroalimentación</h3>

      <form onSubmit={enviarComentario} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          placeholder="Escribe tu comentario, duda o aporte sobre la clase..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
          rows="3"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={cargando} style={{ padding: '10px', backgroundColor: '#119c73', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {cargando ? 'Enviando...' : 'Publicar Comentario'}
        </button>
      </form>

      <div>
        {listaComentarios.map((item) => (
          <div key={item.Id} style={{ padding: '12px', borderBottom: '1px solid #eee', marginBottom: '8px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
            <strong style={{ color: '#119c73' }}>{item.Nombre}</strong>
            <p style={{ margin: '5px 0 0', color: '#333' }}>{item.Comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const estiloSeccion = { border: '2px solid #119c73', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fff' };
  const estiloTitulo = { backgroundColor: '#119c73', color: 'white', padding: '8px', textAlign: 'center', borderRadius: '4px', marginBottom: '10px', fontSize: '1.1rem' };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '850px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      
      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: '25px', borderBottom: '2px solid #119c73', paddingBottom: '15px' }}>
        <h1 style={{ color: '#119c73', fontSize: '1.8rem', marginBottom: '10px' }}>Uso de la Tecnología Actual: Consumo vs. Creación</h1>
        <p style={{ fontSize: '1.1rem' }}><strong>Docente:</strong> Prof. Faustino Calel Salam</p>
        <p style={{ fontSize: '0.95rem', color: '#666' }}><strong>Área / Subárea:</strong> Tecnologías de la Información y Comunicación</p>
      </div>

      {/* Competencia */}
      <div style={estiloSeccion}>
        <h3 style={estiloTitulo}>COMPETENCIA</h3>
        <p>Utiliza herramientas digitales y recursos de inteligencia artificial de manera crítica, ética y productiva para la resolución de problemas cotidianos y la creación de contenidos originales.</p>
      </div>

      {/* Indicadores de Logro */}
      <div style={estiloSeccion}>
        <h3 style={estiloTitulo}>INDICADORES DE LOGRO</h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Diferencia con claridad entre el consumo pasivo de contenidos digitales y la producción activa mediante tecnología.</li>
          <li>Analiza el impacto social, cognitivo y ético del uso frecuente de redes sociales y sistemas de inteligencia artificial.</li>
          <li>Propone alternativas de aprovechamiento constructivo y seguro de las herramientas tecnológicas en su entorno.</li>
        </ul>
      </div>

      {/* Contenidos */}
      <div style={estiloSeccion}>
        <h3 style={estiloTitulo}>CONTENIDOS</h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>Declarativos:</strong> Redes sociales, consumo pasivo vs. creación digital, y principios básicos de Inteligencia Artificial en la vida diaria.</li>
          <li><strong>Procedimentales:</strong> Clasificación y auditoría del tiempo de uso de aplicaciones en dispositivos móviles; análisis crítico de casos cotidianos.</li>
          <li><strong>Actitudinales:</strong> Conciencia crítica, autorregulación en el uso de pantallas y responsabilidad digital.</li>
        </ul>
      </div>

      {/* Objetivo */}
      <div style={estiloSeccion}>
        <h3 style={estiloTitulo}>OBJETIVO DE LA CLASE</h3>
        <p>Analizar el impacto de las herramientas digitales actuales (redes sociales e IA) en la vida cotidiana y distinguir entre consumo pasivo y uso productivo.</p>
      </div>

      {/* Actividades / Fases Metodológicas */}
      <div style={estiloSeccion}>
        <h3 style={estiloTitulo}>FASES METODOLÓGICAS Y ACTIVIDADES</h3>
        <div style={{ lineHeight: '1.6' }}>
          <p><strong>1. Inicio (10 min):</strong> Diagnóstico interactivo titulado <em>"Mi huella diaria"</em>, clasificando y tabulando las aplicaciones utilizadas en las últimas 24 horas.</p>
          <p><strong>2. Desarrollo (25 min):</strong> Trabajo en equipo analizando 4 casos cotidianos sobre redes sociales e inteligencia artificial; definición de problemas, consecuencias y establecimiento de 2 acuerdos de uso responsable.</p>
          <p><strong>3. Cierre (15 min):</strong> Plenaria de 2 minutos por equipo y síntesis conceptual general plasmada en el pizarrón.</p>
        </div>
      </div>

      {/* Recursos */}
      <div style={estiloSeccion}>
        <h3 style={estiloTitulo}>RECURSOS Y MATERIALES</h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Dispositivos móviles o computadoras con acceso a internet.</li>
          <li>Pizarrón, marcadores y hojas de trabajo impresas.</li>
          <li>Plataforma web interactiva integrada con base de datos en NocoDB para registro y comentarios.</li>
        </ul>
      </div>

      {/* Evaluación */}
      <div style={estiloSeccion}>
        <h3 style={estiloTitulo}>EVALUACIÓN</h3>
        <p><strong>Criterios:</strong> Participación activa, capacidad de análisis crítico en los casos de estudio, trabajo colaborativo y aportes constructivos registrados en la plataforma digital de la clase.</p>
        <p style={{ marginTop: '8px' }}><strong>Técnica / Instrumento:</strong> Observación directa y lista de cotejo.</p>
      </div>

      {/* Sección de Comentarios Conectada a NocoDB */}
      <SeccionComentarios />

      {/* Pie de Página */}
      <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #ccc', textAlign: 'center', color: '#555', fontSize: '0.9rem' }}>
        <p style={{ fontWeight: 'bold', color: '#119c73', marginBottom: '5px' }}>Plan de Clase Digital</p>
        <p style={{ margin: '3px 0' }}>Programación de Aplicaciones Web • Universidad Rafael Landívar</p>
        <p style={{ margin: '3px 0' }}>Desarrollado por Fauster Calel</p>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#777' }}>© 2026 Todos los derechos reservados</p>
      </footer>
    </div>
  );
}