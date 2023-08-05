'use client'

import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ky from 'ky';
import Config from 'react-native-config';
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter()
  const []

  useEffect(
    () => {
      const login = async () => {
        const response = await ky.post(
          `${Config.API_BASE_URL}`, {
            json: {
              Email:'',
              Contraseña:''
            }
          }
        )
        const responseObject = response.json();
      }
    }
    , [])

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
            <Image src='/learn-aid-web-logo.png' width={300} height={300} />
            <Typography variant="h4" color='black' lineHeight='normal' fontWeight={700} fontSize='50px'>Bienvenido</Typography>
            <Typography variant="h5" color='black'>Inicie sesión</Typography>
            <TextField label="Usuario" variant="filled" onChange={}/>
            <TextField label="Contraseña" variant="filled" type="password" />
            <Stack direction='row' spacing={2}>
              <Button className='loginButton' variant='outlined' color='secondary' sx={{ width: 200 }} onClick={() => router.push('/loged/new-exercise')}>
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
