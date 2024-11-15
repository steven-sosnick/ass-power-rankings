// src/SortableTable.js
import React, { useEffect, useState } from 'react';

const SortableTable = () => {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'total', direction: 'descending' });
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/power-rankings');
                const result = await response.json();

                // Sort the data by "total" in descending order initially
                const sortedData = result.sort((a, b) => b.total - a.total);
                setData(sortedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Sorting function
    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key !== key) {
            direction = key === 'total' ? 'descending' : 'ascending';
        }

        setSortConfig({ key, direction });

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
    };

    // Helper function to render sort icons
    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
        }
        return '';
    };

    return (
        <div>
            <h2>Power Rankings</h2>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => sortData('displayName')}>
                                Team name{getSortIcon('displayName')}
                            </th>
                            <th onClick={() => sortData('winPoints')}>
                                Wins{getSortIcon('winPoints')}
                            </th>
                            <th onClick={() => sortData('pointsPoints')}>
                                Points{getSortIcon('pointsPoints')}
                            </th>
                            <th onClick={() => sortData('h2hPoints')}>
                                H2H{getSortIcon('h2hPoints')}
                            </th>
                            <th onClick={() => sortData('total')}>
                                Total{getSortIcon('total')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.displayName}</td>
                                <td>{item.winPoints} ({item.rawWins})</td>
                                <td>{item.pointsPoints} ({item.rawPoints})</td>
                                <td>{item.h2hPoints} ({item.rawH2H})</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SortableTable;
