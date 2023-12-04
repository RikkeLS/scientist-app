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
        const allNames = authorName.split(' ')
        const lastName = allNames[allNames?.length-1]
        initialAuthor = {author:lastName}
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


    const [isPaperSaved, setIsPaperSaved] = useState(false);

    async function addSelectedPapers(papers,isSelectedInfo) {
        const selectedPaperIds = isSelectedInfo.map(info => info.isSelected && info.paperID )
        let selectedPapers = papers.filter(paper => {
            return selectedPaperIds.includes(paper.id)
        })
        //-- change structure of authors:
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

            let timeout;
            function MyTimeOut() {
                timeout = setTimeout(changeRoute,2000)
            }

            function changeRoute() {
                router.push(`/${session.user.name}`)
            }
            MyTimeOut()
            
        }
    }

    return (
        <>
        {isPaperSaved ? <div> saved to db </div>: <div>not saved</div>}
        {!authorToFetch && <PaperSearchQuery onSearch={handleSearchByAuthorSubmit}/>} 
        {!authorToFetch ?<p>Search to find your papers!</p> :
        <PapersList authorToFetch={authorToFetch} handleNewSearch={handleNewSearch} addSelectedPapers={addSelectedPapers} isPaperSaved={isPaperSaved}/>}
        </>
    );
};