import React, { useState, useEffect } from 'react';

export const useViewportWidth = () => {
    const windowWidth = typeof window !== `undefined` ? window.innerWidth : 0;
    const [viewportWidth, setViewportWidth] = useState(windowWidth);

    const updateViewportWidth = () => {
        setViewportWidth(windowWidth);
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
