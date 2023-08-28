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

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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

                        { isAdminLoggedIn ? (<>
                        
                        <MenuItem key="Logout" onClick={handleCloseNavMenu}>
                        <Button
                        href="/logout"
                        key="Logout"
                        onClick={handleAdminLogout}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Logout
                        </Button>
                        </MenuItem>

                        <MenuItem key="Accounts" onClick={handleCloseNavMenu}>
                        <Button
                        href="/accounts"
                        key="Account"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Accounts
                        </Button>
                        </MenuItem>

                    </>):(<>
                    
                        { isUserLoggedIn ? (<>

                    <MenuItem key="Profile" onClick={handleCloseNavMenu}>
                    <Button
                        href="/profile"
                        key="Profile"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Profile
                    </Button>
                    </MenuItem>
                    <MenuItem key="Payee" onClick={handleCloseNavMenu}>
                    <Button
                        href="/payee"
                        key="Payee"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Add Payee
                    </Button>
                    </MenuItem>
                    <MenuItem key="Transaction" onClick={handleCloseNavMenu}>
                    <Button
                        href="/transaction"
                        key="Transaction"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Fund Transfer
                    </Button>
                    </MenuItem>
                    <MenuItem key="Logout" onClick={handleCloseNavMenu}>
                    <Button
                        href="/logout"
                        key="Logout"
                        onClick={handleLogout}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Logout
                    </Button>
                    </MenuItem>

                    </>) : (<>

                        <MenuItem key="Login" onClick={handleCloseNavMenu}>
                        <Button
                        href="/login"
                        key="Login"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Login
                    </Button>
                    </MenuItem>
                    <MenuItem key="Register" onClick={handleCloseNavMenu}>
                    <Button
                        href="/register"
                        key="Register"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Register
                    </Button>
                    </MenuItem>
                    <MenuItem key="OpenAccount" onClick={handleCloseNavMenu}>
                    <Button
                        href="/openaccount"
                        key="OpenAccount"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Open Account
                    </Button>
                    </MenuItem>
                    <MenuItem key="Admin" onClick={handleCloseNavMenu}>
                    <Button
                        href="/admin"
                        key="Admin"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Admin
                    </Button>
                    </MenuItem>

                    </>) }

                    </>) }
                            
                        </Menu>
                    </Box>
                    <Typography
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

                    </Typography>
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
                            href="/profile"
                            key="Profile"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Profile
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
                            href="/transaction"
                            key="Transaction"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Fund Transfer
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
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default NavBar;