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
                const response = await fetch('https://4f3ytt78l9.execute-api.us-east-1.amazonaws.com/power-rankings');
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
            <h2>Sortable Table</h2>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => sortData('teamName')}>
                                Team name{getSortIcon('teamName')}
                            </th>
                            <th onClick={() => sortData('wins')}>
                                Wins{getSortIcon('wins')}
                            </th>
                            <th onClick={() => sortData('points')}>
                                Points{getSortIcon('points')}
                            </th>
                            <th onClick={() => sortData('h2h')}>
                                H2H{getSortIcon('h2h')}
                            </th>
                            <th onClick={() => sortData('total')}>
                                Total{getSortIcon('total')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.teamName}</td>
                                <td>{item.wins}</td>
                                <td>{item.points}</td>
                                <td>{item.h2h}</td>
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
