'use client'
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ky from 'ky';
import React, { useContext, useState } from 'react';
import { UserContext } from './context';

const initialFormValues = {
  email: '',
  password: '',
};


export default function Login() {
  const context = useContext(UserContext)
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormValues);
  const [error, setError] = useState('');
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError('Ingrese su email y contraseña.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Email inválido.');
      return;
    }

    try {
      console.log('login data: ', formData)
      const response = await ky.post(`https://localhost:7261/api/v1/Usuarios/iniciar-sesion`, {
        json: { email, contraseña: password },
      })
      const responseBody = await response.json()
      console.log('response: ', responseBody.id)

      context.setUser({
        Id: responseBody.id,
        Nombre: responseBody.nombre,
        Apellido: responseBody.apellido,
        Email: responseBody.email,
        Contraseña: responseBody.contraseña,
        Ejercicios: responseBody.ejercicios,
        Profesion: responseBody.profesion
      });
      router.push('/loged/new-exercise');
    } catch (error) {
      console.log(error);
      setError('Credenciales inválidas');
    }
  };

  const isValidEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  return (
      <Box sx={{
        backgroundImage: 'url("/learn-aid-login-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'white',
        ml: 30,
        mr: 30,
        boxShadow: 20,
        ":hover": {
          boxShadow: 10,
        }
      }}>
        <Stack direction="row-reverse" spacing={0}>
          <Box sx={{ display: 'flex', height: '100vh', width: '445px', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Stack spacing={2} width='90%'>
              <Image src='/learn-aid-web-logo.png' width={300} height={300} alt='learn-aid-web-logo' />
              <Typography variant="h4" color='black' lineHeight='normal' fontWeight={700} fontSize='50px'>Bienvenido</Typography>
              <Typography variant="h5" color='black'>Inicie sesión</Typography>
              <TextField label="Usuario" variant="filled" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
              <TextField label="Contraseña" variant="filled" type="password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} />
              {error && <Typography color="error">{error}</Typography>}
              <Stack direction='row' spacing={2}>
                <Button className='loginButton' variant='outlined' color='secondary' sx={{ width: 200 }} onClick={handleLogin}>
                  <Typography fontWeight={700} color='grey'>Login</Typography>
                </Button>
                <Button variant='outlined' color='success' sx={{ width: 200 }} onClick={() => router.push('/register')}>
                  <Typography fontWeight={700} color='grey'>Registrarse</Typography>
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
  )
}
