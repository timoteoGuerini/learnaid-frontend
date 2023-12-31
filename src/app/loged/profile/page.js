'use client'
import { Box, Grid, Stack, TextField, Button, Typography, IconButton, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {  useState } from 'react';

export default function Profile() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <>
            <Stack spacing={3} pt='5%' alignItems='center' width={'100%'} sx={{ position: 'relative' }}>
                <label htmlFor="profile-image" style={{ cursor: 'pointer' }} sx={{ width: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #000', margin: '0 auto' }}>
                        <img src={user.Foto} width={200} height={200} alt='Profile picture'/>
                    </div>
                </label>
                <Typography fontWeight={700} color='grey' sx={{ fontSize: '45px' }}>{user.Nombre.toUpperCase() + ' ' + user.Apellido.toUpperCase()}</Typography>
                <Divider sx={{ width: '100%' }} />
                <Stack spacing={0} width={'90%'} sx={{p:'1%' , '&:hover': { background: '#F2CC59', transform: 'translateY(-3px)', transition: 'transform 0.3s', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}}>
                    <Typography fontWeight={700} color='black' sx={{ fontSize: '35px' }}>Email:</Typography>
                    <Typography fontWeight={700} color='grey' sx={{ fontSize: '25px' }}>{user.Email}</Typography>
                </Stack>
                <Stack spacing={0} width={'90%'} sx={{ p:'1%' ,'&:hover': { background: '#F2CC59', transform: 'translateY(-3px)', transition: 'transform 0.3s', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' } }}>
                    <Typography fontWeight={700} color='black' sx={{ fontSize: '35px' }}>Contraseña:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '25px', width: '100%' }}>
                        {showPassword ? (
                            <Typography fontWeight={700} fontSize={'25px'} color='grey'>{user.Contraseña}</Typography>
                        ) : (
                            <Typography fontWeight={700} fontSize={'25px'} color='grey'>
                                {Array(user.Contraseña.length).fill('•').join('')}
                            </Typography>
                        )}
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Box>
                </Stack>
                <Stack spacing={0} width={'90%'} sx={{  p:'1%' , '&:hover': { background: '#F2CC59', transform: 'translateY(-3px)', transition: 'transform 0.3s', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' } }}>
                    <Typography fontWeight={700} color='black' sx={{ fontSize: '35px' }}>Profesion:</Typography>
                    <Typography fontWeight={700} color='grey' sx={{ fontSize: '25px' }}>{user.Profesion}</Typography>
                </Stack>
            </Stack>
        </>
    )
}
