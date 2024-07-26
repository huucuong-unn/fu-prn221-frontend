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
import RequestAPI from '~/api/RequestAPI';

function AdRequest() {
    const [requests, setRequests] = useState([]);
    const [isChangeStatus, setIsChangeStatus] = useState(false);

    useEffect(() => {
        const getAll = async () => {
            try {
                const getAllRequest = await RequestAPI.getRequests();
                setRequests(getAllRequest);
                setIsChangeStatus(false);
            } catch (error) {
                console.log(error);
            }
        };
        getAll();
    }, [isChangeStatus]);

    useEffect(() => {
        console.log(requests);
    }, [requests])

    const handleApprove = async (id, status) => {
        const approve = await RequestAPI.changeStatus({
            id: id,
            status: status
        })
        setIsChangeStatus(true);
    }

    const handleReject = async (id, status) => {
        const approve = await RequestAPI.changeStatus({
            id: id,
            status: status
        })
        setIsChangeStatus(true);
    }
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
                                CreatedDate
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
                        {requests.map((request, index) => (
                            <TableRow
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
                                    {request.customerName}
                                </TableCell>
                                <TableCell align="left">{request.counterName}</TableCell>
                                <TableCell align="left">{request.staffName}</TableCell>
                                <TableCell align="left">{request.createdDate}</TableCell>
                                <TableCell align="left"><Chip
                                    label={request.status}
                                    sx={{
                                        backgroundColor:
                                            request.status === 'PENDING'
                                                ? 'orange'
                                                : request.status === 'APPROVE'
                                                    ? 'green'
                                                    : request.status === 'REJECT'
                                                        ? 'red'
                                                        : 'orange',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                /></TableCell>
                                <TableCell align="left">
                                    {request.status === 'PENDING' ?
                                        <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", gap: 2 }}>
                                            <Button variant='contained' color='success' onClick={() => handleApprove(request.id, "APPROVE")}>Approve</Button>
                                            <Button variant='contained' color='error' onClick={() => handleReject(request.id, "REJECT")}>Reject</Button>
                                        </Box> : <>No Action</>
                                    }

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AdRequest;