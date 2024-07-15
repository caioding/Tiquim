import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import campaigns from '../mocks/campaigns';

export default function Grouped() {
    // Extrai categorias únicas das campanhas
    const uniqueCategories = [...new Set(campaigns.map(campaign => campaign.category))].map(category => {
        const firstLetter = category[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            title: category, // Se tirar some os nomes da categoria
        };
    });

    return (
        <Autocomplete
            id="grouped-demo"
            options={uniqueCategories.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            sx={{ width: 420 }}
            renderInput={(params) => (
                <TextField {...params} label="" margin='normal'
                />
        )}
        />
    );
}