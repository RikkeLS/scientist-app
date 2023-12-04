// import { papers } from "../../lib/mockPapers";
import { useEffect, useState } from 'react';
import Paper from '../Paper/Paper';

console.clear();
export default function PapersList ({authorToFetch,handleNewSearch,addSelectedPapers}) {
    //--- arXiv-api Wrapper:
    //parameters:
    const prefix = 'au'// for author: https://info.arxiv.org/help/api/user-manual.html#51-details-of-query-construction
    const arxiv = require('arxiv-api');
    const authorName = authorToFetch.author// 'saust'
    
    const [papers, setPapers] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    ///----- select paper toggling
    const [isSelectedInfo,setIsSelectedInfo] = useState([])
    function handleSelectPaperToggle(paperID) {
        const paperInfo = isSelectedInfo.find(info => info.paperID === paperID )
        if (!paperInfo) {
            setIsSelectedInfo([...isSelectedInfo,{paperID:paperID,isSelected:true}])
        }
        if (paperInfo) {
            const newState = isSelectedInfo.map(info => info.paperID!==paperID ?
                 info :{...info,isSelected:!info.isSelected})
            setIsSelectedInfo(newState)
            
        } 
    }
    function handleSelectAllPapers() {
        setIsSelectedInfo(
            papers.map(paper => ({paperID:paper.id,isSelected:true}))
        )
    }
    function handleDeSelectAllPapers() {
        setIsSelectedInfo(
            papers.map(paper => ({paperID:paper.id,isSelected:false}))
        )
    }

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
        return <div>Loading...</div>;
      }
    if (error) {
        console.log('error',error.message);
    return <div>Error: {error.message}</div>;
    }

    if (!papers) return (<h1>data not available</h1>)

    return (
        <> 
        <h1>List of papers</h1>
        <p>Searched by author: {authorName}</p>
        <button onClick={()=> handleNewSearch()}>New search</button>
        <button onClick={()=>handleSelectAllPapers()}>Select all papers</button>
        <button onClick={()=>handleDeSelectAllPapers()}>Deselect all papers</button>
        <button onClick={()=> addSelectedPapers(papers,isSelectedInfo)}>Save to database</button>
                <ul>
                {papers?.map( paper =>
                    <Paper key={paper.id} paper={paper} handleSelectPaperToggle={handleSelectPaperToggle} isSelectedInfo={isSelectedInfo} />
                )}
                    
                </ul>
        </>

        
    );
};
