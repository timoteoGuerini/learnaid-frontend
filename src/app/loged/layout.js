'use client'
import './../globals.css'
import { Inter } from 'next/font/google'
import { Box, Grid, Stack, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppbar';
import MenuBar from '../components/MenuBar';
import { UserContext } from '@/app/context';

export default function LogedLayout({ children }) {
    const [currentPage, setCurrentPage] = useState('new-exercise'); // Estado para almacenar la página actual
    const context = useContext(UserContext);
    return (
        <Box sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'white',
            ml: 30,
            mr: 30,
            boxShadow: 20,
            ":hover": {
                boxShadow: 10,
            },
            display: 'flex',
            justifyContent: 'center'
        }}>

            <Box sx={{ width: '100%', height: '100vh', justifyContent: 'center', display: 'inline', overflow: 'clip' }}>
                <Grid container>
                    <Grid item xs={12} height='100%'>
                        <ResponsiveAppBar userName={context.user.Nombre.toUpperCase() + ' ' + context.user.Apellido.toUpperCase()} userAvatar={context.user.Foto}/>
                    </Grid>
                    <Grid item xs={2} height='100vh'>
                        <MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
                            {children}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

