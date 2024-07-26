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
    Pagination,
    PaginationItem,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useState, useEffect } from 'react';
import CounterAPI from '~/api/CounterAPI';
import MaterialAPI from '~/api/MaterialAPI';
import ProductAPI from '~/api/ProductAPI';
import ProductTypeAPI from '~/api/ProductTypeAPI';
import StoneAPI from '~/api/StoneAPI';

function AdRequest() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                ID
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Customer Name
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Counter Name
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Staff Name
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                1
                            </TableCell>
                            <TableCell component="th" scope="row">
                                Ronaldo
                            </TableCell>
                            <TableCell align="left">Messi</TableCell>
                            <TableCell align="left">Neymar</TableCell>
                            <TableCell align="left"><Chip label="AVAILABLE" sx={{ backgroundColor: "orange", color: "white", fontWeight: "bold" }}>AVAILABLE</Chip></TableCell>
                            <TableCell align="left">
                                <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", gap: 2 }}>
                                    <Button variant='contained' color='success'>Approve</Button>
                                    <Button variant='contained' color='error'>Reject</Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AdRequest;