import useSWR from "swr"
import SelectButton from "../SelectButton/SelectButton"
import Link from "next/link"
import { useRouter } from "next/router";

export default function Paper({paper,isSelectedInfo, handleSelectPaperToggle}) {
    const router = useRouter();
    const currentPageOwner = router.query.userName;
    //--ids of highlights if it exists:
    const { data:highlights, isLoading, error} = useSWR(`/api/${currentPageOwner}/highlights`)
    if (isLoading) return (<div>Loading...</div>)
    if (error) return (<div>Error! {error.message}</div>)

    const highlightIDs = highlights.filter(highlight => (
        highlight.paperID===paper._id
    ))
    console.log('highlightIDs',highlightIDs);
    console.log('highlights',highlights);
    return (
    <li key={paper.id}> 
        {isSelectedInfo !== undefined && <SelectButton isSelectedInfo={isSelectedInfo} paperID={paper.id} handleSelectPaperToggle={handleSelectPaperToggle}/>}
        
        <h3>{paper.title}</h3>
        <ul>
        {paper.authors.map(author=> (<li key={author}>{author}</li>))}
        </ul>
        <p>Summary: {paper.summary}</p>
        <ul className="paper_links" >
        {paper.links.map(link => (<li key={link.href}>
            <Link href={link.href}>{link.title ? link.title : link.type}</Link>
            </li>))}
        </ul>
         {highlightIDs.length > 0 && 
         <>
         <h4>See details</h4> 
         <ul>{
            highlightIDs.map(highlight=> <li key={highlight._id}>
                {highlight._id}
            </li>)}
            </ul>
         </>
         }

        <p>Published: {paper.published}</p>
        <p>Updated: {paper.updated}</p>
        {/* <ul className="paper_categories">
            <li>
            {paper.categories[0].scheme}
            </li>
            <li>
            {paper.categories[0].term}
            </li>
        </ul> */}
    </li>)
                
}
