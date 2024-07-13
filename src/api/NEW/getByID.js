export const getCounterById = async (counterId) => {
    try {
        const response = await fetch(`http://localhost:5036/api/v1/counter/${counterId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch counter data');
        }
        const counterData = await response.json();
        return counterData;
    } catch (error) {
        console.error('Error fetching counter data:', error);
        throw error;
    }
};

export const getStaffById = async (staffId) => {
    try {
        const response = await fetch(`http://localhost:5036/api/v1/user/${staffId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch staff data');
        }
        const staffData = await response.json();
        return staffData;
    } catch (error) {
        console.error('Error fetching staff data:', error);
        throw error;
    }
};