import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
// CAMBIO: Se eliminó 'useWatch' que no se usaba.
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { z } from 'zod';

// Hooks para consumir los endpoints
import { usePatients } from '../../hook/patients/usePatients';
import { useDoctors } from '../../hook/doctors/useDoctors';
import { useSpecialties } from '../../hook/specialties/useSpecialties';
// CAMBIO: Nombres de hooks corregidos para que coincidan con su uso.
import { useSchedulesCreate } from '../../hook/schedules/useCreateSchedule'; 
import { useAppointmentCreate } from '../../hook/appointments/useAppoitmentsCreate';

import CardTitle from '../commons/CardTitle';

const appointmentSchema = z.object({
  patientId: z.number().min(1, 'Debes seleccionar un paciente'),
  specialtyId: z.number().min(1, 'Debes seleccionar una especialidad'),
  doctorId: z.number().min(1, 'Debes seleccionar un médico'),
  appointmentTime: z.string().min(1, 'Debes seleccionar una fecha y hora'),
});

type FormValues = z.infer<typeof appointmentSchema>;

type Schedule = {
  id: number;
};

const AppointmentsEdit = () => {
  const navigate = useNavigate();
  const createSchedule = useSchedulesCreate();
  const createAppointment = useAppointmentCreate();

  const { data: patients, isLoading: isLoadingPatients } = usePatients();
  const { data: doctors, isLoading: isLoadingDoctors } = useDoctors();
  const { data: specialties, isLoading: isLoadingSpecialties } = useSpecialties();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: 0,
      specialtyId: 0,
      doctorId: 0,
      appointmentTime: '',
    },
  });

  const selectedSpecialtyId = watch('specialtyId');

  const onSubmit = async (data: FormValues) => {
    const scheduleData = {
      specialtyId: data.specialtyId,
      createdAt: new Date(),
      doctorId: data.doctorId,
      scheduleDate: new Date(data.appointmentTime).toISOString().split('T')[0],
      timeFrom: new Date(data.appointmentTime).toTimeString().split(' ')[0],
      timeTo: new Date(new Date(data.appointmentTime).getTime() + 30 * 60000).toTimeString().split(' ')[0],
    };

    createSchedule.mutate(scheduleData, {
      onSuccess: (newSchedule: Schedule) => {
        //
        // CAMBIO PRINCIPAL AQUÍ
        // Se ajustó este objeto para que coincida con el tipo esperado por la mutación.
        //
        const appointmentData = {
          // Propiedades existentes
          patientId: data.patientId,
          scheduleId: newSchedule.id,
          status: 'PENDING',
          notes: 'Cita creada desde el formulario.',

          // Propiedades añadidas que faltaban
          createdAt: new Date(),
          paymentStatus: 'PENDING', // O el estado de pago inicial que uses
          deleted: false,
        };

        createAppointment.mutate(appointmentData, {
          onSuccess: () => {
            navigate('/admin/medical-appointments');
          },
          onError: (err: any) => {
            setError('root', {
              message: err?.message || 'Error al crear la cita. Intente nuevamente.',
            });
          },
        });
      },
      onError: (err: any) => {
        const apiErrorMessage = err.response?.data?.message || 'Error al crear el horario.';
        setError('root', {
          message: `${apiErrorMessage} Verifique los datos e intente nuevamente.`,
        });
      },
    });
  };

  if (isLoadingPatients || isLoadingDoctors || isLoadingSpecialties) {
    return <div>Cargando datos...</div>;
  }

  const filteredDoctors = doctors?.filter(doctor =>
    doctor.specialties?.some(spec => spec.id === selectedSpecialtyId)
  ) || [];

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle title="Nueva Cita" to="/admin/appointments" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Selector de Paciente */}
        <FormControl fullWidth error={!!errors.patientId}>
          <InputLabel id="patient-label">Paciente</InputLabel>
          <Controller
            name="patientId"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="patient-label" label="Paciente">
                <MenuItem value={0} disabled>
                  <em>Seleccione un paciente</em>
                </MenuItem>
                {patients?.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {`${patient.profile.name} ${patient.profile.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.patientId && <FormHelperText>{errors.patientId.message}</FormHelperText>}
        </FormControl>

        {/* Selector de Especialidad */}
        <FormControl fullWidth error={!!errors.specialtyId}>
          <InputLabel id="specialty-label">Especialidad</InputLabel>
          <Controller
            name="specialtyId"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="specialty-label" label="Especialidad">
                <MenuItem value={0} disabled>
                  <em>Seleccione una especialidad</em>
                </MenuItem>
                {specialties?.map((spec) => (
                  <MenuItem key={spec.id} value={spec.id}>
                    {spec.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.specialtyId && <FormHelperText>{errors.specialtyId.message}</FormHelperText>}
        </FormControl>

        {/* Selector de Médico */}
        <FormControl fullWidth error={!!errors.doctorId} disabled={!selectedSpecialtyId}>
          <InputLabel id="doctor-label">Médico</InputLabel>
          <Controller
            name="doctorId"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="doctor-label" label="Médico">
                <MenuItem value={0} disabled>
                  <em>{selectedSpecialtyId ? 'Seleccione un médico' : 'Primero elija una especialidad'}</em>
                </MenuItem>
                {filteredDoctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {`${doctor.profile.name} ${doctor.profile.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.doctorId && <FormHelperText>{errors.doctorId.message}</FormHelperText>}
        </FormControl>

        {/* Selector de Fecha y Hora */}
        <Controller
            name="appointmentTime"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label="Fecha y Hora de Atención"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.appointmentTime}
                    helperText={errors.appointmentTime?.message}
                />
            )}
        />

        {errors.root && (
          <Alert severity="error" className="mt-2">
            {errors.root.message}
          </Alert>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/admin/appointments"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              isSubmitting ||
              createSchedule.isPending ||
              createAppointment.isPending
            }
          >
            Crear Cita
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentsEdit