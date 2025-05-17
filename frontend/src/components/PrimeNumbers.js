import React, { useCallback, useMemo, useState } from "react";

const CheckPrime = (num) => {
    console.log(num);

    if (num <= 1) return false;
    if (num === 2) return true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }

    return true;

}

const PrimeNumberCheck = () => {

    const [input, setInput] = useState('');
    const [number, SetNumber] = useState(null);

    const reslut = useMemo(() => {
        if (number === null) return null;
        return CheckPrime(number);
    }, [number]);

    const handleCheck = useCallback(() => {
        const parsed = parseInt(input, 10);
        console.log("parsed is" + parsed);
        if (!isNaN(parsed)) {
            SetNumber(parsed);
        }
    }, [input]);

    return (
        <div>
            <h3>Prime Number check ? </h3>
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} placeholder="please enter a number to check prime or not?" />
            <button onClick={handleCheck}>Check Prime</button>

            <p>{number} is {reslut} is Prime Number </p>
        </div>
    );
}


export default PrimeNumberCheck;