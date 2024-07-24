import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    Box,
    FormControlLabel,
    TextField,
    Autocomplete,
    Button,
    Modal,
    Typography,
} from '@mui/material';

import { styled } from '@mui/system';

import { useEffect, useState } from 'react';
import MaterialAPI from '~/api/MaterialAPI';

function GoldPrice() {
    const [materials, setMaterials] = useState([]);

    const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
        ({ theme }) => ({
            width: 42,
            height: 26,
            padding: 0,
            '& .MuiSwitch-switchBase': {
                padding: 0,
                margin: 2,
                transitionDuration: '300ms',
                '&.Mui-checked': {
                    transform: 'translateX(16px)',
                    color: '#fff',
                    '& + .MuiSwitch-track': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                        opacity: 1,
                        border: 0,
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        opacity: 0.5,
                    },
                },
                '&.Mui-focusVisible .MuiSwitch-thumb': {
                    color: '#33cf4d',
                    border: '6px solid #fff',
                },
                '&.Mui-disabled .MuiSwitch-thumb': {
                    color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
                },
            },
            '& .MuiSwitch-thumb': {
                boxSizing: 'border-box',
                width: 22,
                height: 22,
            },
            '& .MuiSwitch-track': {
                borderRadius: 26 / 2,
                backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
                opacity: 1,
                transition: theme.transitions.create(['background-color'], {
                    duration: 500,
                }),
            },
        }),
    );

    useEffect(() => {
        const getAll = async () => {
            try {
                const getAllMaterialWithStatusActive = await MaterialAPI.getAllWithStatusActiveWithoutPaging();
                setMaterials(getAllMaterialWithStatusActive);
            } catch (error) {
                console.log(error);
            }
        };

        getAll();
    }, []);

    useEffect(() => {
        console.log(materials);
    }, [materials]);

    const golds = [
        {
            id: 1,
            name: 'BTMC',
            bidPrice: 7315,
            askPrice: 7365,
        },
        {
            id: 2,
            name: 'HTBT',
            bidPrice: 7315,
            askPrice: 7365,
        },
        {
            id: 3,
            name: 'SJC',
            bidPrice: 7315,
            askPrice: 7365,
        },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <caption
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        Unit : VND
                    </caption>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                ID
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Brand
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Bid Price
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Ask Price
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Update Date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((material, index) => (
                            <TableRow
                                key={material.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {material.name}
                                </TableCell>
                                <TableCell align="left" sx={{ maxWidth: '300px' }}>
                                    {material.buyingPrice.toLocaleString()}
                                </TableCell>
                                <TableCell align="left">{material.salePrice.toLocaleString()}</TableCell>
                                <TableCell align="left">{material.updateDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default GoldPrice;
