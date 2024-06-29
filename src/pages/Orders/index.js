import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TextField,
    Button,
    Typography,
    Modal,
    Select,
    MenuItem,
    InputLabel,
    Pagination,
    PaginationItem,
} from '@mui/material';

import { useEffect, useState } from 'react';
import AccountAPI from '~/api/AccountAPI';
import OrderAPI from '~/api/OrderAPI';
import { useNavigate } from 'react-router-dom';
import ProductAPI from '~/api/ProductAPI';
import CustomizedHook from '~/components/CustomizedHook';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function AdOrder() {
    const navigate = useNavigate();

    const [productIds, setProductIds] = useState([]);
    const [customerName, setCustomerName] = useState();
    const [customerPhone, setCustomerPhone] = useState();
    const [orderType, setOrderType] = useState('CustomerBuy');
    const [user, setUser] = useState();
    const [searchProducts, setSearchProducts] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [count, setCount] = useState(0);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });
    const [orderCode, setOrderCode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const params = {
                page: pagination.page,
                size: pagination.limit,
                orderCode,
                startDate,
                endDate,
            };
            const getAllWithStatusActive = await OrderAPI.searchOrders(params);
            setOrderList(getAllWithStatusActive.listResult);
            setTotalPage(getAllWithStatusActive.totalPages);
            setCount(getAllWithStatusActive.totalCount);
            console.log(getAllWithStatusActive);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [pagination.page]);

        const fetchProduct = async () => {
            try {
                const response = await ProductAPI.getProductForMakeOrder();
                console.log('Product!!!!: ' + response);
                setSearchProducts(response);
            } catch (error) {
                console.log(error);
            }
        };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await AccountAPI.getLoggedUser();
                console.log(response);
                setUser(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    const handleAddInput = () => {
        setProductIds([...productIds, '']);
    };

    const handleRemoveInput = (indexToRemove) => {
        setProductIds(productIds.filter((_, index) => index !== indexToRemove));
    };

    const handleChange = (e, index) => {
        const newProductIds = [...productIds];
        newProductIds[index] = e.target.value;
        setProductIds(newProductIds);
    };

    const handlePageChange = (event, value) => {
        setPagination((prev) => ({
            ...prev,
            page: value,
        }));
    };

    const handleSearch = () => {
        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
        fetchOrders();
    };

    useEffect(() => {
        console.log('Product IDs:', productIds);
    }, [productIds]);

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
        setProductIds([]);
setSearchProducts([]);
        fetchProduct();
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        setOrderList([]);
        setProductIds([]);
        fetchOrders();
    };

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleSubmit = async () => {
        console.log('Customer Name:', customerName);
        console.log('Customer Phone:', customerPhone);
        console.log('Product IDs:', productIds);
        console.log('Order Type:', orderType);

        try {
            var productCodes = productIds.map((product) => product.productCode);
            const order = await OrderAPI.createOrder({
                customerName: customerName,
                customerPhone: customerPhone,
                listProductCode: productCodes,
                orderType: orderType,
                createBy: user.id,
                updateBy: user.id,
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
                totalAmount: 0,
            });
            window.alert('Create order successfully');
            productCodes = [];
            console.log(order);
        } catch (error) {
            console.log(error);
        }

        handleCloseCreateModal();
    };

    function handleSelectedValue(value) {
        setProductIds(value);
    }

    function handleRemoveSelectedValue(value) {
        setProductIds(productIds.filter((item) => item.productCode !== value));
    }

    function printInvoice(order, discount) {
        const newWindow = window.open('', '_blank');

        let html = `
        <style>
            .invoice {
                font-family: Arial, sans-serif;
                max-width: 400px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .invoice h1 {
                text-align: center;
            }
            .invoice p {
                margin: 5px 0;
            }
        </style>
        <div class="invoice">
            <h1>Jewellry</h1>
            <p>Tên khách hàng: ${order?.customer?.name}</p>
            <p>Số điện thoại: ${order?.customer?.phone}</p>
            <p>Thời gian giao dịch: ${new Date(order?.createdDate).toLocaleString()}</p>
            <p>${order.id}</p>
            <h2>Danh sách sản phẩm:</h2>
        `;

        let total = 0;
        order?.orderItems?.forEach((item, index) => {
            html += `
                <p>${index + 1}. ${item.product?.name} (${item.product?.productType?.name} - ${item.product?.weight}g) - Số lượng: ${item.quantity} - Giá: ${item.unitPrice.toLocaleString()} VND - Bảo hành: 3 tháng</p>
            `;
            total += item.quantity * item.unitPrice;
        });

        let finalPrice = total - discount;
        html += `
            <p>Giảm giá: ${discount.toLocaleString()} VND</p>
            <h2>Tổng cộng: ${finalPrice.toLocaleString()} VND</h2>
        </div>
        `;

        newWindow.document.write(html);
        newWindow.document.close();

        newWindow.print();
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Button variant="contained" size="medium" onClick={handleOpenCreateModal}>
                Create
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, paddingRight: 2 }}>
                <TextField
                    id="orderCode"
                    label="Order code..."
                    variant="outlined"
                    size="small"
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value)}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'center',
                        gap: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        padding: 2,
                        mt: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography>Start date</Typography>
                        <TextField
                            id="startDate"
                            variant="outlined"
                            size="small"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Box>
                    <Typography>to</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography>End date</Typography>
                        <TextField
                            id="endDate"
                            variant="outlined"
                            size="small"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Box>
                </Box>
                <Button variant="contained" size="medium" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Order Code
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Customer Name
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Phone
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Order Type
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Total
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Transaction Time
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Print out Invoice
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (<p>Loading...</p>) :
                        orderList.length > 0 &&
                            orderList.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {order.customer.name}
                                    </TableCell>
                                    <TableCell align="left">{order.customer.phone}</TableCell>
                                    <TableCell align="left">{order.orderType}</TableCell>
                                    <TableCell align="left">{order.totalAmount.toLocaleString()}đ</TableCell>
                                    <TableCell align="left">{new Date(order.createdDate).toLocaleString()}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={(e) => { e.stopPropagation(); printInvoice(order, 0); }}>Print</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPage}
                    page={pagination.page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                    )}
                />
            </Box>
            <Modal open={isCreateModalOpen} onClose={handleCloseCreateModal}>
                <Box
                    sx={{
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'fit-content',
                        bgcolor: '#f5f5f5',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                    component="form"
                >
                    <Box pb={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <TextField
                                id="customerName"
                                variant="outlined"
                                label="Customer Name"
                                sx={{ flex: 1 }}
                                required
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                            <TextField
                                id="customerPhone"
                                variant="outlined"
                                label="Customer Phone"
                                sx={{ flex: 1 }}
                                required
                                onChange={(e) => setCustomerPhone(e.target.value)}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <CustomizedHook
                                list={searchProducts}
                                onValueSelected={handleSelectedValue}
                                onValueRemoved={handleRemoveSelectedValue}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <InputLabel id="orderType">Order Type</InputLabel>
                            <Select
                                labelId="orderType"
                                id="orderType"
                                value={orderType}
                                label="orderType"
                                onChange={(event) => setOrderType(event.target.value)}
                                required
                            >
                                <MenuItem value={'CustomerBuy'}>Customer Buy</MenuItem>
                                <MenuItem value={'StoreBuy'}>Store Buy</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 2 }}>
                        <Button variant="outlined" onClick={handleCloseCreateModal}>
                            Close
                        </Button>
                        <Button variant="contained" onClick={() => handleSubmit()}>
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default AdOrder;