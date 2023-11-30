import PapersList from '../../components/PapersList/PapersList';
import PaperSearchQuery from '../../components/PaperSearchQuery/PaperSearchQuery';
import { useState } from 'react';
import { useRouter } from 'next/router';

console.clear();
export default function papersPage () {
    const router = useRouter()
    const [authorToFetch,setAuthorToFetch] = useState()
    function handleSearchByAuthorSubmit(searchedAuthor) {
        setAuthorToFetch(searchedAuthor)
    }
    function handleNewSearch() {
        setAuthorToFetch(null)
        router.push('/papers')
    }

    // let isSaved = false
    const [isPaperSaved, setIsPaperSaved] = useState(false);
    async function addPapers(papers) {
   
        // const paper = {id:papers[0].id,title:papers[0].title}
        // console.log('paper to post',paper);
        const response = await fetch('api/papers', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(papers)
        })
        if (response.ok) {
            setIsPaperSaved(true)
            router.push('/papers')
        }
    }

    return (
        <>
        {isPaperSaved ? <div> saved to db </div>: <div>not saved</div>}
        <PaperSearchQuery onSearch={handleSearchByAuthorSubmit}/>
        {!authorToFetch ?<div>Search to find your papers!</div> :
        <PapersList authorToFetch={authorToFetch} handleNewSearch={handleNewSearch} addPapers={addPapers} />}
        </>
    );
};

