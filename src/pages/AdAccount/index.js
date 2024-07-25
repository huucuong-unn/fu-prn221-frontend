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
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TablePagination,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/system';

import { useEffect, useState } from 'react';


import AccountAPI from '~/api/AccountAPI';



function AdAccount() {
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
    const [totalRecords, setTotalRecords] = useState(0);
    const [staffModalData, setStaffsModalData] = useState([]);
    const [selectedCounterId, setSelectedCounterId] = useState(null);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [updateUserName, setUpdateUserName] = useState();
    const [updateUserEmail, setUpdateUserEmail] = useState();
    const [updatePassword, setUpdatePassword] = useState();
    const [updateRole, setUpdateRole] = useState();
    const [updateUser, setUpdateUser] = useState({
        name: '',
        email:'',
       pass:'',
        role:''
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleUpdateUser = async () => {
        try {
            console.log('updateFullName: ', updateUserName);
            console.log('updateEmail: ', updateUserEmail);
            console.log('updatePassword: ', updatePassword);
            const updateUser = await AccountAPI.getStaffById(selectedStaffId.id);
            console.log(updateUser);
            const result = await AccountAPI.update(selectedStaffId.id, {
                name: updateUserName,
                password: updatePassword,
                email: updateUserEmail,
                role: updateRole,

                income: updateUser.income,
                createdDate: updateUser.createdDate,
                createBy: updateUser.createBy,
                updatedDate: new Date().toISOString(),
                updateBy: "admin",
                status: updateUser.status,
            });
            console.log(result);

            window.alert('Update successfully');
            handleCloseEditModal();
            window.location.reload();
        } catch (e) {
            console.log(e);
        }

    }


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
                // Fetch data from APIs concurrently
                AccountAPI.getCounterData()
                AccountAPI.getUserCounterData()
                // Extract data from responses
                const staffData = await AccountAPI.getUser({ page: page + 1, size: rowsPerPage });
                const counterData = await AccountAPI.getCounterData();
                const userCounterData = await AccountAPI.getUserCounterData();
                const totalRecords = staffData.totalPages;
                setTotalRecords(totalRecords);
                console.log(totalRecords);
                // Log responses
                console.log('Staff Data:', staffData);
                console.log('Counter Data:', counterData);
                console.log('User Counter Data:', userCounterData);



                // Set state with the extracted data
                setStaffs(staffData.listResult);
                setCounters(counterData);

                setUserCounters(userCounterData.listResult);

                const updatedStaffList = staffData.listResult.map(staff => {
                    const userCounter = userCounterData.listResult.find(uc => uc.staffId === staff.id);
                    let workingAtCounter = 'No counter assigned';
                    if(staff.role === "ADMIN"){
                      workingAtCounter = 'THIS IS ADMIN'
                    }
                    if (userCounter && userCounter.status.toLowerCase() === 'active') {
                        const counter = counterData.find(c => c.id === userCounter.counterId);
                        if (counter) {
                            workingAtCounter = counter.name;
                        }
                    }


                    return {
                        ...staff,
                        workingAtCounter
                    };
                });
                console.log('Staff list:', updatedStaffList);
                setStaffs(updatedStaffList);
                setUserCounters(userCounterData);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, rowsPerPage]);



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
        const newUser = {
            name: updateUser.name,
            email: updateUser.email,
            password: updateUser.pass,
            role: updateUser.role,
            status: "ACTIVE",
            createdDate: new Date().toISOString(),
            createBy: "admin",
            updatedDate: new Date().toISOString(),
            updateBy: "",
        };

        try {
            const response = await fetch('http://localhost:5036/api/v1/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
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

    const handleOpenModalForStaff = async (staffId) => {
        try {
            const selectedStaff = await AccountAPI.getStaffById(staffId);

            setSelectedStaffId(selectedStaff);
          setIsModalOpenForStaff(true)
        } catch (error) {
            console.error("Error fetching staff details:", error);
        }
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

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSelectedStaffId((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // const handleSave = async () => {
    //     // Add validation logic here
    //     const isValid = true; // Replace with actual validation checks
    //
    //     if (isValid) {
    //         try {
    //             await AccountAPI.update(selectedStaffId.id, selectedStaffId);
    //             handleCloseModalForStaff(); // Close the modal on success
    //         } catch (error) {
    //             console.error("Error updating staff details:", error);
    //         }
    //     }
    // };




    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCounterName();


    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 4 }}>

            <Button variant="contained" onClick={() => handleOpenCreateModal()}>
                Create Account
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>No</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Currently working at Counter</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Income All the time</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffs.map((staff, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { cursor: 'pointer' },
                                }}
                                onClick={() => handleOpenModalForStaff(staff.id)}
                            >
                                <TableCell component="th" scope="row">
                                    {page * rowsPerPage + index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {staff?.name}
                                </TableCell>
                                <TableCell align="left" sx={{ maxWidth: '300px' }}>
                                    {staff?.email}
                                </TableCell>
                                <TableCell align="left">
                                    {staff?.workingAtCounter ? staff.workingAtCounter : 'None'}
                                </TableCell>
                                <TableCell align="left">
                                    {staff?.role === 'ADMIN'
                                        ? 'THIS IS ADMIN'
                                        : formatCurrency(staff?.income || '0.00')}
                                </TableCell>
                                <TableCell align="left">
                                    <Chip
                                        label={staff.role}
                                        sx={{
                                            backgroundColor: staff.role === 'ADMIN' ? 'red' : 'blue',
                                            color: 'white',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    {staff.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalRecords}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>








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
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Create Account
                    </Typography>
                    <Box component="form" onSubmit={handleCreateCounter} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            value={updateUser.name}
                            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            size="small"
                            value={updateUser.pass}
                            onChange={(e) => setUpdateUser({ ...updateUser, pass: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            size="small"
                            value={updateUser.email}
                            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                            fullWidth
                        />
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value={updateUser.role}

                                onChange={(e) => setUpdateUser({ ...updateUser, role: e.target.value })}
                                label="Role">
                                <MenuItem value="Staff">Staff</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button type="submit" variant="contained" size="medium" >
                                Create
                            </Button>
                        </Box>
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
                            label={
                                selectedStaffId?.role === 'ADMIN'
                                    ? 'Admin'
                                    : selectedStaffId?.role === 'MANAGER' || selectedStaffId?.role === 'Manager'
                                        ? 'Manager'
                                        : 'Staff'
                            }
                            sx={{
                                backgroundColor: selectedStaffId?.role === 'ADMIN' ? 'red' : 'blue',
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
                                name="name"
                                label="Full name"
                                variant="outlined"

                                 onChange={(event, value) => setUpdateUserName(event.target.value)}
                                error={!isNameValid}
                                helperText={!isNameValid ? 'Name must have more than 5 characters' : ''}
                            />
                            <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone number"
                                disabled={true}
                                value={'None for now'}
                                variant="outlined"
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

                                onChange={(event, value) => setUpdateUserEmail(event.target.value)}
                                error={!isEmailValid}
                                helperText={!isEmailValid ? 'Invalid email' : ''}
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="New Password"
                                variant="outlined"
                                type="password"

                                onChange={(event, value) => setUpdatePassword(event.target.value)}
                                error={!isPasswordValid}
                                helperText={!isPasswordValid ? 'Password must have more than 5 characters' : ''}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', gap: 1 }}>
                            <Button variant="outlined" onClick={handleCloseModalForStaff}>Close</Button>
                            <Button variant="contained" type="submit"  onClick={() => handleUpdateUser()}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

        </Box>
    );
}

export default AdAccount;
