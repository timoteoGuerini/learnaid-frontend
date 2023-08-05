'use client'
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';


export default function Register() {
    const router = useRouter()

    return (
        <Box sx={{
            backgroundImage: 'url("/learn-aid-login-background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 30,
            mr: 30,
            display: 'flex',
            boxShadow: 20,
            ":hover": {
                boxShadow: 10,
            }
        }}>
            <Box sx={{ display: 'flex', backgroundColor: 'white', width: '733px', height: '100vh', justifyContent: 'center', overflow:'auto'}}>
                <Stack spacing={3} width='90%'  display='flex'>
                    
                    <Image src='/learn-aid-web-logo.png' width={300} height={300}/>
                    <Typography variant="h4" color='black' fontWeight={700} fontSize='50px'>Registrarse</Typography>
                    <Stack direction='row' spacing={5} sx={{ width: '100%' }}>
                        <TextField label="Nombre" variant="outlined" sx={{ width: '50%' }} value={undefined} onChange={undefined} />
                        <TextField label="Apellido" variant="outlined" type="text" sx={{ width: '50%' }} value={undefined} onChange={undefined} />
                    </Stack>
                    <TextField label="Email" variant="outlined" type="text" value={undefined} onChange={undefined} />
                    <TextField label="Contraseña" variant="outlined" type="text" value={undefined} onChange={undefined} />
                    <TextField label="Repita Contraseña" variant="outlined" type="text" value={undefined} onChange={undefined} />
                    {/* Selector de imagen de perfil */}
                    <Typography variant="h1" color='black' fontWeight={700} fontSize='30px'>Seleccionar imagen de perfil</Typography>
                    <label htmlFor="profile-image" style={{ cursor: 'pointer' }} sx={{ width: '300px' }}>
                        <input
                            type="file"
                            id="profile-image"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={undefined} // handleImageChange
                        />
                        <IconButton component="span" sx={{ width: '100%' }}>
                            <AccountCircleIcon sx={{ width: '200px', height: '200px' }} />
                        </IconButton>
                    </label>
                    {/* Fin del selector de imagen de perfil */}
                    <Button className='loginButton' variant='outlined' color='secondary' onClick={() => {router.replace('/')}}>
                        <Typography fontWeight={700} color='black'>Crear cuenta</Typography>
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}
