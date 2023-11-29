import PapersList from '../../components/PapersList/PapersList';
import PaperSearchQuery from '../../components/PaperSearchQuery/PaperSearchQuery';
import { useState } from 'react';
console.clear();
export default function PublicationsPage () {
    const [fetchByAuthor,setFetchByAuthor] = useState()
    function handleSearchByAuthorSubmit(searchedAuthor) {
        console.log('data from PaperSearchQuery?',searchedAuthor);
        setFetchByAuthor(searchedAuthor)
    }
    
    return (
        <>
        <PaperSearchQuery onSearch={handleSearchByAuthorSubmit}/>
        {!fetchByAuthor ?<div>Search to find your papers!</div> :
        <PapersList fetchByAuthor={fetchByAuthor}/>}
        
        </>
    );
};

