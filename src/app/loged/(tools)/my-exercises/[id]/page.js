'use client'
import { UserContext } from '@/app/context';
import { Box, Grid, Stack, TextField, Button, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import ky from 'ky';
import GetAppIcon from '@mui/icons-material/GetApp';


export default function Exercise({ params }) {
    const router = useRouter()
    const userId = JSON.parse(localStorage.getItem('userData')).Id
    //!!!!!const ejercicio = context.user.Ejercicios.find(ex => ex.id == params.id)
    const [ejercicio, setEjercicio] = useState({})
    const [editedEjercicio, setEditedEjercicio] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log("entro")
        const fetchExercise = async () => {
            const response = await ky.get(`https://localhost:7261/api/v1/Ejercicio/buscar-ejercicio/${params.id}`)
            const responseBody = await response.json();
            console.log('RESPONSEBODY EJERCICIO: ', responseBody);
            setEjercicio(responseBody)
            setEditedEjercicio(responseBody);
        }; fetchExercise()
    }, [])

    console.log('EJERCICIO EN [id]: ', ejercicio)

    const handleEdit = (index) => {
        setIsEditing(true);
        const editedEjercicioCopy = { ...editedEjercicio };
        editedEjercicioCopy.ejercicios[index] = { ...editedEjercicio.ejercicios[index] };
        setEditedEjercicio(editedEjercicioCopy);
    };

    const handleSave = async () => {
        try {
            // Update the specific exercise using ky.post
            const response = await ky.post(`https://localhost:7261/api/v1/Ejercicio/editar-ejercicio/${userId}`, {
                json: editedEjercicio,
            });
            const responseBody = await response.json();
            setEjercicio(responseBody);
            setIsEditing(false);
        } catch (error) {
            console.error('Error editing exercise:', error);
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const response = await ky.get(`https://localhost:7261/api/v1/Ejercicio/pdf/${userId}/${ejercicio.id}`, {
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

    const handleDownloadOriginalPDF = async () => {
        try {
            const response = await ky.get(`https://localhost:7261/api/v1/Ejercicio/pdfOriginal/${userId}/${ejercicio.id}`, {
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
            <Stack spacing={2} width={'100%'} sx={{ padding: '2%', alignItems: 'center', alignContent: 'center' }}>
                <Typography width="100%" color='black' fontWeight={700} fontSize='50px' padding='2%'>
                    {ejercicio.titulo}
                </Typography>
                <Divider width='100%' />

                {ejercicio.ejercicios && ejercicio.ejercicios.map((ejercicioItem, index) => (
                    <Box
                        key={index}
                        sx={{
                            padding: '2%',
                            backgroundColor: isEditing ? 'white' : 'white',
                            borderRadius: '4px',
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                            width: '100%'
                        }}
                    >
                        {isEditing ? (
                            <>
                                <TextField
                                    label="Consigna"
                                    fullWidth
                                    margin="normal"
                                    value={editedEjercicio.ejercicios[index].consigna}
                                    multiline
                                    onChange={(e) => {
                                        const editedEjercicioCopy = { ...editedEjercicio };
                                        editedEjercicioCopy.ejercicios[index].consigna = e.target.value;
                                        setEditedEjercicio(editedEjercicioCopy);
                                    }}
                                />
                                <TextField
                                    label="Ejercicio"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    value={editedEjercicio.ejercicios[index].ejercicio}
                                    onChange={(e) => {
                                        const editedEjercicioCopy = { ...editedEjercicio };
                                        editedEjercicioCopy.ejercicios[index].ejercicio = e.target.value;
                                        setEditedEjercicio(editedEjercicioCopy);
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"

                                    onClick={() => handleSave(index)}
                                    style={{
                                        mt: 1,
                                        backgroundColor: '#F2CC59',
                                        borderRadius: '0',
                                        border: 0,
                                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                                        transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#F2CC59',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <Typography width="100%" color='grey' fontWeight={700} fontSize='15px' padding='2%'>
                                        Guardar
                                    </Typography>

                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography color='grey' fontWeight={700} fontSize='30px' padding='2%'>
                                    Consigna: {ejercicioItem.consigna}
                                </Typography>
                                <Typography color='grey' fontWeight={700} fontSize='30px' padding='2%'>
                                    Ejercicio: {ejercicioItem.ejercicio}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEdit(index)}
                                    style={{
                                        mt: 1,
                                        backgroundColor: '#F2CC59',
                                        borderRadius: 3,
                                        border: 0,
                                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                                        transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#F2CC59',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <Typography width="100%" color='grey' fontWeight={700} fontSize='15px' padding='2%'>
                                        Editar
                                    </Typography>

                                </Button>
                            </>
                        )}
                    </Box>
                ))}

                <Stack direction='row' spacing={5} sx={{ width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleDownloadPDF}
                        style={{
                            backgroundColor: '#F2CC59',
                            borderRadius: '0',
                            width: '50%',
                            border: 0,
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: '#F2CC59',
                                transform: 'translateY(-3px)',
                                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        <GetAppIcon style={{ color: 'grey' }} />
                        <Typography width="100%" color='grey' fontWeight={700} fontSize='15px' padding='2%'>
                            DESCARGAR PDF EJERCITACION <span style={{ color: 'green' }}>ADAPTADA</span>
                        </Typography>
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleDownloadOriginalPDF}
                        style={{
                            backgroundColor: '#F2CC59',
                            borderRadius: '0',
                            width: '50%',
                            border: 0,
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: '#F2CC59',
                                transform: 'translateY(-3px)',
                                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        <GetAppIcon style={{ color: 'grey' }} />
                        <Typography width="100%" color='grey' fontWeight={700} fontSize='15px' padding='2%'>
                            DESCARGAR PDF EJERCITACION<span style={{ color: 'blue' }}> ORIGINAL</span>
                        </Typography>
                    </Button>
                </Stack>


            </Stack>
        </>
    )
}
