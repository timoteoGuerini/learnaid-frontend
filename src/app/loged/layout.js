'use client'
import './../globals.css'
import { Inter } from 'next/font/google'
import { Box, Grid, Stack, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppbar';
import MenuBar from '../components/MenuBar';
import UserProvider, { UserContext } from '@/app/context';

export default function LogedLayout({ children }) {
    const [currentPage, setCurrentPage] = useState('new-exercise'); // Estado para almacenar la página actual
    localStorage.setItem('currentPage', currentPage)
    //guardar el usuario en localStorage para no perderlo al refrescar la pagina
    const userData = JSON.parse(localStorage.getItem('userData'))
    console.log('userData LogedLayout: ', userData)
    return (
            <Box sx={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#EBE8E8',
                ml: 30,
                mr: 30,
                boxShadow: 20,
                ":hover": {
                    boxShadow: 10,
                },
                display: 'flex',
                justifyContent: 'center'
            }}>

                <Box sx={{ width: '100%', height: '100%', justifyContent: 'center', display: 'inline' }}>
                    <Grid container>
                        <Grid item xs={12} height='100%'>
                            {userData.Nombre && userData.Apellido && <ResponsiveAppBar userName={userData.Nombre.toUpperCase() + ' ' + userData.Apellido.toUpperCase()} userAvatar={userData.Foto} />}
                        </Grid>
                        <Grid item xs={2} height='100vh'>
                            <MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </Grid>
                        <Grid item xs={10}>
                            <Box sx={{ width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', overflow: 'clip' }}>
                                {children}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
    )
}

