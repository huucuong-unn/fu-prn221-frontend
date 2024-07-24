const getStaffData = async (page = 1, size = 10) => {
    try {
        const response = await fetch(
            `http://localhost:5036/api/v1/staff?page=${page}&size=${size}`,
        );
        if (!response.ok) {
            throw new Error('Failed to fetch staff data');
        }

        const data = await response.json();
        const staffList = data.listResult.map((staff) => ({
            id: staff.id,
            name: staff.name,
            email: staff.email,
            role: staff.role,
            income: staff.income,
            createdDate: new Date(staff.createdDate).toLocaleDateString(),
            updatedDate: new Date(staff.updatedDate).toLocaleDateString(),
            createBy: staff.createBy,
            updateBy: staff.updateBy,
            status: staff.status,
        }));

        return {
            staffList: staffList,
            totalPages: data.totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching staff data:', error);
        throw error;
    }
};

export default getStaffData;


