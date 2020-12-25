import React, { useState, useEffect } from 'react';
import { getIsChrome } from './detectBrowser';

export const useIsChrome = () => {
    const [isChrome, setIsChrome] = useState(null);

    useEffect(() => {
        if(typeof window !== `undefined` && typeof navigator !== `undefined`){
            const isChromeBrowser = getIsChrome() !== 2;
            setIsChrome(isChromeBrowser);
        }
    }, []);
    return {
        isChrome,
    }
}
