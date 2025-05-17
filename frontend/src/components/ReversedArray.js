import React, { useState } from 'react';

const ReversedArray = () => {
    const [orgArray, SetorgArray] = useState([1, 2, 3, 4, 5, 6]);
    const [reversedArray, SetreversedArray] = useState([]);

    const handleReverse = () => {
        const reversed = [...orgArray].reverse();
        SetreversedArray(reversed);
    }


    return (
        <div>
            <h2>Original Array:</h2>
            <h4>{orgArray.join(' , ')}</h4>

            <button onClick={handleReverse}>Reverse Array</button>

            <h2>Reversed Array</h2>
            <h4>{reversedArray.join(', ')}</h4>
        </div>
    );
}

export default ReversedArray;