import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, TextField, Typography, Alert, CircularProgress, Container, Paper } from '@mui/material';
import { useLoginMutation } from '../../hook/auth/useLogin';

const LoginCard = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginMutation.mutateAsync({ email, password });

    navigate('/admin')
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" mb={2} align="center">
          Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loginMutation.isPending}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loginMutation.isPending ? <CircularProgress size={24} /> : 'Entrar'}
          </Button>
          {loginMutation.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {loginMutation.error instanceof Error
                ? loginMutation.error.message
                : 'Error al iniciar sesión'}
            </Alert>
          )}
          {loginMutation.isSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              ¡Sesión iniciada correctamente!
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginCard;