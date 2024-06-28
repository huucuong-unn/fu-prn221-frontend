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
    Avatar,
    Chip,
    CircularProgress,
} from '@mui/material';

import { styled } from '@mui/system';

import { useState, useEffect } from 'react';
import OrderAPI from '~/api/OrderAPI';
import ProductAPI from '~/api/ProductAPI';
import ProductTypeAPI from '~/api/ProductTypeAPI';

function AdProduct() {
    const [productTypes, setProductTypes] = useState([]);

    useEffect(() => {
        const getAll = async () => {
            try {
                const getAllWithStatusActive = await OrderAPI.getAll({ page: 1, size: 10 });
                setProductTypes(getAllWithStatusActive);
            } catch (error) {
                console.log(error);
            }
        };

        getAll();
    }, []);

    useEffect(() => {
        console.log(productTypes);
    }, [productTypes]);

    const productss = [
        {
            id: 1,
            name: 'Apple Watch',
            code: 'SE172594',
            type: 'Watch',
            material: 'SJC',
            weight: '59 gam',
            price: '10000000',
            counter: 'Counter A',
        },
        {
            id: 2,
            name: 'Apple Watch',
            code: 'SE172594',
            type: 'Watch',
            material: 'SJC',
            weight: '59 gam',
            price: '10000000',
            counter: 'Counter A',
        },
        {
            id: 3,
            name: 'Apple Watch',
            code: 'SE172594',
            type: 'Watch',
            material: 'SJC',
            weight: '59 gam',
            price: '10000000',
            counter: 'Counter A',
        },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, paddingRight: 2 }}>
                <TextField id="outlined-basic" label="Product code..." variant="outlined" size="small" />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: 120 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Type" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: 120 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Material" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: 120 }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Counter" />}
                />
                <Button variant="contained" size="medium">
                    Search
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                ID
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Name
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Code
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Type
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Material
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Weight
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Price
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Counter
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productss.map((product, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="left">{product.code}</TableCell>
                                <TableCell align="left">{product.type}</TableCell>
                                <TableCell align="left">{product.material}</TableCell>
                                <TableCell align="left">{product.weight}</TableCell>
                                <TableCell align="left">{product.price}</TableCell>
                                <TableCell align="left">{product.counter}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AdProduct;
