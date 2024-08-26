import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MOBILE_MENU_ID, MAIL_BADGE_COUNT, NOTIFICATIONS_BADGE_COUNT, MENU_ID } from '../../constants/routes';

const MobileMenuComponent = ({ anchorEl, isMenuOpen, handleClose, handleProfileMenuOpen }) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={MOBILE_MENU_ID}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleClose}
  >
    <MenuItem>
      <IconButton size="large" aria-label="show new mails" color="inherit">
        <Badge badgeContent={MAIL_BADGE_COUNT} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <p>Messages</p>
    </MenuItem>
    <MenuItem>
      <IconButton size="large" aria-label="show new notifications" color="inherit">
        <Badge badgeContent={NOTIFICATIONS_BADGE_COUNT} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton size="large" aria-label="account of current user" aria-controls={MENU_ID} aria-haspopup="true" color="inherit">
        <AccountCircle />
      </IconButton>
      <p>Profile</p>
    </MenuItem>
  </Menu>
);

export default MobileMenuComponent;
