'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css'; // Assuming you have a CSS module for styles

const initialItemPrices = {
    guruch: 34000,
    gosht: 100000,
    dumba: 100000,
    sabzi: 8000,
    yog: 25000,
    magiz: 80000,
    nohot: 50000,
    piyoz: 5000,
    tuz: 5000,
    zira: 25000,
    muruch: 25000
};

const Page = () => {
    const [weights, setWeights] = useState(Object.fromEntries(Object.keys(initialItemPrices).map(item => [item, ''])));
    const [prices, setPrices] = useState(initialItemPrices);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calculate total price of all items
        const total = Object.keys(prices).reduce((acc, key) => {
            return acc + (weights[key] * prices[key]);
        }, 0);
        setTotalPrice(total);
    }, [weights, prices]);

    // Format price with thousands separator and two decimal places
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    const handleWeightChange = (e, item) => {
        const newWeight = parseInt(e.target.value) || 0; // Convert input value to integer, default to 0 if invalid
        setWeights({
            ...weights,
            [item]: newWeight
        });
    };

    const handlePriceChange = (e, item) => {
        const newPrice = parseInt(e.target.value) || 0; // Convert input value to integer, default to 0 if invalid
        setPrices({
            ...prices,
            [item]: newPrice
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Item Prices Calculator</h1>
            <div className={styles.itemsContainer}>
                {
                    Object.entries(initialItemPrices).map(([key, defaultPrice]) => (
                        <div key={key} className={styles.item}>
                            <p className={styles.itemName}>{key}</p>
                            <input
                                type="number"
                                className={styles.input}
                                value={weights[key]}
                                onChange={(e) => handleWeightChange(e, key)}
                            />
                            <input
                                type="number"
                                defaultValue={defaultPrice}
                                className={styles.input}
                                onChange={(e) => handlePriceChange(e, key)}
                            />
                            <p className={styles.totalPrice}>Total Price: {formatPrice(weights[key] * prices[key])}</p>
                        </div>
                    ))
                }
            </div>
            <div className={styles.totalContainer}>
                <h2 className={styles.totalHeading}>Total Price of All Items</h2>
                <p className={styles.totalPriceAll}>Total: {formatPrice(totalPrice)}</p>
            </div>
        </div>
    );
};

export default Page;
