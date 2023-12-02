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

    // let isSaved = false
    const [isPaperSaved, setIsPaperSaved] = useState(false);
    async function addSelectedPapers(papers,isSelectedInfo) {
        const selectedPaperIds = isSelectedInfo.map(info => info.isSelected && info.paperID )
        let selectedPapers = papers.filter(paper => {
            return selectedPaperIds.includes(paper.id)
        })
        //-- change structure of authors:
        console.log('selectedPapers',selectedPapers[0].authors);
        const selectedPapersForDB = selectedPapers.map(paper =>
           ({...paper,authors:paper['authors'].flat(1)})
        )
        const response = await fetch('api/create-profile-papers', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify([selectedPapersForDB,session.user.name])
        })
        if (response.ok) {
            setIsPaperSaved(true)
            // router.push(`/${session.user.name}`)
        }
    }

    return (
        <>
        {isPaperSaved ? <div> saved to db </div>: <div>not saved</div>}
        {!authorToFetch && <PaperSearchQuery onSearch={handleSearchByAuthorSubmit}/>} 
        {!authorToFetch ?<div>Search to find your papers!</div> :
        <PapersList authorToFetch={authorToFetch} handleNewSearch={handleNewSearch} addSelectedPapers={addSelectedPapers} />}
        </>
    );
};