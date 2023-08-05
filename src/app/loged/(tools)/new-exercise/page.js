'use client'

import { Stack, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';


export default function NewExercise() {
    return (
        <Stack spacing={3} width='90%' display='flex' pt='5%'>
            <Typography width="100%" variant="h4" color='black' fontWeight={700} fontSize='50px'><span style={{ color: 'grey' }}>Crear</span> nuevo ejercicio</Typography>
            <TextField label="Titulo" variant="outlined" type="text" value={undefined} onChange={undefined} />
            <TextField label="Consigna" variant="outlined" type="text" value={undefined} onChange={undefined} />
            <TextField label="Texto" variant="outlined" type="text" value={undefined} onChange={undefined} />
            <TextField label="Ejercicio" variant="outlined" type="text" value={undefined} onChange={undefined} multiline rows={4} />
            <Stack direction='row' spacing={5} sx={{ width: '100%' }}>
                <TextField label="Nombre" variant="outlined" sx={{ width: '50%' }} value={undefined} onChange={undefined} />
                <TextField label="Apellido" variant="outlined" type="text" sx={{ width: '50%' }} value={undefined} onChange={undefined} />
            </Stack>
            <Button className='loginButton' variant='outlined' color='secondary' onClick={() => { alert('Ejercicio Adaptado') }}>
                <Typography fontWeight={700} color='grey'>Adaptar</Typography>
            </Button>
        </Stack>
    )
}
