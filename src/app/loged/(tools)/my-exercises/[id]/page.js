'use client'
import { Box, Grid, Stack, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';


export default function Exercise({ params }) {
    const router = useRouter()

    return (
        <>
            <Typography width="100%" variant="h4" color='black' fontWeight={700} fontSize='50px' padding='2%'>
                {params.id}
                <p></p>
                Officia fugiat dolore ex dolor irure ullamco velit consequat eiusmod consequat enim. Nulla magna exercitation reprehenderit non
                labore dolore nostrud proident. Aute ex fugiat esse anim veniam dolore laborum.
            </Typography>
            
        </>
    )
}
