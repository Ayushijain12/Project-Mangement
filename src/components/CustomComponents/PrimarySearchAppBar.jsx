import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import { Search, SearchIconWrapper, StyledInputBase } from './Search';
import MenuComponent from './MenuComponent';
import MobileMenuComponent from './MobileMenuComponent';
import LanguageComponent from './LanguageComponent';
import TemporaryDrawer from './TemporaryDrawer'; // Import your TemporaryDrawer component
import { MENU_ID, MOBILE_MENU_ID } from '../../constants/routes';
import { useTranslation } from 'react-i18next';

export default function PrimarySearchAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [language, setLanguage] = React.useState(null);
    const { t, i18n } = useTranslation('common'); // Namespace 'common'
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    // Function to toggle drawer open/close state
    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);


    const isMenuOpen = Boolean(anchorEl);
    const isLanguageOpen = Boolean(language);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleLanguage = (event) => {
        setLanguage(event.currentTarget);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setLanguage(null);
        handleMobileMenuClose();
    };


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const switchLanguage = (lng) => {
        console.log(lng);
        i18n.changeLanguage(lng);
        setLanguage(null);
    };


    let userData = props.userObject;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {t('hello')} {userData.name}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={t("search")}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            aria-haspopup="true"
                            onClick={handleLanguage}
                        >
                            <Badge color="error">
                                <LanguageIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={MENU_ID}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={MOBILE_MENU_ID}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <MobileMenuComponent
                anchorEl={mobileMoreAnchorEl}
                isMenuOpen={isMobileMenuOpen}
                handleClose={handleMobileMenuClose}
                handleProfileMenuOpen={handleProfileMenuOpen}
            />
            <MenuComponent
                anchorEl={anchorEl}
                isMenuOpen={isMenuOpen}
                handleClose={handleMenuClose}
                t={t}
            />
            <LanguageComponent
                anchorEl={language}
                isMenuOpen={isLanguageOpen}
                handleClose={handleMenuClose}
                onLanguageChange={switchLanguage}
            />
            <TemporaryDrawer
                open={drawerOpen}
                onClose={handleDrawerClose}
                t={t}
            />

        </Box>
    );
}
