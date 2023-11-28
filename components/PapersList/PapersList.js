// import { papers } from "../../lib/mockPapers";

import { useEffect, useState } from 'react';

console.clear();
export default function PapersList () {
    // const [papers, setPapers] = useState([])

    // const URL = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=10';
    
    

    //--- arXiv-api Wrapper:
    //parameters:
    const prefix = 'au'// for author: https://info.arxiv.org/help/api/user-manual.html#51-details-of-query-construction
    const arxiv = require('arxiv-api');
    const authorName = 'saust';

    let papersFetched = [];

    // papersFetched = await arxiv.search({
    // const papers = await arxiv.search({
    //     searchQueryParams: [
    //         {
    //             include: [{name: authorName,prefix:prefix}]
    //         },
    //     ],
    //     start: 0,
    //     maxResults: 10,
    //         });

    // const getPapers = ()=> {
        const [papers, setPapers] = useState([])

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
                    // console.log('papersFetched in async',papersFetched);
                    console.log('response:',response);
                    setPapers[response.data]
                } catch (error) {
                    console.log('error fetching',error);
                }
            }
               
    },[])
    // }

    console.log(papersFetched);
    // async function getPapers() {
    //     try {
    //         papersFetched = await arxiv.search({
    //             searchQueryParams: [
    //                 {
    //                     include: [{name: authorName,prefix:prefix}]
    //                 },
    //             ],
    //             start: 0,
    //             maxResults: 10,
    //                 });
    //         console.log('papersFetched in async',papersFetched);
    //         setPapers[papersFetched]
    //             // return papersFetched
                
    //             // if (papersFetched) {
    //             //     setPapers[papersFetched]
    //             // }
                
                
    //     } catch (error) {
    //         console.log('error fetching',error);
    //     }
    // };

    // const fetchedPapers = getPapers() 
    

    // getPapers()
    // useEffect(()=> {
    //     console.log('papersFetched in useEffect',papersFetched,papers);
    //     if ( papersFetched.length>0)
    //     {
    //         setPapers( papersFetched)
    //     }
    // },[papersFetched]);
        

    // useEffect(()=> {
    //     const papersFetched = await getPapers()
    //     setPapers(papersFetched)
    // },[])



    if (papers.length<1){
        console.log('papers are not here');
        return;
    }
    console.log('papers before return',papers);
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

// {papers?.map( paper => 
//     (<li key={paper.id}>
//     <h3>{paper.title}</h3>
//     {/* <p>papers.authors.map(author => author)</p> */}
//     <p>Summary: {paper.summary}</p>
//     </li>)
//     )}