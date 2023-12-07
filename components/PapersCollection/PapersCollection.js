import Paper from "../Paper/Paper";
import { useRouter } from "next/router";
import useSWR from 'swr';

export default function PapersCollection () {
    const router = useRouter()
    const currentPageOwner = router.query.userName

    const { data:papers, isLoading, error } = useSWR(`/api/${currentPageOwner}/papers`)

    if (isLoading) return (<div> Loading papers... </div>)
    if (error) return ( <div>Error! {error.message}</div>)

    return (
        <>
            <h2 className="papersTitle" >Papers on arXiv:</h2>
            <ul className='paperOverviewList'>
                {papers.map(paper => 
                 <Paper key={paper._id} paper={paper}/> )}
            </ul>
        </>
    )
}

