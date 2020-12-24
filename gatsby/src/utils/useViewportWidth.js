import React, { useState, useEffect } from 'react';

export const useViewportWidth = () => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    const updateViewportWidth = () => {
        setViewportWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', updateViewportWidth);
        return () => {
            window.removeEventListener('resize', updateViewportWidth);
        }
    }, []);

    return {
        viewportWidth,
    }
}
