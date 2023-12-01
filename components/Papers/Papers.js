import PapersList from '../PapersList/PapersList';
import PaperSearchQuery from '../PaperSearchQuery/PaperSearchQuery';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// console.clear();
export default function Papers ({authorName}) {
    const {data:session} = useSession();

    let initialAuthor = null;
    if (authorName) {
      initialAuthor = {author:authorName}
    }
    const router = useRouter()
    const [authorToFetch,setAuthorToFetch] = useState(initialAuthor)
    function handleSearchByAuthorSubmit(searchedAuthor) {
        setAuthorToFetch(searchedAuthor)
    }
    function handleNewSearch() {
        setAuthorToFetch(null)
        router.push('/create-profile')
    }
    console.log('authorToFetch',authorToFetch);
    console.log('authorToFetch',authorName);

    // let isSaved = false
    const [isPaperSaved, setIsPaperSaved] = useState(false);
    async function addPapers(papers) {
   

            const response = await fetch('api/create-profile', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(papers)
        })
        if (response.ok) {
            setIsPaperSaved(true)
            router.push(`/${session.user.name}`)
        }
    }

    return (
        <>
        {isPaperSaved ? <div> saved to db </div>: <div>not saved</div>}
        {!authorToFetch && <PaperSearchQuery onSearch={handleSearchByAuthorSubmit}/>} 
        {!authorToFetch ?<div>Search to find your papers!</div> :
        <PapersList authorToFetch={authorToFetch} handleNewSearch={handleNewSearch} addPapers={addPapers} />}
        </>
    );
};