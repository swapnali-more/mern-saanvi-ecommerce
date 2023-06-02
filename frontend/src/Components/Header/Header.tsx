import React, { useState } from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, useMediaQuery, Theme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../Utils/images/logo.png";
import useStyles from "./HeaderStyles"
import { Link } from 'react-router-dom';
import { MAIN_CATEGORY as pages, MAIN_SETTINGS as settings } from '../../config';

const Header = () => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between('md', 'lg'));
  const isLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between('lg', 'xl'));
  const isXlScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  let maxWidthSet: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'lg'; // Default value for maxWidth

  if (isSmScreen) {
    maxWidthSet = 'xl'; // Adjust maxWidth for extra small (xs) and small (sm) screens
  } else if (isMdScreen) {
    maxWidthSet = 'md'; // Adjust maxWidth for medium (md) screens
  } else if (isLgScreen) {
    maxWidthSet = 'lg'; // Adjust maxWidth for large (lg) screens
  } else if (isXlScreen) {
    maxWidthSet = 'xl'; // Adjust maxWidth for extra large (xl) screens
  }

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Container maxWidth={maxWidthSet}>
        <Toolbar disableGutters>
          <Typography
            component="a"
            href="/"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <img src={logo} alt="Saanvi" className={classes.logo} />
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
              {pages.map(({ name, link }) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Link to={link} className={classes.menuLink}>{name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            component="a"
            noWrap
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}>

            <img src={logo} alt="Saanvi" className={classes.logo} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ name, link }) => (
              <Link
                key={name}
                to={link}
                onClick={handleCloseNavMenu}
                className={classes.menuLink}
              >
                {name}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map(({ name, link }) => (
                <MenuItem key={name} onClick={handleCloseUserMenu}>
                  {name === 'Logout' ?
                    <Button>{name}</Button>
                    :
                    <Link to={link} className={classes.menuLink}>{name}</Link>
                  }
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header