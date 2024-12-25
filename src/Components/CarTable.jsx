import React, { useEffect, useState } from 'react';

const CarTable = () => {


    const [cars, setCars] = useState([])

    useEffect(() => {
        fetch('https://assignment-test-11-server.vercel.app/cars')
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])

    return (
        <div className="p-4 overflow-x-auto">
            {
                cars.map(car => <div key={car._id}>
                    <img
                        src={car.images?.[0]?.path || 'https://via.placeholder.com/150'}
                        alt={car.carModel || 'Car image'}
                        className="w-16 h-16 object-cover rounded"
                    />
                </div>)
            }
        </div>
    );
};

export default CarTable;
