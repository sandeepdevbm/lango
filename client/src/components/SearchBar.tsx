import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import authAPI from '../API/authAPI'
import { useNavigate } from 'react-router-dom';

interface SearchResult {
    label: string;
    value: string;
}

interface LanType {
    language: string;
}

const SearchBar: React.FC = () => {

    const navigate = useNavigate()
    const { languages, getMentorDetails } = authAPI();




    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);


    const handleSearchChange = async (event: React.ChangeEvent<{}>, value: string) => {
        setSearchValue(value);
        try {
            let language = await languages()
            console.log(language.lang);
            let lan = language.lang

            const sug: SearchResult[] = await lan.map((element: LanType) => ({
                label: element.language,
                value: element.language
            }));

            // Filter suggestions based on the entered value
            const filteredSuggestions = sug.filter((sug) =>
                sug.label.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredSuggestions);
            

        } catch (err) {

        }
    };

    const handleSearchSelect = async (event: React.ChangeEvent<{}>, value: SearchResult | null) => {
            if (value) {
                // console.log(value.value);  
                // let response = await getMentorDetails(value.value)
                navigate(`/language/${value.value}`);
            }
            try{
                
            }catch(err){

            }
        
    }

    

    return (
        <Autocomplete
            options={searchResults}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
                <TextField
                    sx={{ background: 'white', borderRadius: '.5rem', width: '20rem' }}
                    {...params}
                    label="Search for your language"
                    variant="filled"
                    margin="normal"
                    value={searchValue}
                    onChange={(event) => handleSearchChange(event, event.target.value)}
                />
            )}
            onChange={handleSearchSelect}
        //   onChange={(event, value) => {
        //     if (value) {
        //       navigate(`/language/${value.value}`);
        //     }
        //   }}
        />
    );
};

export default SearchBar;
