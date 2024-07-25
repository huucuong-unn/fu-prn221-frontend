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
    Grid,
    CardContent,
    Card,
} from '@mui/material';

import { BarChart, LineChart, PieChart, pieArcLabelClasses } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import OrderAPI from '~/api/OrderAPI';

function AdDashboard() {
    const [statisticalOrderAndSalesAndProduct, setStatisticalOrderAndSalesAndProduct] = useState({});
    const [dataForBarChart, setDataForBarChart] = useState([]);
    const [dataForLineChart, setDataForLineChart] = useState([]);
    const [dataForTop5Customer, setDataForTop5Customer] = useState([]);
    const [data, setData] = useState([]);
    //Barchart
    const chartSettingForBarChart = {
        xAxis: [
            {
                label: 'order',
            },
        ],
        width: 600,
        height: 400,
    };

    const datasetForBarChar = [
        {
            seoul: 21,
            month: 'Jan',
        },
        {
            seoul: 28,
            month: 'Fev',
        },
        {
            seoul: 41,
            month: 'Mar',
        },
        {
            seoul: 73,
            month: 'Apr',
        },
        {
            seoul: 99,
            month: 'May',
        },
        {
            seoul: 144,
            month: 'June',
        },
        {
            seoul: 319,
            month: 'July',
        },
        {
            seoul: 249,
            month: 'Aug',
        },
        {
            seoul: 131,
            month: 'Sept',
        },
        {
            seoul: 55,
            month: 'Oct',
        },
        {
            seoul: 48,
            month: 'Nov',
        },
        {
            seoul: 25,
            month: 'Dec',
        },
    ];

    const valueFormatter = (value) => `${value}`;

    //PieChart
    // const data = [
    //     { label: 'Bracelet', value: 400, color: '#0088FE' },
    //     { label: 'Ring', value: 300, color: '#00C49F' },
    //     { label: 'Necklace', value: 300, color: '#FFBB28' },
    //     { label: 'Ear-ring', value: 200, color: '#FF8042' },
    // ];

    const sizing = {
        margin: { right: 5 },
        width: 300,
        height: 400,
        legend: { hidden: true },
    };

    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData(1, 159, 6.0, 24, 4.0),
        createData(2, 237, 9.0, 37, 4.3),
        createData(3, 262, 16.0, 24, 6.0),
        createData(4, 305, 3.7, 67, 4.3),
        createData(5, 356, 16.0, 49, 3.9),
    ];

    useEffect(() => {
        const getStatisticalOrderAndSalesAndProductFunc = async () => {
            try {
                const getStatisticalOrderAndSalesAndProductResponse =
                    await OrderAPI.getStatisticalOrderAndSalesAndProduct();
                setStatisticalOrderAndSalesAndProduct(getStatisticalOrderAndSalesAndProductResponse);
            } catch (error) {
                console.log(error);
            }
        };
        getStatisticalOrderAndSalesAndProductFunc();
    }, []);

    useEffect(() => {
        const getMonthlyOrderCountFunc = async () => {
            try {
                const getMonthlyOrderCountResponse = await OrderAPI.GetMonthlyOrderCount();
                setDataForBarChart(getMonthlyOrderCountResponse);
            } catch (error) {
                console.log(error);
            }
        };
        getMonthlyOrderCountFunc();
    }, []);

    useEffect(() => {
        const orderDashboardForLineChart = async () => {
            try {
                const orderDashboardForLineChartResponse = await OrderAPI.OrderDashboardForLineChart();
                const formattedData = [];
                for (const key in orderDashboardForLineChartResponse) {
                    formattedData.push({
                        month: parseInt(key), // Chuyển key (tháng) thành số
                        sales: orderDashboardForLineChartResponse[key],
                    });
                }
                setDataForLineChart(formattedData);
            } catch (error) {
                console.log(error);
            }
        };
        orderDashboardForLineChart();
    }, []);

    useEffect(() => {
        const getTop5CustomersFunc = async () => {
            try {
                const getTop5CustomersResponse = await OrderAPI.GetTop5Customers();
                setDataForTop5Customer(getTop5CustomersResponse);
            } catch (error) {
                console.log(error);
            }
        };
        getTop5CustomersFunc();
    }, []);

    useEffect(() => {
        const getProductTypeWithTotalOrderFunc = async () => {
            try {
                const getProductTypeWithTotalOrderResponse = await OrderAPI.GetProductTypeWithTotalOrder();
                const formattedData = getProductTypeWithTotalOrderResponse.map((item) => ({
                    label: item.productTypeName,
                    value: item.totalOrder,
                    color: getRandomColor(),
                }));

                setData(formattedData);
            } catch (error) {
                console.log(error);
            }
        };
        getProductTypeWithTotalOrderFunc();
    }, []);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 4,
                width: '800px',
                minHeight: '600px',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Number of Orders
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {statisticalOrderAndSalesAndProduct.numberOfOrders}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Sales
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        statisticalOrderAndSalesAndProduct.sales,
                                    )}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Products Available
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {statisticalOrderAndSalesAndProduct.numberOfProduct}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Box
                    sx={{
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
                    <LineChart
                        xAxis={[{ data: dataForLineChart.map((item) => item.month) }]}
                        series={[
                            {
                                data: dataForLineChart.map((item) => item.sales),
                            },
                        ]}
                        width={600}
                        height={400}
                        options={{
                            scales: {
                                y: {
                                    ticks: {
                                        callback: (value) => new Intl.NumberFormat('vi-VN').format(value),
                                    },
                                },
                            },
                        }}
                    />
                    <Box sx={{ padding: 1 }}>
                        <Typography variant="h5">Monthly Revenue - [2024]</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        width: 'fit-content',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
                    <BarChart
                        dataset={dataForBarChart}
                        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[{ dataKey: 'totalOrder', label: 'Order', valueFormatter }]}
                        layout="horizontal"
                        grid={{ vertical: true }}
                        {...chartSettingForBarChart}
                    />
                    <Box sx={{ padding: 1 }}>
                        <Typography variant="h5">Number of Order by Month</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        width: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <PieChart
                            series={[
                                {
                                    outerRadius: 80,
                                    data,
                                    arcLabel: getArcLabel,
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 14,
                                    flex: 1,
                                },
                            }}
                            {...sizing}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'start',
                                flex: 1,
                            }}
                        >
                            {data.map((item) => (
                                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            borderRadius: '50%',
                                            bgcolor: item.color,
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="body2">{item.label}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ padding: 1 }}>
                        <Typography variant="h5">Product Popularity</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        width: '600px',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        gap: 2,
                    }}
                >
                    <Typography variant="h6">TOP 5 CUSTOMER WITH THE MOST ORDERS</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 550 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                        No
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                        Name
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                        Phone number
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                        Total
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataForTop5Customer.map((customer, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell scope="row">{customer.name}</TableCell>
                                        <TableCell align="left">{customer.phoneNumber}</TableCell>
                                        <TableCell align="left">{customer.totalOrder}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}

export default AdDashboard;
