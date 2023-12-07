import { useSession } from "next-auth/react";
import Paper from "../Paper/Paper";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { useState } from "react";
import PaperSearchQuery from "../PaperSearchQuery/PaperSearchQuery";
import SelectPapers from "../SelectPapers/SelectPapers"

export default function PapersCollection () {
    const router = useRouter()
    const currentPageOwner = router.query.userName
    const {data:session} = useSession()
    const [isAddPapers,setIsAddPapers] = useState(false)
    const [authorToFetch,setAuthorToFetch] = useState()
    const [isPaperSaved, setIsPaperSaved] = useState(false);
    const [numberOfSaves,setNumberOfSaves]=useState(0);

    function handleSearchByAuthorSubmit(searchedAuthor) {
        setAuthorToFetch(searchedAuthor)
    }

    //--get papers in DB:
    const { data:papers, isLoading, error,mutate } = useSWR(`/api/${currentPageOwner}/papers`)
    if (isLoading) return (<div> Loading papers... </div>)
    if (error) return ( <div>Error! {error.message}</div>)

    function handleNewSearch() {
        setAuthorToFetch(null)
        router.push('/${currentPageOwner}/papers')
    }
    async function addSelectedPapers(newPapers,isSelectedInfo) {
        const selectedPaperIds = isSelectedInfo.map(info => info.isSelected && info.paperID )
        let selectedPapers = newPapers.filter(paper => {
            return selectedPaperIds.includes(paper.id)
        })
        //-- change structure of authors:
        const selectedPapersForDB = selectedPapers.map(paper =>
           ({...paper,authors:paper['authors'].flat(1)})
        )
        const response = await fetch('/api/create-profile-papers', {
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
                timeout = setTimeout(2000)
            }
            MyTimeOut()
            mutate()
            setNumberOfSaves(numberOfSaves+1);
            setAuthorToFetch(null)


        }
    }
    let addButtonText = 'Add papers'
    if (numberOfSaves === 1) {
        addButtonText='Add more papers'
    } 
    if (numberOfSaves > 1) {
        addButtonText='Add even more papers!'
    }
    console.log('numberOfSaves',numberOfSaves);
    
    return (
        <>
            {!authorToFetch ?<p>Search to find your papers!</p> :
            <SelectPapers authorToFetch={authorToFetch} handleNewSearch={handleNewSearch} 
             addSelectedPapers={addSelectedPapers} isPaperSaved={isPaperSaved}/>
            }
            <h2 className="papersTitle" >Papers on arXiv:</h2>
            {session?.user.name===currentPageOwner && 
            <button onClick={()=>setIsAddPapers(true)} >{addButtonText}</button>
            }
            {isAddPapers && <PaperSearchQuery onSearch={handleSearchByAuthorSubmit}/>}
            <ul className='paperOverviewList'>
                {papers.reverse().map(paper => 
                 <Paper key={paper._id} paper={paper}/> )}
            </ul>

        </>
    )
}


