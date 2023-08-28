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
import { Person2Rounded } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { ReactComponent as Logo } from '../webank-logo.svg';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router';
import AuthenticationService from '../service/AuthenticationService';
import AdminService from '../service/AdminService';

// const pages = ['Login', 'Register', 'Open Account', 'Check Account Status'];
// const settings = ['Dashboard', 'Logout'];

function NavBar() {

    const history = useNavigate();

    const isAdminLoggedIn = AdminService.isAdminLoggedIn();
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    const handleLogout = () => {
        AuthenticationService.logout();
    }

    const handleAdminLogout = () => {
        AdminService.logoutAdmin();
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SvgIcon>
                        <Logo />
                    </SvgIcon>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        WeBank
                    </Typography>

                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                         >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                    {/* <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href="/">
                            WeBank
                        </Link>

                    </Typography> */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        { isAdminLoggedIn ? (<>
                        
                            <Button
                            href="/logout"
                            key="Logout"
                            onClick={handleAdminLogout}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Logout
                            </Button>

                            <Button
                            href="/accounts"
                            key="Account"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Accounts
                            </Button>

                        </>):(<>
                        
                            { isUserLoggedIn ? (<>

                        <Button
                            href="/transaction"
                            key="Transaction"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Fund Transafer
                        </Button>
                        <Button
                            href="/payee"
                            key="Payee"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Add Payee
                        </Button>
                        <Button
                            href="/logout"
                            key="Logout"
                            onClick={handleLogout}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Logout
                        </Button>

                        </>) : (<>
                            <Button
                            href="/login"
                            key="Login"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Login
                        </Button>
                        <Button
                            href="/register"
                            key="Register"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Register
                        </Button>
                        <Button
                            href="/openaccount"
                            key="OpenAccount"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Open Account
                        </Button>

                        <Button
                            href="/admin"
                            key="Admin"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Admin
                        </Button>

                        </>) }

                        </>) }

                    </Box>

                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar><Person2Rounded /></Avatar>
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
                            
                            <MenuItem
                                href="/logout"
                                key="Logout" 
                                onClick={handleCloseUserMenu}
                                >
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                            <MenuItem
                                href="/logout"
                                key="Dashboard" 
                                onClick={handleCloseUserMenu}
                                >
                                <Typography textAlign="center">Dashboard</Typography>
                            </MenuItem>
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default NavBar;