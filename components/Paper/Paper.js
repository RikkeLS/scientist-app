import useSWR from "swr"
import SelectButton from "../SelectButton/SelectButton"
import Link from "next/link"
import { useRouter } from "next/router";
import StyledPaperListItem from "../StyledPaperListItem/StyledPaperListItem";

export default function Paper({paper,isSelectedInfo, isAddPapers, handleSelectPaperToggle}) {
    const router = useRouter();
    const currentPageOwner = router.query.userName;
    //--ids of highlights if it exists:
    const { data:highlights, isLoading, error} = useSWR(`/api/${currentPageOwner}/highlights`)
    if (isLoading) return (<div>Loading...</div>)
    if (error) return (<div>Error! {error.message}</div>)
    const highlightIDs = highlights.filter(highlight => (
        highlight.paperID===paper._id
    ))

    //--format authors:
    const formattedAuthors = paper.authors.map((author,index)=> {
        if (paper.authors.length===1) {
            return author
        }
        if (index === paper.authors.length-2) {
            return author
        }
        if (index !== paper.authors.length-1) {
            return author+','
        }
        if (index === paper.authors.length-1) {
            return '& '+author
        }
    })

    return (
    <StyledPaperListItem key={paper.id} forSelection={isAddPapers}>
        {isSelectedInfo !== undefined && <SelectButton isSelectedInfo={isSelectedInfo} paperID={paper.id} handleSelectPaperToggle={handleSelectPaperToggle}/>}
        
        <h3 className="paper_title">{paper.title}</h3>
        <ul className='paper_authorsList'>
        {formattedAuthors.map((author) => <li className='paper_author' key={author}>{author}</li>)}
        </ul>
        <p className='paper_abstract'>{paper.summary}</p>
        <ul className="paper_links" >
        {paper.links.map(link => (<li className="paper_liLink" key={link.href}>
            <Link className="paper_link" href={link.href}>{link.title ? link.title : link.type}</Link>
            </li>))}
        </ul>
         {highlightIDs.length > 0 && 
         <>
         <h4 className="paper_highlightTitle">See details</h4> 
         <ul className="paper_highlightList" >{
            highlightIDs.map(highlight=> <li className="paper_highlight" key={highlight._id}>
                {highlight._id}
            </li>)}
            </ul>
         </>
         }

        <p className="paper_published">Published: {paper.published}</p>
        <p className="paper_updated">Updated: {paper.updated}</p>
        {/* <ul className="paper_categories">
            <li>
            {paper.categories[0].scheme}
            </li>
            <li>
            {paper.categories[0].term}
            </li>
        </ul> */}
    </StyledPaperListItem>)
                
}
