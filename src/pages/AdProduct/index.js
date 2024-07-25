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

function AdProduct() {
    const [productTypes, setProductTypes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [counters, setCounters] = useState([]);
    const [productTypeId, setProductTypeId] = useState();
    const [materialId, setMaterialId] = useState();
    const [counterId, setCounterId] = useState();
    const [productStatusParams, setProductStatusParams] = useState();
    const [productCode, setProductCode] = useState();
    const [totalPage, setTotalPage] = useState(0);
    const [params, setParams] = useState({
        productCode: null,
        productTypeId: null,
        materialId: null,
        counterId: null,
        status: null,
        page: 1,
        size: 10,
    });
    const [products, setProducts] = useState([]);

    const productStatus = [
        "SALED",
        "BUYBACK"
    ]

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(value);
    };

    useEffect(() => {
        const getAllProductTypes = async () => {
            try {
                const getAllProductTypeWithStatusActive = await ProductTypeAPI.getAllWithStatusActiveWithoutPaging();
                setProductTypes(getAllProductTypeWithStatusActive);
            } catch (error) {
                console.log(error);
            }
        };

        getAllProductTypes();
    }, []);

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
        const getAll = async () => {
            try {
                const getAllCounterWithStatusActive = await CounterAPI.getAllWithStatusActiveWithoutPaging();
                setCounters(getAllCounterWithStatusActive);
            } catch (error) {
                console.log(error);
            }
        };
        getAll();
    }, []);

    useEffect(() => {
        const getAll = async () => {
            try {
                const getAllProduct = await ProductAPI.searchProduct(params);
                setProducts(getAllProduct.listResult);
                setTotalPage(getAllProduct.totalPages);
            } catch (error) {
                console.log(error);
            }
        };
        getAll();
    }, [params]);

    useEffect(() => {
        console.log(productStatusParams);
    }, [productStatusParams]);

    const sortProductType = (selectedProductTypeId) => {
        setProductTypeId(selectedProductTypeId);
    };

    const sortMaterial = (selectedMaterialId) => {
        setMaterialId(selectedMaterialId);
    };

    const sortCounter = (selectedCounterId) => {
        setCounterId(selectedCounterId);
    };

    const sortProductStatus = (selectProductStatus) => {
        setProductStatusParams(selectProductStatus);
    };

    const handleSort = () => {
        setParams((prevParams) => ({
            ...prevParams,
            productCode: productCode,
            productTypeId: productTypeId,
            materialId: materialId,
            counterId: counterId,
            status: productStatusParams
        }));
    };

    const handlePageChange = (event, value) => {
        setParams((prev) => ({
            ...prev,
            page: value,
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, paddingRight: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Product code..."
                    variant="outlined"
                    size="small"
                    value={productCode}
                    onChange={(event) => setProductCode(event.target.value)}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: 120 }}
                    options={productTypes}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        const selectedProductTypeId = newValue ? newValue.id : null;
                        sortProductType(selectedProductTypeId);
                    }}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Type" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: 120 }}
                    size="small"
                    options={materials}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        const selectedMaterialId = newValue ? newValue.id : null;
                        sortMaterial(selectedMaterialId);
                    }}
                    renderInput={(params) => <TextField {...params} label="Material" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: 120 }}
                    size="small"
                    options={counters}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        const selectedCounterlId = newValue ? newValue.id : null;
                        sortCounter(selectedCounterlId);
                    }}
                    renderInput={(params) => <TextField {...params} label="Counter" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: 120 }}
                    size="small"
                    options={productStatus}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => {
                        const selectProductStatus = newValue ? newValue : null;
                        sortProductStatus(selectProductStatus);
                    }}
                    renderInput={(params) => <TextField {...params} label="Status" />}
                />
                <Button variant="contained" size="medium" onClick={handleSort}>
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
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
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
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="left">{product.productCode}</TableCell>
                                <TableCell align="left">{product.productType}</TableCell>
                                <TableCell align="left">{product.materialName}</TableCell>
                                <TableCell align="left">{product.weight}</TableCell>
                                <TableCell align="left">{formatCurrency(product.price)}</TableCell>
                                <TableCell align="left">{product.counterName}</TableCell>
                                <TableCell align="left">
                                    <Chip label={product.status}
                                        sx={{
                                            backgroundColor: product.status === "SALED" ? 'green' : '#0000FF',
                                            color: "white",
                                            fontWeight: "bold"
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPage}
                    page={params.page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                    )}
                />
            </Box>
        </Box>
    );
}

export default AdProduct;
