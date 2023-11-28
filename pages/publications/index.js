import { papers } from "../../lib/mockPapers";
import PapersList from '../../components/PapersList/PapersList';
import Link from "next/link";

console.clear();
export default function PublicationsPage () {
    console.log('papers.authors', papers);
    return (
        <>
        <h1>List of Publications</h1>
        <ul>
        {papers?.map( paper => 
        (<li key={paper.id}>
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
        {paper.categories.map(category =>(
            <li key={category}>
            {category}
            </li>
        )) }
        </ul>
        </li>)
        )}
            
        </ul>

        {/* <PapersList/> */}
        </>
    );
};

// {papers?.map( paper => 
//     (<li key={paper.id}>
//     <h3>{paper.title}</h3>
//     {/* <p>papers.authors.map(author => author)</p> */}
//     <p>Summary: {paper.summary}</p>
//     </li>)
//     )}