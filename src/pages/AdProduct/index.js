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

function AdProduct() {
    const [productTypes, setProductTypes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [counters, setCounters] = useState([]);
    const [stones, setStones] = useState([]);
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
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedSkillsId, setSelectedSkillsId] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [currentSkillId, setCurrentSkillId] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);

    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isWeightValid, setIsWeightValid] = useState(true);
    const [isCounterIdValid, setIsCounterIdValid] = useState(true);
    const [isProductCodeValid, setIsProductCodeValid] = useState(true);
    const [isProductTypeIdValid, setIsProductTypeIdValid] = useState(true);
    const [isMaterialIdValid, setIsMaterialIdValid] = useState(true);
    const [isStoneIdsValid, setIsStoneIdsValid] = useState(true);
    const [isUpdateStatus, setIsUpdateStatus] = useState(false);

    const [createData, setCreateData] = useState({
        ProductTypeId: '',
        Name: '',
        Description: '',
        Weight: '',
        CounterId: "",
        ProductCode: '',
        MaterialId: '',
        StoneIds: [],
    });
    const [createProducts, setCreateProducts] = useState([]);

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
                const getAllStone = await StoneAPI.getAll();
                setStones(getAllStone);
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
                setIsUpdateStatus(false);
            } catch (error) {
                console.log(error);
            }
        };
        getAll();
    }, [params, createProducts, isUpdateStatus]);

    useEffect(() => {
        console.log(products);
    }, [products])

    const handleCloseBtn = () => {
        setIsCounterIdValid(true);

        setIsDescriptionValid(true);

        setIsNameValid(true);
        setIsProductCodeValid(true);

        setIsProductTypeIdValid(true);

        setIsWeightValid(true);

        setIsMaterialIdValid(true);
        setIsStoneIdsValid(true);
        setIsCreateModalOpen(false);
        setCreateData({
            ProductTypeId: '',
            Name: '',
            Description: '',
            Weight: '',
            CounterId: "",
            ProductCode: '',
            MaterialId: '',
            StoneIds: [],
        })
    }

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {

        setIsCounterIdValid(true);

        setIsDescriptionValid(true);

        setIsNameValid(true);
        setIsProductCodeValid(true);

        setIsProductTypeIdValid(true);

        setIsWeightValid(true);

        setIsMaterialIdValid(true);
        setIsStoneIdsValid(true);
        setIsCreateModalOpen(false);
    };

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

    const handleAddSkill = () => {
        if (currentSkill && currentSkillId && !selectedSkills.includes(currentSkill) && !selectedSkillsId.includes(currentSkillId)) {
            setSelectedSkills([...selectedSkills, currentSkill]);
            setSelectedSkillsId([...selectedSkillsId, currentSkillId]);
            setCurrentSkill('');
            setCurrentSkillId('');
        }
    };

    const handleDeleteSkill = (skillToDelete) => () => {
        setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToDelete));
    };

    const handlePageChange = (event, value) => {
        setParams((prev) => ({
            ...prev,
            page: value,
        }));
    };

    const handleCreate = async () => {
        try {
            let result = true;
            console.log(createData);

            if (createData.CounterId === '') {
                setIsCounterIdValid(false);
                result = false;
            } else {
                setIsCounterIdValid(true);
            }

            if (createData.Description.trim() === '') {
                setIsDescriptionValid(false);
                result = false;
            } else {
                setIsDescriptionValid(true);
            }

            if (createData.Name.trim() === '') {
                console.log('name not valid');
                setIsNameValid(false);
                result = false;
            } else {
                setIsNameValid(true);
            }

            if (createData.ProductCode === '') {
                setIsProductCodeValid(false);
                result = false;
            } else {
                setIsProductCodeValid(true);
            }

            if (createData.ProductTypeId === '') {
                setIsProductTypeIdValid(false);
                result = false;
            } else {
                setIsProductTypeIdValid(true);
            }

            if (createData.Weight === '' || createData.Weight <= 0) {
                setIsWeightValid(false);
                result = false;
            } else {
                setIsWeightValid(true);
            }

            if (createData.MaterialId === '') {
                setIsMaterialIdValid(false);
                result = false;
            } else {
                setIsMaterialIdValid(true);
            }

            if (createData.StoneIds.length === 0) {
                setIsStoneIdsValid(false);
                result = false;
            } else {
                setIsStoneIdsValid(true);
            }

            if (result) {
                // Proceed with API call or other actions
                const getAllProduct = await ProductAPI.createProduct(createData);
                setCreateProducts(getAllProduct);
                // If all validations pass, clear the form data
                setCreateData({
                    ProductTypeId: '',
                    Name: '',
                    Description: '',
                    Weight: '',
                    CounterId: '',
                    ProductCode: '',
                    MaterialId: '',
                    StoneIds: [],
                });
                setIsCreateModalOpen(false);


            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setCreateData({ ...createData, StoneIds: selectedSkillsId })
    }, [selectedSkills])

    useEffect(() => {
        console.log(createData);
    }, [createData])

    useEffect(() => {
        const updateProductPrice = async () => {
            try {
                const updatePrice = await ProductAPI.updateProductPrice(createData);
            } catch (error) {
                console.log(error);
            }
        };
        updateProductPrice();
    }, [createData]);

    const handleUpdateStatus = async (id) => {
        const updatePrice = await ProductAPI.updateProductStatus(id);
        setIsUpdateStatus(true)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Button variant="contained" size="medium" onClick={handleOpenCreateModal}>
                    Create
                </Button>
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
                                Weight (gram)
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Price (VND)
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Counter
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Change status
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
                                    <Chip
                                        label={product.status}
                                        sx={{
                                            backgroundColor:
                                                product.status === "SALED"
                                                    ? "green"
                                                    : product.status === "BUYBACK"
                                                        ? "#0000FF"
                                                        : product.status === "AVAILABLE" // Thêm điều kiện cho AVAILABLE
                                                            ? "orange" // Màu xanh lá cây nhạt
                                                            : product.status === "INAVAILABLE" // Điều kiện cho INAVAILABLE
                                                                ? "gray" // Màu xám
                                                                : "orange",
                                            color: "white",
                                            fontWeight: "bold",
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    {product.status === "BUYBACK" || product.status === "AVAILABLE" || product.status === "INAVAILABLE" ? <Button variant='contained' color='success' onClick={() => handleUpdateStatus(product.id)}>Change</Button> : <>No Action</>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={isCreateModalOpen} onClose={handleCloseCreateModal}>
                <Box
                    sx={{
                        position: 'absolute',
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
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                            Create Product
                        </Typography>
                        <Box
                            sx={{
                                border: '1px solid #ccc',
                                padding: 2,
                                borderRadius: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'left',
                                gap: 2,
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    sx={{ flex: 1 }}
                                    onChange={(event) => {
                                        setCreateData({ ...createData, Name: event.target.value });
                                    }}
                                    error={!isNameValid}
                                    helperText={!isNameValid ? 'Name is required' : ''}
                                />
                                <TextField
                                    id="productCode"
                                    name="productCode"
                                    label="Code"
                                    variant="outlined"
                                    sx={{ flex: 1 }}
                                    onChange={(event) => {
                                        setCreateData({ ...createData, ProductCode: event.target.value });
                                    }}
                                    error={!isProductCodeValid}
                                    helperText={!isProductCodeValid ? 'Product Code is required' : ''}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Autocomplete
                                    disablePortal
                                    id="productType"
                                    name="productType"
                                    options={productTypes}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                        const selectedProductTypeId = newValue ? newValue.id : null;
                                        setCreateData({ ...createData, ProductTypeId: selectedProductTypeId });
                                    }}
                                    sx={{ width: 300, flex: 1 }}
                                    renderInput={(params) => <TextField {...params} label="Product Type" error={!isProductTypeIdValid}
                                        helperText={!isProductTypeIdValid ? 'Product Type is required' : ''} />}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="material"
                                    name="material"
                                    options={materials}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                        const selectedMaterialId = newValue ? newValue.id : null;
                                        setCreateData({ ...createData, MaterialId: selectedMaterialId });
                                    }}
                                    sx={{ width: 300, flex: 1 }}
                                    renderInput={(params) => <TextField {...params} label="Gold Type" error={!isMaterialIdValid}
                                        helperText={!isMaterialIdValid ? 'Material is required' : ''} />}

                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows={5}
                                    sx={{ width: '100%', flex: 1 }}
                                    onChange={(event) => {
                                        setCreateData({ ...createData, Description: event.target.value });
                                    }}
                                    error={!isDescriptionValid}
                                    helperText={!isDescriptionValid ? 'Description is required' : ''}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                gap: 2,
                            }}>
                                <Autocomplete
                                    disablePortal
                                    id="skill"
                                    name="skill"
                                    options={stones}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                        const selectedStoneId = newValue ? newValue.id : null;
                                        if (newValue) {
                                            setCurrentSkill(newValue.name);
                                            setCurrentSkillId(selectedStoneId);
                                        } else {
                                            setCurrentSkill('');
                                            setCurrentSkillId('');
                                        }
                                    }}
                                    sx={{ width: '80%' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Stones"
                                            error={!isStoneIdsValid}
                                            helperText={!isStoneIdsValid ? 'Stone is required' : ''}
                                        />
                                    )}
                                />
                                <Button variant="contained" onClick={handleAddSkill}>
                                    Add Stone
                                </Button>
                            </Box>
                            {selectedSkills.length > 0 && (
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {selectedSkills.map((skill, index) => (
                                        <Chip key={index} label={skill} onDelete={handleDeleteSkill(skill)} />
                                    ))}
                                </Box>
                            )}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Autocomplete
                                    disablePortal
                                    id="counter"
                                    name="counter"
                                    options={counters}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                        const selectedCounterId = newValue ? newValue.id : null;
                                        setCreateData({ ...createData, CounterId: selectedCounterId });
                                    }}
                                    sx={{ width: 300, flex: 1 }}
                                    renderInput={(params) => <TextField {...params} label="Counter" error={!isCounterIdValid}
                                        helperText={!isCounterIdValid ? 'Counter is required' : ''} />}

                                />
                                <TextField
                                    id="weight"
                                    name="weight"
                                    label="Weight"
                                    variant="outlined"
                                    type='number'
                                    sx={{ flex: 1 }}
                                    onChange={(event) => {
                                        const newValue = event.target.value;
                                        setCreateData({
                                            ...createData,
                                            Weight: newValue === "" ? "" : parseFloat(newValue)
                                        });
                                    }}
                                    error={!isWeightValid}
                                    helperText={!isWeightValid ? 'Weight must greater than 0' : ''}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    type="submit"
                                    onClick={handleCloseBtn}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    onClick={handleCreate}
                                >
                                    Create
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
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
