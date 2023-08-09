'use client'
import { Stack, TextField, Button, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ky from 'ky';
import { UserContext } from '@/app/context';
import { useRouter } from 'next/navigation';

export default function NewExercise() {
    const router = useRouter();
    const [exerciseData, setExerciseData] = useState({
        titulo: '',
        consigna: '',
        texto: '',  // No es obligatorio
        ejercicio: '',
        idioma: '',
        edadAlumnos: '',
    });

    const context = useContext(UserContext)

    const [errors, setErrors] = useState({
        titulo: '',
        consigna: '',
        ejercicio: '',
        idioma: '',
        edadAlumnos: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setExerciseData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAdaptarClick = async () => {
        // Realizar validaciones antes de enviar el formulario
        const newErrors = {};
        for (const field in exerciseData) {
            if (field !== 'Texto' && exerciseData[field].trim() === '') {
                newErrors[field] = 'Este campo es obligatorio';
            }
        }
        setErrors(newErrors);
        // Si no hay errores, enviar el formulario
        if (Object.keys(newErrors).length === 0) {
            const response = await ky.post(`https://localhost:7261/api/v1/Ejercicio/adaptar-ejercicio/${context.user.Id}`, { json: exerciseData })
            const responseBody = await response.json();
            console.log('EJERCICIO ADAPTADO RESPONSE: ', responseBody)
            router.forward('/loged/my-exercises')            
        }
    };

    return (
        <Stack spacing={3} width='90%' display='flex' pt='5%'>
            <Typography width="100%" variant="h4" color='black' fontWeight={700} fontSize='50px'><span style={{ color: 'grey' }}>Crear</span> nuevo ejercicio</Typography>
            <TextField label="Titulo" variant="outlined" name="titulo" value={exerciseData.titulo} onChange={handleInputChange} error={!!errors.titulo} helperText={errors.titulo} />
            <TextField label="Consigna" variant="outlined" name="consigna" value={exerciseData.consigna} onChange={handleInputChange} error={!!errors.consigna} helperText={errors.consigna} />
            <TextField label="Texto" variant="outlined" name="texto" value={exerciseData.texto} onChange={handleInputChange} multiline rows={4} />
            <TextField label="Ejercicio" variant="outlined" name="ejercicio" value={exerciseData.ejercicio} onChange={handleInputChange} error={!!errors.ejercicio} helperText={errors.ejercicio} multiline rows={4} />
            <Stack direction='row' spacing={5} sx={{ width: '100%' }}>
                <TextField label="Idioma" variant="outlined" name="idioma" type="text" sx={{ width: '50%' }} value={exerciseData.idioma} onChange={handleInputChange} error={!!errors.idioma} helperText={errors.idioma} />
                <TextField label="Edad de los alumnos" variant="outlined" name="edadAlumnos" type='number' sx={{ width: '50%' }} value={exerciseData.edadAlumnos} onChange={handleInputChange} error={!!errors.name} helperText={errors.name} />
            </Stack>
            <Button className='loginButton' variant='outlined' color='secondary' onClick={handleAdaptarClick}>
                <Typography fontWeight={700} color='grey'>Adaptar</Typography>
            </Button>
        </Stack>
    )
}
