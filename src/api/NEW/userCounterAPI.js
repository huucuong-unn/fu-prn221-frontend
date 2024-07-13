const getUserCounterData = async (page = 1, size = 5) => {
    try {
        const response = await fetch(
            `http://localhost:5036/api/v1/user-counter?page=${page}&size=${size}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch user counters');
        }

        const data = await response.json();
        const userCounters = data.listResult.map((userCounter) => ({
            staffId: userCounter.staffId,
            counterId: userCounter.counterId,
            status: userCounter.status,
            // Add other fields as needed
        }));

        return {
            userCounters: userCounters,
            totalPages: data.totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching user counters:', error);
        throw error;
    }
};

export default getUserCounterData;
