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
import AccountAPI from '~/api/AccountAPI';
import PromotionAPI from '~/api/PromotionAPI';

function AdPromotion() {
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isStartDateValid, setIsStartDateValid] = useState(true);
    const [isEndDateValid, setIsEndDateValid] = useState(true);
    const [isValueValid, setIsValueValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [user, setUser] = useState();

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

    const [promotions, setPromotions] = useState([]);
    const [promotionName, setPromotionName] = useState('');
    const [statusSearch, setStatusSearch] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        const fetchUser = async () => {
            try {
                fetchPromotion();
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    const handleSearch = async () => {
        try {
            const params = {
                promotionName: promotionName,
                status: statusSearch,
                startDate: startDate,
                endDate: endDate,
                page: 1,
                limit: 100,
            };
            const response = await PromotionAPI.getAllForAdmin(params);
            setPromotions(response.listResult);
            console.log(response.data); // handle the response data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchPromotion = async () => {
        try {
            const params = {
                promotionName: '',
                status: '',
                startDate: null,
                endDate: null,
                page: 1,
                limit: 10,
            };
            const response = await PromotionAPI.getAllForAdmin(params);
            console.log(response);
            console.log(user);
            setPromotions(response.listResult);
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

    const status = ['ACTIVE', 'INACTIVE'];

    const handleRowClick = (mentee) => {
        setSelectedMentee(mentee);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsNameValid(false);
        setIsNameValid(true);
        setIsValueValid(true);
        setIsStartDateValid(true);
        setIsEndDateValid(true);
        setIsDescriptionValid(true);
        setIsCreateModalOpen(false);
    };

    const handleChangeStatus = async (id, startDate, endDate) => {
        var result = await PromotionAPI.changeStatus(id);
        console.log(result);
        const currentDate = new Date();
        if (result === false) {
            if (startDate > currentDate) {
                window.alert('Promotion is not start yet.');
            } else if (endDate < currentDate) {
                window.alert('Promotion is expire.');
            } else {
                window.alert('There can be only 1 promotion active at the same time.');
            }

        }
        await fetchPromotion();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isDataValid = true;
        const data = new FormData(event.currentTarget);

        if (data.get('name').length < 5 || data.get('name').length > 50) {
            setIsNameValid(false);
            isDataValid = false;
        } else {
            setIsNameValid(true);
        }

        if (isNaN(data.get('value')) || data.get('value') < 0 || data.get('value') > 1 || data.get('value') == '') {
            setIsValueValid(false);
            isDataValid = false;
        } else {
            setIsValueValid(true);
        }

        if (data.get('description').length < 5 || data.get('description').length > 100) {
            setIsDescriptionValid(false);
            isDataValid = false;
        } else {
            setIsDescriptionValid(true);
        }
        // Validate dates
        const startDate = new Date(data.get('startDate'));
        const endDate = new Date(data.get('endDate'));
        const currentDate = new Date();

        if (startDate < currentDate || data.get('startDate') == '') {
            setIsStartDateValid(false);
            isDataValid = false;
        } else {
            setIsStartDateValid(true);
        }
        if (endDate <= startDate || data.get('endDate') == '') {
            setIsEndDateValid(false);
            isDataValid = false;
        } else {
            setIsEndDateValid(true);
        }
        const promotionRequest = {
            name: data.get('name'),
            description: data.get('description'),
            value: data.get('value'),
            startDate: data.get('startDate'),
            endDate: data.get('endDate'),
            status: null,
            createDate: null,
            updateDate: null,
            updateBy: user.name,
            createBy: user.name,
        };
        console.log(promotionRequest);
        if (isDataValid) {
            await PromotionAPI.createOrder(promotionRequest);
            await handleCloseCreateModal();
        }
        fetchPromotion();
    };

    useEffect(() => {
        console.log(isNameValid);
    }, [isNameValid]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Button variant="contained" size="medium" onClick={handleOpenCreateModal}>
                    Create
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, paddingRight: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="Promotion name..."
                        variant="outlined"
                        size="small"
                        value={promotionName}
                        onChange={(e) => setPromotionName(e.target.value)}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={status}
                        sx={{ width: 150 }}
                        renderInput={(params) => <TextField {...params} label="Status" />}
                        size="small"
                        onChange={(event, newValue) => setStatusSearch(newValue)}
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
                                id="outlined-basic"
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
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Box>
                    </Box>
                    <Button variant="contained" size="medium" onClick={() => handleSearch()}>
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
                                Description
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Discount
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Start date
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                End Date
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {promotions.map((promotion, index) => (
                            <TableRow
                                key={promotion.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => handleRowClick(promotion)}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {promotion.name}
                                </TableCell>
                                <TableCell align="left" sx={{ maxWidth: '300px' }}>
                                    {promotion.description}
                                </TableCell>
                                <TableCell align="left">{promotion.value}</TableCell>
                                <TableCell align="left">{promotion.startDate}</TableCell>
                                <TableCell align="left">{promotion.endDate}</TableCell>
                                <TableCell align="left">
                                    {' '}
                                    <FormControlLabel
                                        id={promotion.id}
                                        control={<IOSSwitch sx={{ m: 1 }} checked={promotion.status === 'ACTIVE'} />}
                                        label={promotion.status == 'ACTIVE' ? 'Active' : 'InActive'}
                                        onClick={() => handleChangeStatus(promotion.id, promotion.startDate, endDate)} // Ngăn chặn sự kiện click lan ra
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Create Promotion
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            border: '1px solid #ccc',
                            padding: 2,
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'left',
                            gap: 2,
                            minWidth: '500px',
                        }}
                    >
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
                                error={!isNameValid}
                                helperText={!isNameValid ? 'Name must be 5-50 characters long' : ''}
                            />
                            <TextField
                                id="value"
                                name="value"
                                label="Value"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                error={!isValueValid}
                                helperText={!isValueValid ? 'Value must be from 0 to 1' : ''}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'end',
                                justifyContent: 'center',
                                gap: 2,
                                border: '1px solid #ccc',
                                borderRadius: 2,
                                padding: 2,
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
                                    name="startDate"
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    error={!isStartDateValid}
                                    helperText={!isStartDateValid ? 'Invalid StartDate' : ''}
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
                                    name="endDate"
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    error={!isEndDateValid}
                                    helperText={!isEndDateValid ? 'Invalid Endate' : ''}
                                />
                            </Box>
                        </Box>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            rows={5}
                            sx={{ width: '100%', flex: 1 }}
                            error={!isDescriptionValid}
                            helperText={!isDescriptionValid ? 'Description must be 5-100 characters long' : ''}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mt: 1 }}>
                            <Button variant="outlined" onClick={handleCloseCreateModal}>
                                Close
                            </Button>
                            <Button variant="contained" type="submit">
                                Create
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default AdPromotion;
