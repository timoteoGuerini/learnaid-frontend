'use client'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';


const MenuBar = ({ currentPage, setCurrentPage }) => {
    const router = useRouter()
    return (
        <Box
            className="menu-bar" // Agregamos una clase personalizada para el componente MenuBar
            sx={{
                width: '100%',
                backgroundColor: '#EBE8E8',
                height: '100%',
            }}
        >
            <nav aria-label="main mailbox folders">
                <List sx={{ pt: '20%', pb: '50px' }}>
                    {/* Usamos una clase personalizada para el botón "Nuevo ejercicio" */}
                    <ListItem disablePadding sx={{ color: 'white' }} className={currentPage === 'new-exercise' ? 'selected-button' : ''}>
                        <ListItemButton
                            sx={{
                                backgroundColor: currentPage === 'new-exercise' ? '#F2CC59' : 'transparent',
                                overflow: 'hidden',
                                transition: 'transform 0.3s, box-shadow 0.3s, width 0.3s',
                                '&:hover': {
                                    transform: 'translate(-5px, -5px)',
                                    boxShadow: '15px 15px 30px rgba(0, 0, 0, 0.2)',
                                    width: '103%'
                                },
                            }}
                            onClick={() => {
                                setCurrentPage('new-exercise')
                                router.replace('/loged/new-exercise')
                            }}>
                            <ListItemIcon>
                                <CreateNewFolderIcon sx={{ color: 'grey' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'grey' }} primary="Nueva ejercitación" />
                        </ListItemButton>
                    </ListItem>
                    {/* Usamos una clase personalizada para el botón "Mis ejercicios" */}
                    <ListItem disablePadding sx={{ color: 'white' }} className={currentPage === 'my-exercises' ? 'selected-button' : ''}>
                        <ListItemButton
                            sx={{
                                backgroundColor: currentPage === 'my-exercises' ? '#F2CC59' : 'transparent',
                                overflow: 'hidden',
                                transition: 'transform 0.3s, box-shadow 0.3s, width 0.3s',
                                '&:hover': {
                                    transform: 'translate(-5px, -5px)',
                                    boxShadow: '15px 15px 30px rgba(0, 0, 0, 0.2)',
                                    width: '103%'
                                },
                            }}
                            onClick={() => {
                                setCurrentPage('my-exercises')
                                router.push('/loged/my-exercises')
                            }}
                        >
                            <ListItemIcon>
                                <FolderCopyIcon sx={{ color: 'grey', display: { xs: 'none', md: 'flex' } }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'grey' }} primary="Mis ejercitaciones" />
                        </ListItemButton>
                    </ListItem>

                    {/*<ListItem disablePadding sx={{ color: 'white' }} className={currentPage === 'estrategias' ? 'selected-button' : ''}>
                        <ListItemButton
                            sx={{
                                backgroundColor: currentPage === 'estrategias' ? '#F2CC59' : 'transparent',
                                overflow: 'hidden',
                                transition: 'transform 0.3s, box-shadow 0.3s, width 0.3s',
                                '&:hover': {
                                    transform: 'translate(-5px, -5px)',
                                    boxShadow: '15px 15px 30px rgba(0, 0, 0, 0.2)',
                                    width: '103%'
                                },
                            }}
                            onClick={() => {
                                setCurrentPage('new-exercise')
                                router.replace('/loged/new-exercise')
                            }}>
                            <ListItemIcon>
                                <CreateNewFolderIcon sx={{ color: 'grey' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'grey' }} primary="Examenes accesibles" />
                        </ListItemButton>
                    </ListItem>*/}
                </List>
            </nav>
            {/* Componente "footer" */}
        </Box>
    );
};

export default MenuBar;