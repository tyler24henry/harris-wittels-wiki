import React, { useState } from 'react';

const GeneralContext = React.createContext();

export function GeneralProvider({ children }) {
    const [search, setSearch] = useState('');
    const [openLeftPanel, setOpenLeftPanel] = useState(false);
    return (
        <GeneralContext.Provider value={[ search, setSearch, openLeftPanel, setOpenLeftPanel ]}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralContext;