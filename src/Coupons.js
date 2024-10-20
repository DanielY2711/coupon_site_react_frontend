import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Coupons.css';
import {BASE} from './config';

const fetchData = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    let data = null 
    console.log("Using token", token)
    try {
        const response = await fetch(`${BASE}/coupondata/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },            
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        data = await response.json(); // Parse the JSON from the response
        console.log('Data retrieved:', data); // Handle the retrieved data as needed
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    return data;
};




const Coupons = () => {
    const [coupons, setCoupons] = useState(null);  // Use state to store the coupons

    // Simulate fetching data
    useEffect(() => {
        const fetchCoupons = async () => {
            const fetchedCoupons = await fetchData();  // Wait for the data
            setCoupons(fetchedCoupons);  // Update the state
        };
        fetchCoupons();
    }, []);

    const handleUseCoupon = async (couponId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE}/use/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: couponId }) // Send coupon ID
            });
    
            if (!response.ok) {
                throw new Error('Failed to use coupon: ' + response.statusText);
            }
    
            // Decrement the coupon count in state
            setCoupons((prevCoupons) =>
                prevCoupons.map(coupon =>
                    coupon.coupon_name === couponId ? { ...coupon, coupon_count: coupon.coupon_count - 1 } : coupon
                )
            );
        } catch (error) {
            console.error('Error using coupon:', error);
        }
    };


    if (coupons === null) {
        return (
            <div>You either have no coupons or you aren't logged in</div>
        );
    }

    return (
        <>
            <h2>Bonnie's Coupons</h2>
            <div className="coupon-grid">
                {coupons.map((coupon, index) => (
                    <div className="coupon-card" key={index}>
                        <h3>{coupon.coupon_name}</h3>
                        <p>Count: {coupon.coupon_count}</p>
                        <button onClick={() => handleUseCoupon(coupon.coupon_name)}>Use Coupon</button>
                    </div>
                ))}
            </div>
        </>
    );
};
export default Coupons;