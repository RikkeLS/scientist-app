import { useSession } from "next-auth/react";
import Paper from "../Paper/Paper";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { useState } from "react";
import PaperSearchQuery from "../PaperSearchQuery/PaperSearchQuery";
import SelectPapers from "../SelectPapers/SelectPapers"
import StyledButton from "../StyledButton/StyledButton";

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
    }
    async function handleDeletePaper(paperID) {
        const response = await fetch(`/api/${currentPageOwner}/papers`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(paperID)
        },
        )
        if (response.ok) {
            mutate()
        }
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
                timeout = setTimeout(afterTimeOut,2000)
            }
            MyTimeOut()
            function afterTimeOut() {

            }
            setNumberOfSaves(numberOfSaves+1);
            setAuthorToFetch(null)
            setIsAddPapers(false)
            setIsPaperSaved(false)
            mutate()
        }
    }
    let addButtonText = 'Add papers'
    if (numberOfSaves === 1) {
        addButtonText='Add more papers'
    } 
    if (numberOfSaves > 1) {
        addButtonText='Add even more papers!'
    }
    //---sort by created date/time---
    const papersSorted = papers.sort((a,b)=> 
    //get a number/integer for all the createdAt dates by removing non-digits(/\D/g ):
        b.createdAt.replace(/\D/g, '')-a.createdAt.replace(/\D/g, '')
    )
    return (
        <>
            {!authorToFetch ? '' :
            <SelectPapers authorToFetch={authorToFetch} handleNewSearch={handleNewSearch} 
             addSelectedPapers={addSelectedPapers} isPaperSaved={isPaperSaved} isAddPapers={isAddPapers}/>
            }
            <h2 className="papersList-title" >Papers on arXiv:</h2>
            {session?.user.name===currentPageOwner && 
            <StyledButton onClick={()=>setIsAddPapers(true)} > {addButtonText} </StyledButton>
            }
            {isAddPapers && <PaperSearchQuery onSearch={handleSearchByAuthorSubmit}/>}
            <ul className='paperOverviewList'>
                {papersSorted.map(paper => 
                 <Paper key={paper._id} paper={paper}
                    handleDeletePaper={handleDeletePaper}
                 /> )}
            </ul>

        </>
    )
}


