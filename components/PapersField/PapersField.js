import useSWR from "swr";
import Link from "next/link";


export default  function PapersField ({papers,isLoadingPapers,errorPapers}) {
    // const { data:papers, isLoading, error } = useSWR(`/api/${userName}/papers`)

    if (isLoadingPapers) return (
        <> 
        <h2 className="papersTitle" >Papers on arXiv:</h2>
        <h4>Loading papers ...</h4>
        </>  
    )
    if (errorPapers) return (
        <> 
        <h2 className="papersTitle" >Papers on arXiv:</h2>
        <h4>Error! {errorPapers.message}</h4>
        </> 
    )
    if (!papers) return (
        <> 
        <h2 className="papersTitle" >Papers on arXiv:</h2>
        <h4>This profile has not selected any papers yet</h4>
        </> 
    )
    return (
        <>
        <h2 className="papersTitle" >Papers on arXiv:</h2>
        <ul className='paperOverviewList'>
        {
            papers.map(paper => 
        <li key={paper.id}> 
        <h3>{paper.title}</h3>
        <ul>
        {paper.authors.map(author=> (<li key={author}>{author}</li>))}
        </ul>
        <Link href={paper.id}>ArXiv</Link> 
        </li>
        )
        }
     </ul>
     </>

    )
            

}