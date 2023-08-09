import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Image from 'next/image';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useEffect } from 'react';

const settings = ['Perfil', 'Cerrar sesion'];

const ResponsiveAppBar = ({ userName, userAvatar }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const router = useRouter()
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ height: '8%', backgroundColor: 'white', justifyContent: 'center' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Image src='/learn-aid-appbar-logo.png' width={150} height={150} onClick={()=>router.replace('/loged/new-exercise')} aria-pressed alt='learn-aid-appbar-logo'/>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/*white space*/}
                    </Box>
                    <Typography fontWeight={700} color='black' sx={{ pr: 2 }}>{userName}</Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="avatar" src={userAvatar} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={()=>{
                                handleCloseUserMenu
                                router.replace('/loged/profile')
                            }}>
                                <Typography textAlign="center">Perfil</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>{
                                handleCloseUserMenu
                                router.replace('/')
                            }}>
                                <Typography textAlign="center">Cerrar Sesión</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Divider></Divider>
            <Divider></Divider>
        </AppBar>
    );
}
export default ResponsiveAppBar;