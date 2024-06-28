import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderAPI from '~/api/OrderAPI';

function OrderDetailPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await OrderAPI.getOrderById(orderId);
                setOrder(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (!order) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Button variant="contained" onClick={() => navigate(-1)}>
                Back to Orders
            </Button>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Order Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Box>
                    <Typography variant="h6">Order Code: {order.id}</Typography>
                    <Typography variant="h6">Customer Name: {order.customer.name}</Typography>
                    <Typography variant="h6">Customer Phone: {order.customer.phone}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">Transaction Time: {new Date(order.createdDate).toLocaleString()}</Typography>
                    <Typography variant="h6">Total Amount: {order.totalAmount.toLocaleString()}đ</Typography>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Type</TableCell>
                            <TableCell>Weight (g)</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit Price (đ)</TableCell>
                            <TableCell>Total Amount (đ)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.product.productType.name}</TableCell>
                                <TableCell>{item.product.weight}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unitPrice.toLocaleString()}</TableCell>
                                <TableCell>{item.totalAmount.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default OrderDetailPage;