'use client'
import './../../globals.css'
import { Box, Grid, Stack, TextField, Button, Typography } from '@mui/material';
import ResponsiveAppBar from '@/app/components/ResponsiveAppbar';
export default function ProfileLayout({ children }) {

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
                        <ResponsiveAppBar />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
                            {children}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

