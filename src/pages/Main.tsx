import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'

const features = [
  {
    title: 'Agenda de citas sin complicaciones',
    description:
      'Permite a tus pacientes reservar, reprogramar o cancelar citas fácilmente desde cualquier dispositivo, en cualquier momento.',
  },
  {
    title: 'Encuentra al especialista ideal',
    description:
      'Los pacientes pueden buscar médicos por especialidad, experiencia o disponibilidad, facilitando la conexión con el profesional adecuado.',
  },
  {
    title: 'Recordatorios automáticos',
    description:
      'Reduce ausencias y cancelaciones enviando notificaciones automáticas por correo o mensaje de texto para recordar cada cita.',
  },
  {
    title: 'Control total de la agenda médica',
    description:
      'Médicos y recepcionistas pueden gestionar la agenda de forma flexible: ajustar horarios, bloquear días, gestionar urgencias y optimizar el tiempo de consulta.',
  },
  {
    title: 'Seguridad de la información',
    description:
      'Protegemos los datos personales y médicos cumpliendo con los más altos estándares de privacidad y regulaciones internacionales.',
  },
  {
    title: 'Mejor experiencia para tus pacientes',
    description:
      'Ofrece un servicio moderno, cómodo y confiable. Pacientes satisfechos regresan y recomiendan tu centro médico.',
  },
  {
    title: 'Soporte y acompañamiento',
    description:
      'Nuestro equipo brinda soporte técnico y capacitación para que tu personal y médicos aprovechen al máximo la plataforma.',
  },
]

const Main = () => {
  const { user } = useAuthContext()

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Reserva tu cita médica en segundos
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          La forma más moderna y sencilla de gestionar tus reservas, agenda y
          pacientes.
        </p>
        <Link
          to={user ? '/admin' : '/auth/login'}
          className="inline-block bg-black text-white px-8 py-3 rounded-md text-lg font-semibold shadow hover:bg-gray-900 transition"
        >
          Comenzar ahora
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-card text-card-foreground rounded-lg shadow p-6 flex flex-col"
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ReservaCitasApp. Todos los derechos
          reservados.
        </p>
      </div>
    </div>
  )
}

export default Main
