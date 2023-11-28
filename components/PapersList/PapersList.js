// import { papers } from "../../lib/mockPapers";

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
    return (
        <> 
       <h1>List of Publications</h1>
        <ul>
        <li>list item</li>
        {papers?.map( paper => 
        (<li key={paper.id}>
        <h3>{paper.title}</h3>
        <p>Summary: {paper.summary}</p>
        </li>)
        )}
            
        </ul>
        </>

        
    );
};

