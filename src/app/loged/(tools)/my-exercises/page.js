'use client'
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/context';
import ky from 'ky';
import getConfig from 'next/config';

export default function MyExercises() {
    const context = useContext(UserContext)
    const [ejercicios, setEjercicios] = useState([]);
    const userId = JSON.parse(localStorage.getItem('userData')).Id
    console.log('userId MIS EJERCICIOS: ', userId)
    const router = useRouter()

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await ky.get(`https://localhost:7261/api/v1/Ejercicio/buscar-ejercicios/${userId}`)
            const responseBody = await response.json();
            console.log('RESPONSEBODY EJERCICIOS: ', responseBody);
            setEjercicios(responseBody)
        };fetchData()
    },[])

    const renderData = () => {
        const elements = []
        for (let count = 0; count < Object.keys(ejercicios).length; count++) {
            const element = ejercicios[count];
            elements.push(
                <TableRow key={element.id} className="custom-table-row" onClick={() => router.push(`/loged/my-exercises/${element.id}`)}>
                    <TableCell>{element.id}</TableCell>
                    <TableCell>{element.titulo}</TableCell>
                    <TableCell>{element.fecha}</TableCell>
                </TableRow>
            )
        }
        return elements;
    }


    return (
        <>
            <TableContainer component={Paper} className="custom-table-container">
                <Table className="custom-table">
                    <TableHead>
                        <TableRow className="custom-table-header">
                            <TableCell sx={{ fontSize: 20 }}><b style={{ color: 'grey' }}>Numero de ejercicio</b></TableCell>
                            <TableCell sx={{ fontSize: 20 }}><b style={{ color: 'grey' }}>Titulo del ejercicio</b></TableCell>
                            <TableCell sx={{ fontSize: 20 }}><b style={{ color: 'grey' }}>Fecha de creación</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderData()}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
