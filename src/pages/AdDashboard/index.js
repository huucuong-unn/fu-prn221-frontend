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
} from '@mui/material';

import { BarChart, LineChart, PieChart, pieArcLabelClasses } from '@mui/x-charts';

function AdDashboard() {
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
            london: 59,
            paris: 57,
            newYork: 86,
            seoul: 21,
            month: 'Jan',
        },
        {
            london: 50,
            paris: 52,
            newYork: 78,
            seoul: 28,
            month: 'Fev',
        },
        {
            london: 47,
            paris: 53,
            newYork: 106,
            seoul: 41,
            month: 'Mar',
        },
        {
            london: 54,
            paris: 56,
            newYork: 92,
            seoul: 73,
            month: 'Apr',
        },
        {
            london: 57,
            paris: 69,
            newYork: 92,
            seoul: 99,
            month: 'May',
        },
        {
            london: 60,
            paris: 63,
            newYork: 103,
            seoul: 144,
            month: 'June',
        },
        {
            london: 59,
            paris: 60,
            newYork: 105,
            seoul: 319,
            month: 'July',
        },
        {
            london: 65,
            paris: 60,
            newYork: 106,
            seoul: 249,
            month: 'Aug',
        },
        {
            london: 51,
            paris: 51,
            newYork: 95,
            seoul: 131,
            month: 'Sept',
        },
        {
            london: 60,
            paris: 65,
            newYork: 97,
            seoul: 55,
            month: 'Oct',
        },
        {
            london: 67,
            paris: 64,
            newYork: 76,
            seoul: 48,
            month: 'Nov',
        },
        {
            london: 61,
            paris: 70,
            newYork: 103,
            seoul: 25,
            month: 'Dec',
        },
    ];

    const valueFormatter = (value) => `${value}`;

    //PieChart
    const data = [
        { label: 'Bracelet', value: 400, color: '#0088FE' },
        { label: 'Ring', value: 300, color: '#00C49F' },
        { label: 'Necklace', value: 300, color: '#FFBB28' },
        { label: 'Ear-ring', value: 200, color: '#FF8042' },
    ];

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
                        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                        series={[
                            {
                                data: [11, 5.5, 2, 8.5, 1.5, 5, 11, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        width={600}
                        height={400}
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
                        dataset={datasetForBarChar}
                        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[{ dataKey: 'seoul', label: 'Order', valueFormatter }]}
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
                                {rows.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.calories}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
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
