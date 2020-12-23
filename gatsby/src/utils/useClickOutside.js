import React, { useEffect, useState } from 'react'

export const useClickOutside = (ref) => {
    const [clickedOutside, setClickedOutside] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setClickedOutside(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return {
        clickedOutside, setClickedOutside,
    }
}