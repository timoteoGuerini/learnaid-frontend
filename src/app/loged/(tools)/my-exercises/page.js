'use client'
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';

const data = [
    { numero: 1, titulo: 'Ejercicio Ingles', fecha: '2023-05-18' },
    { numero: 2, titulo: 'Ejercicio Matematica', fecha: '2023-05-19' },
    { numero: 3, titulo: 'Ejercicio Matematica', fecha: '2023-05-20' },
    { numero: 4, titulo: 'Literatura', fecha: '2023-05-21' },
    { numero: 5, titulo: 'Test', fecha: '2023-05-22' },
];


export default function MyExercises() {
    const router = useRouter()
    return (
        <>
            <TableContainer component={Paper} className="custom-table-container">
                <Table className="custom-table">
                    <TableHead>
                        <TableRow className="custom-table-header">
                            <TableCell sx={{fontSize:20}}><b style={{color:'grey'}}>Numero de ejercicio</b></TableCell>
                            <TableCell sx={{fontSize:20}}><b style={{color:'grey'}}>Tipo de ejercicio</b></TableCell>
                            <TableCell sx={{fontSize:20}}><b style={{color:'grey'}}>Fecha de creación</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.numero} className="custom-table-row" onClick={()=>router.push(`/loged/my-exercises/${row.numero}`)}>
                                <TableCell>{row.numero}</TableCell>
                                <TableCell>{row.titulo}</TableCell>
                                <TableCell>{row.fecha}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
