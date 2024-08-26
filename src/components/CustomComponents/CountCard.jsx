import React from 'react';
import { Card, CardContent, Grid, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));


const getRandomColor = () => {
    const colors = ['#ADD8E6', '#90EE90', '#FFB6C1', '#FFCC99'];
    return colors[Math.floor(Math.random() * colors.length)];
};


const StyledAvatar = styled(Avatar)(({ theme, color }) => ({
    backgroundColor: color || theme.palette.secondary.light,
    color: 'white',
    width: theme.spacing(7),
    height: theme.spacing(7),
}));




const StatCard = ({ icon, title, count, treding, t }) => {
    const randomColor = getRandomColor();

    return (
        <StyledCard>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Box display="flex" alignItems="center">
                            <Box ml={2}>
                                <Typography variant="body2" color="textSecondary">
                                    {title}
                                </Typography>
                                <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>
                                    {count}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
                                    {treding == "yes" ? <TrendingUpIcon fontSize="small" style={{ marginRight: '4px' }} /> :
                                        <TrendingDownIcon fontSize="small" style={{ marginRight: '4px' }} />}
                                    {treding == "yes" ? "+50.00" + ` ${t('upFromYesterday')}`  : "-20.00"  + ` ${t('downFromYesterday')}`}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <StyledAvatar color={randomColor} >{icon}</StyledAvatar>
                    </Grid>
                </Grid>
            </CardContent>
        </StyledCard>
    );
};

export default StatCard;
