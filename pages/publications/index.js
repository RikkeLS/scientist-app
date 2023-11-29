import PapersList from '../../components/PapersList/PapersList';
import PaperSearchQuery from '../../components/PaperSearchQuery/PaperSearchQuery';
import { useState } from 'react';
import { useRouter } from 'next/router';

console.clear();
export default function PublicationsPage () {
    const router = useRouter()
    const [authorToFetch,setAuthorToFetch] = useState()
    function handleSearchByAuthorSubmit(searchedAuthor) {
        setAuthorToFetch(searchedAuthor)
    }
    function handleNewSearch() {
        setAuthorToFetch(null)
        router.push('/publications')
    }


    return (
        <>
        <PaperSearchQuery onSearch={handleSearchByAuthorSubmit}/>
        {!authorToFetch ?<div>Search to find your papers!</div> :
        <PapersList authorToFetch={authorToFetch} handleNewSearch={handleNewSearch}/>}
        
        </>
    );
};

