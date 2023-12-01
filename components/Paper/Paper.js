import SelectButton from "../SelectButton/SelectButton"
import Link from "next/link"

export default function Paper({paper,isSelectedInfo, handleSelectPaperToggle}) {
    return (
    <li key={paper.id}> 
        <SelectButton isSelectedInfo={isSelectedInfo} paperID={paper.id} handleSelectPaperToggle={handleSelectPaperToggle}/>
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
        <p>Published: {paper.published}</p>
        <p>Updated: {paper.updated}</p>
        <ul className="paper_categories">
            <li>
            {paper.categories[0].scheme}
            </li>
            <li>
            {paper.categories[0].term}
            </li>
        </ul>
    </li>)
                
}
