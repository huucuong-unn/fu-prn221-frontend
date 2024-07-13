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
    Card,
    CardContent,
    Grid,
    IconButton,
    Chip,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/system';

import { useEffect, useState } from 'react';

import getStaffData from '~/api/NEW/accountAPI';
import getCounterData from '~/api/NEW/counterAPI';
import getUserCounterData from '~/api/NEW/userCounterAPI';
import { getCounterById, getStaffById } from '~/api/NEW/getByID';



function AdCounter() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenForStaff, setIsModalOpenForStaff] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [counters, setCounters] = useState([]);
    const [userCounters, setUserCounters] = useState([]);
    const [newCounterName, setNewCounterName] = useState('');
    const [currentCounterName, setCurrentCounterName] = useState('');
    const [countersData, setCountersData] = useState([]);
    const [staffsData, setStaffsData] = useState([]);

    const handleOpenCounterModal = async () => {
        setIsModalOpen(true);
        try {
            setLoading(true);
            const userCounterData = await getUserCounterData(); // Fetch userCounter data

            if (userCounterData.userCounters.length > 0) {
                const counterPromises = userCounterData.userCounters.map(async (userCounter) => {
                    const counterId = userCounter.counterId;
                    const staffId = userCounter.staffId;

                    // Fetch counter and staff details based on IDs
                    const counterData = await getCounterById(counterId);
                    const staffData = await getStaffById(staffId);

                    setCurrentCounterName(counterData.name);

                    return { counterData, staffData };
                });

                const results = await Promise.all(counterPromises);

                // Separate countersData and staffsData from results
                const fetchedCounters = results.map((result) => result.counterData);
                const fetchedStaffs = results.map((result) => result.staffData);

                setCountersData(fetchedCounters);
                setStaffsData(fetchedStaffs);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [staffData, counterData, userCounterData] = await Promise.all([
                    getStaffData(),
                    getCounterData(),
                    getUserCounterData(),
                ]);
                setStaffs(staffData.staffList);
                setCounters(counterData);
                setUserCounters(userCounterData.userCounters); // Assuming userCounters is the key in the returned object
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const name = event.target.name.value;
        const phoneNumber = event.target.phoneNumber.value;
        const password = event.target.password.value;

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }

        if (name.length < 5) {
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        }

        if (password.length < 5) {
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true);
        }

        if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber)) {
            setIsPhoneNumberValid(false);
        } else {
            setIsPhoneNumberValid(true);
        }
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateCounter = async () => {
        const newCounter = {
            name: newCounterName,
            income: 0,
            status: "ACTIVE",
            createDate: new Date().toISOString(),
            createBy: "string",
            updateDate: new Date().toISOString(),
            updateBy: "string",
        };

        try {
            const response = await fetch('http://localhost:5036/api/v1/counter/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCounter),
            });

            if (!response.ok) {
                throw new Error('Failed to create counter');
            }

            const createdCounter = await response.json();
            setCounters((prevCounters) => [...prevCounters, createdCounter]);
            setNewCounterName(''); // Clear the input field
            handleCloseCreateModal(); // Close the modal
        } catch (error) {
            console.error('Error creating counter:', error);
        }
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleOpenModalForStaff = () => {
        setIsModalOpenForStaff(true);
    };

    const handleCloseModalForStaff = () => {
        setIsModalOpenForStaff(false);
    };

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleOpenConfirmModal = () => {
        setOpenConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setOpenConfirmModal(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };





    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 4 }}>
            <Button variant="contained" onClick={() => handleOpenCreateModal()}>
                Create Counter
            </Button>
            <Grid container spacing={2}>
                {counters.map((counter, index) => (
                    <Grid item xs={4} key={index}>
                        <Card
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={() => handleOpenModal()}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {counter.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Income: {formatCurrency(counter.income)}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }} checked={counter.status === 'ACTIVE'} />}
                                label={counter.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                                onClick={(event) => event.stopPropagation()}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>

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
                                Email
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Working at Counter
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Role
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffs.map((staff, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => handleOpenModalForStaff()}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {staff.name}
                                </TableCell>
                                <TableCell align="left" sx={{ maxWidth: '300px' }}>
                                    {staff.email}
                                </TableCell>

                                <TableCell align="left">
                                    {staff.workingAtCounter ? staff.workingAtCounter : 'N/A'}
                                </TableCell>
                                <TableCell align="left">
                                    <Chip
                                        label={staff.role}
                                        sx={{
                                            backgroundColor: staff.role === 'Admin' ? 'red' : 'blue',
                                            color: 'white',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    {' '}
                                    <FormControlLabel
                                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                        label="Active"
                                        onClick={(event) => event.stopPropagation()} // Ngăn chặn sự kiện click lan ra
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '900px',
                        bgcolor: '#f5f5f5',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'left',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, gap: 1 }}>
                        <Typography variant="h4" fontWeight="bold">
                            List of Staff at {currentCounterName}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleOpenEditModal}>
                            Edit
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            sx={{ width: 200 }}
                            size="small"
                            renderInput={(params) => <TextField {...params} label="Add staff" />}
                        />
                        <Button variant="contained">Add</Button>
                    </Box>
                    <Grid container spacing={2}>
                        {staffsData.map((staff, index) => (
                            <Grid item xs={4} key={index}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                        position: 'relative',
                                    }}
                                >
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleOpenConfirmModal}
                                        sx={{
                                            position: 'absolute',
                                            top: 5,
                                            right: 5,
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                {staff.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {staff.totalPrice}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
            <Modal open={openConfirmModal} onClose={handleCloseConfirmModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Are you sure?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="error">
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal open={isCreateModalOpen} onClose={handleCloseCreateModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '5px',
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Create Counter
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                        <TextField
                            id="outlined-basic"
                            label="Name..."
                            variant="outlined"
                            size="small"
                            value={newCounterName}
                            onChange={(e) => setNewCounterName(e.target.value)}
                        />

                        <Button variant="contained" size="medium" onClick={handleCreateCounter}>
                            Create
                        </Button>

                    </Box>
                </Box>
            </Modal>
            <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '5px',
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Update Counter Name
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                        <TextField id="outlined-basic" label="Name..." variant="outlined" size="small" />
                        <Button variant="contained" size="medium">
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal open={isModalOpenForStaff} onClose={handleCloseModalForStaff}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '5px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2,
                            gap: 1,
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Staff Profile
                        </Typography>
                        <Chip
                            label="Admin"
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                            }}
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            border: '1px solid #ccc',
                            padding: 2,
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'left',
                            gap: 2,
                            width: '600px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <TextField
                                id="name"
                                name="Name"
                                label="Full name"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                error={!isNameValid}
                                helperText={!isNameValid ? 'Name must have more than 5 characters' : ''}
                            />
                            <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone number"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                error={!isPhoneNumberValid}
                                helperText={!isPhoneNumberValid ? 'Invalid phone' : ''}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                error={!isEmailValid}
                                helperText={!isEmailValid ? 'Invalid email' : ''}
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                error={!isPasswordValid}
                                helperText={!isPasswordValid ? 'Password must have more than 5 characters' : ''}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', gap: 1 }}>
                            <Button variant="outlined">Close</Button>
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default AdCounter;
