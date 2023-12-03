import useSWR from "swr";
import Link from "next/link";


export default  function PapersField ({userName}) {
    const { data:papers, isLoading, error } = useSWR(`/api/${userName}/papers`)

    if (isLoading) return (
        <> 
        <h2 className="papersFieldTitle" >Papers</h2>
        <h4>Loading papers ...</h4>
        </>  
    )
    if (error) return (
        <> 
        <h2 className="papersFieldTitle" >Papers</h2>
        <h4>Error! {error.message}</h4>
        </> 
    )
    return (
    <>
        <h2 className="papersFieldTitle" >Papers</h2>
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