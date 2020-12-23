import React, { useEffect, useState } from 'react';

export const useShowSocialShare = () => {
    const [showSocialShare, setShowSocialShare] = useState(false);

    useEffect(() => {
        const myScrollFunc = () => {
            const y = window.scrollY;
            if (y >= 800) {
                setShowSocialShare(true);
            } else {
                setShowSocialShare(false);
            }
        };

        window.addEventListener("scroll", myScrollFunc);

        return () => {
            window.removeEventListener("scroll", myScrollFunc);
        }
    }, []);

    return {
        showSocialShare, setShowSocialShare,
    }
}
