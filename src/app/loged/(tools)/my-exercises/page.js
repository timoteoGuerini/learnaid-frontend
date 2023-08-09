'use client'
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/context';

const data = [
    { numero: 1, titulo: 'Ejercicio Ingles', fecha: '2023-05-18' },
    { numero: 2, titulo: 'Ejercicio Matematica', fecha: '2023-05-19' },
    { numero: 3, titulo: 'Ejercicio Matematica', fecha: '2023-05-20' },
    { numero: 4, titulo: 'Literatura', fecha: '2023-05-21' },
    { numero: 5, titulo: 'Test', fecha: '2023-05-22' },
];


export default function MyExercises() {
    const context = useContext(UserContext)
    const [ejercicios, setEjercicios] = useState([]);
    const router = useRouter()

    useEffect(()=>{
        const fetchData = ()=>{
            router.refresh()
            setEjercicios(
                context.user.Ejercicios
            )
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
                            <TableCell sx={{ fontSize: 20 }}><b style={{ color: 'grey' }}>Tipo de ejercicio</b></TableCell>
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
