import { useState } from 'react';
import {Typography,CssBaseline,} from '@material-ui/core';
import SideBar from "../components/SideBar";
import SearchBar from "material-ui-search-bar";


function HomePage() {
    
    const [clubsearch, setClubSearch] = useState('');

    return(
        <div className="homepage">
            <SideBar/>
            <div className="clubsearch">
                <SearchBar
                    value={clubsearch}
                    onChange={(newValue) => setClubSearch(() => {return newValue;})}
                    onRequestSearch={() => {}}
                />
            </div>
            <div className="main" style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                <CssBaseline />
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                    &#x2663; Club Book &#x1F4DA;
                </Typography>
            </div>
        </div>
    );
};

export default HomePage;