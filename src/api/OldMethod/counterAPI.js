const getCounterData = async () => {
    try {
        const response = await fetch(`http://localhost:5036/api/v1/counter-without-paging`);
        if (!response.ok) {
            throw new Error('Failed to fetch counter data');
        }

        const data = await response.json();
        const counterList = data.map((counter) => ({
            id: counter.id,
            name: counter.name,
            income: counter.income,
            status: counter.status
        }));

        return counterList;
    } catch (error) {
        console.error('Error fetching counter data:', error);
        throw error;
    }
};

export default getCounterData;



