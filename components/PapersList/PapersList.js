// import { papers } from "../../lib/mockPapers";
import Link from 'next/link';
import { useEffect, useState } from 'react';

console.clear();
export default function PapersList () {

    //--- arXiv-api Wrapper:
    //parameters:
    const prefix = 'au'// for author: https://info.arxiv.org/help/api/user-manual.html#51-details-of-query-construction
    const arxiv = require('arxiv-api');
    const authorName = 'saust';

 
    const [papers, setPapers] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=> {
    async function fetchData() {
        try {
            const response = await arxiv.search({
                searchQueryParams: [
                    {
                        include: [{name: authorName,prefix:prefix}]
                    },
                ],
                start: 0,
                maxResults: 10,
                    });
            setPapers(response)
            setLoading(false)
        } catch (error) {
            setError(error)
            console.log('error fetching',error);
            setLoading(false)
        }
    }
    fetchData();
    },[]);
    if (loading) {
        console.log('was loading');
        return <div>Loading...</div>;
      }
    if (error) {
        console.log('error',error.message);
    return <div>Error: {error.message}</div>;
    }
    



    if (!papers) return (<h1>data not available</h1>)
    // console.log('papers before return',papers);
    console.log('paper object:',papers[8]);
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
                    <li>
                    {paper.categories[0].scheme}
                    </li>
                    <li>
                    {paper.categories[0].term}
                    </li>
                </ul>
                </li>)
                )}
                    
                </ul>
        </>

        
    );
};
