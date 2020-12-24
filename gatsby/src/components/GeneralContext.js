import React, { useState } from 'react';

const GeneralContext = React.createContext();

export function GeneralProvider({ children }) {
    const [search, setSearch] = useState('');
    const [openLeftPanel, setOpenLeftPanel] = useState(false);
    const [searchSection, setSearchSection] = useState('');
    return (
        <GeneralContext.Provider value={[ search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection ]}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralContext;