import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MENU_ID } from '../../constants/routes';

const MenuComponent = ({ anchorEl, isMenuOpen, handleClose, t }) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={MENU_ID}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}>{t("profile")}</MenuItem>
    <MenuItem onClick={handleClose}>{t('my_account')}</MenuItem>
  </Menu>
);

export default MenuComponent;
