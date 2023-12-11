import useSWR from "swr";
import Link from "next/link";


export default  function PapersField ({papers,isLoadingPapers,errorPapers}) {

    if (isLoadingPapers) return (
        <> 
        <h2 className="papersField-title" >Papers on arXiv:</h2>
        <h4>Loading papers ...</h4>
        </>  
    )
    if (errorPapers) return (
        <> 
        <h2 className="papersField-title" >Papers on arXiv:</h2>
        <h4>Error! {errorPapers.message}</h4>
        </> 
    )
    if (!papers) return (
        <> 
        <h2 className="papersField-title" >Papers on arXiv:</h2>
        <h4>This profile has not selected any papers yet</h4>
        </> 
    )
    return (
        <>
        <h2 className="papersField-title" >Papers on arXiv:</h2>
        <ul className='papersField-OverviewList'>
        {
            papers.map((paper,index) => 
        <li key={paper.id} className={`papersFieldpaper paper${index%4} ${index===0 && 'firstPaperInList'}`}> 
        <h3 >{paper.title}</h3>
        <ul className="papersField-authorsList">
        {paper.authors.map((author)=> (<li key={author} >{author}</li>))}
        </ul>
        <Link className={"papersField-arXivLink paperLink"+index%4} href={paper.id}>on ArXiv</Link> 
        </li>
        )
        }
     </ul>
     </>

    )
            

}