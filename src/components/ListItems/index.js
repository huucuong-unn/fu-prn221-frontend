import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Logout } from '@mui/icons-material';
import { useEffect, useState } from 'react';

import AccountAPI from '~/api/AccountAPI';

export const MainListItems = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    const [account, setAccount] = useState();
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await AccountAPI.getLoggedUser();
                setAccount(response);
            } catch (error) {
                console.log('Failed to fetch account:', error);
            }
        };
        fetchAccount();
    }, []);

    return (
        <React.Fragment>


            {account?.role === 'ADMIN' ? (
                <>
                    <ListItemButton onClick={() => handleNavigate('/admin/dashboard')}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigate('/admin/promotions')}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Promotions" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigate('/admin/counter')}>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Counter" />
                    </ListItemButton>
                </>

            ) : (<></>)
            }
            <ListItemButton onClick={() => handleNavigate('/admin/orders')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/admin/product')}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Product" />
            </ListItemButton>
        </React.Fragment>
    );
};

export const SecondaryListItems = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    const handleLogout = async (path) => {
        try {
            await AccountAPI.logout();
            navigate(path);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader>
            <ListItemButton onClick={() => handleNavigate('/admin/gold-price')}>
                <ListItemIcon>
                    <PriceChangeIcon />
                </ListItemIcon>
                <ListItemText primary="Gold Price" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate('/admin/return-policy')}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Return Policy" />
            </ListItemButton>
            <ListItemButton onClick={() => handleLogout('/sign-in')}>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </React.Fragment>
    );
};
