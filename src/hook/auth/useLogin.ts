import { useMutation } from '@tanstack/react-query';

interface LoginData {
  email: string;
  password: string;
}

async function loginUser(data: LoginData) {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginUser
  });
}