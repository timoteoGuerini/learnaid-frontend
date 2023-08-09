'use client'
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ky from 'ky';


export default function Register() {
    const router = useRouter()
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setFormValues({
            ...formValues,
            email: emailValue,
        });

        // Validar el email
        if (!isValidEmail(emailValue)) {
            setEmailError('Ingrese un email válido');
        } else {
            setEmailError('');
        }
    };

    const isValidEmail = (email) => {
        // Expresión regular para validar el email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };
    const [imagePreview, setImagePreview] = useState('/');
    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
        repitaContraseña: '',
        profesion: '',
        foto: null, // Foto seleccionada
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log('FOTO ELEGIDA: ', file.name)
        setFormValues({
            ...formValues,
            foto: file.name,
        });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('/default-avatar.png');
        }
    };

    const handleSubmit = async () => {
        // Realizar las validaciones antes de hacer el POST
        const newErrors = {};
        if (!formValues.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio.';
        }
        if (!formValues.apellido.trim()) {
            newErrors.apellido = 'El apellido es obligatorio.';
        }
        if (!formValues.email.trim()) {
            newErrors.email = 'El email es obligatorio.';
        }
        if (!formValues.contraseña.trim()) {
            newErrors.contraseña = 'La contraseña es obligatoria.';
        }
        if (formValues.contraseña !== formValues.repitaContraseña) {
            newErrors.repitaContraseña = 'Las contraseñas no coinciden.';
        }
        setErrors(newErrors);

        // Si hay errores, no se realiza el POST
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        // Crear el DTO con los datos del formulario
        const formData = new FormData();
        formData.append('Nombre', formValues.nombre);
        formData.append('Apellido', formValues.apellido);
        formData.append('Email', formValues.email);
        formData.append('Contraseña', formValues.contraseña);
        formData.append('Profesion', 'formValues.profesion');
        formData.append('Foto', '/'); // TODO?

        try {
            const response = await ky.post('https://localhost:7261/api/v1/Usuarios/crear-usuario', {
                body: formData,
            });
            const responseBody = await response.json();
            console.log('RESPUESTA REGISTER: ', responseBody)
            // Manejar la respuesta del POST
        } catch (error) {
            console.log('ERROR EN EL REGISTER:', error)
        }
    };

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
            },
        }}>
            <Box sx={{ display: 'flex', backgroundColor: 'white', width: '733px', height: '100vh', justifyContent: 'center', overflow: 'auto' }}>
                <Stack spacing={3} width='90%' display='flex'>
                    <Image src='/learn-aid-web-logo.png' width={300} height={300} quality={100} style={{ paddingTop: '5%' }} />
                    <Typography variant="h4" color='black' fontWeight={700} fontSize='50px'>Registrarse</Typography>
                    <Stack direction='row' spacing={5} sx={{ width: '100%' }}>
                        <TextField label="Nombre" variant="outlined" sx={{ width: '50%' }} name="nombre" value={formValues.nombre} onChange={handleInputChange} error={!!errors.nombre} helperText={errors.nombre} />
                        <TextField label="Apellido" variant="outlined" type="text" sx={{ width: '50%' }} name="apellido" value={formValues.apellido} onChange={handleInputChange} error={!!errors.apellido} helperText={errors.apellido} />
                    </Stack>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="text"
                        value={formValues.email}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField label="Contraseña" variant="outlined" type="password" name="contraseña" value={formValues.contraseña} onChange={handleInputChange} error={!!errors.contraseña} helperText={errors.contraseña} />
                    <TextField label="Repita Contraseña" variant="outlined" type="password" name="repitaContraseña" value={formValues.repitaContraseña} onChange={handleInputChange} error={!!errors.repitaContraseña} helperText={errors.repitaContraseña} />
                    <TextField
                        label="Profesion"
                        multiline
                        rows={3} // Número de filas para el área de texto
                        variant="outlined"
                        value={undefined}
                        onChange={undefined}
                    />
                    {/*Selector de imagen de perfil*/}
                    <Typography variant="h1" color='black' fontWeight={700} fontSize='30px'>Seleccionar imagen de perfil</Typography>
                    <label htmlFor="profile-image" style={{ cursor: 'pointer' }} sx={{ width: '300px' }}>
                        <input
                            type="file"
                            id="profile-image"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #000', margin: '0 auto' }}>
                            <Image src={imagePreview} alt="Profile Image" width={200} height={200} />
                        </div>
                    </label>
                    <Button className='loginButton' variant='outlined' color='secondary' onClick={handleSubmit}>
                        <Typography fontWeight={700} color='black'>Crear cuenta</Typography>
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}
