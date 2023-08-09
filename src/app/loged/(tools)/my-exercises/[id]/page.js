'use client'
import { UserContext } from '@/app/context';
import { Box, Grid, Stack, TextField, Button, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import ky from 'ky';
import GetAppIcon from '@mui/icons-material/GetApp';


export default function Exercise({ params }) {
    const router = useRouter()
    const context = useContext(UserContext)
    const ejercicio = context.user.Ejercicios.find(ex => ex.id == params.id)

    const handleDownloadPDF = async () => {
        try {
            const response = await ky.get(`https://localhost:7261/api/v1/Ejercicio/pdf/${context.user.Id}/${ejercicio.id}`, {
                responseType: 'blob', 
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${ejercicio.titulo}.pdf`;
            link.click();
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <>
        <Stack spacing={2} width={'100%'} sx={{
            padding: '2%',
            alignItems:'center',
            alignContent:'center'
        }}>
            <Typography width="100%" color='black' fontWeight={700} fontSize='50px' padding='2%'>
                {ejercicio.titulo}
            </Typography>
            <Divider width='100%'/>
            <Typography width="100%"  color='grey' fontWeight={700} fontSize='30px' padding='2%'>
                {ejercicio.consigna}
            </Typography>
            <Divider width='100%'/>
            {ejercicio.texto && (
                <Typography width="100%"  color='grey' fontWeight={700} fontSize='30px' padding='2%'>
                    {ejercicio.texto}
                </Typography>
            )}
            <Typography width="100%" color='grey' fontWeight={700} fontSize='25px' padding='2%'>
                {ejercicio.ejercicio}
            </Typography>
            
            <Button variant="outlined" color="secondary" onClick={handleDownloadPDF} style={{
                backgroundColor: '#F2CC59',
                borderRadius: '0',
                width:'50%',
                border:0,
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    backgroundColor: '#F2CC59',
                    transform: 'translateY(-3px)',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                },
            }}>
                <GetAppIcon style={{color: 'grey'}}/>
                <Typography width="100%"  color='grey' fontWeight={700} fontSize='15px' padding='2%'>
                    DESCARGAR PDF
                </Typography>
            </Button>
        </Stack>
        </>
    )
}
