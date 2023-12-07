// import { papers } from "../../lib/mockPapers";
import { useEffect, useState } from 'react';
import Paper from '../Paper/Paper';
import SaveButton from '../SaveButton/SaveButton';
import SelectAllButton from '../SelectAllButton/SelectAllButton';

export default function SelectPapers ({authorToFetch,handleNewSearch,addSelectedPapers,isPaperSaved}) {
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

    const numberOfSelectedPapers = isSelectedInfo?.filter(info => info.isSelected).length

    return (
        <> 
        <h3>Papers on arXiv from search <em>author: {authorName}</em> </h3>
        <ul className='papersSelectionButtonList'>
        <li>
        <button className='NewSearchButton' onClick={()=> handleNewSearch()}>New search</button>
        </li><li>
        <SelectAllButton action='select' onClick={()=>handleSelectAllPapers()}>Select all papers</SelectAllButton>
        </li><li>
        <SelectAllButton action='deselect' onClick={()=>handleDeSelectAllPapers()}>Deselect all papers</SelectAllButton>
        </li><li>
        {numberOfSelectedPapers===0 ? <p>Select papers to save to the profile</p> : 
        <SaveButton onSave={()=>addSelectedPapers(papers,isSelectedInfo)} isSaved={isPaperSaved} itemSaved={numberOfSelectedPapers===1 ?  'paper':`${numberOfSelectedPapers} papers`}/>
        }
        </li>
        </ul>
                <ul className='papersList'>
                {papers?.map( paper =>
                    <Paper key={paper.id} paper={paper} handleSelectPaperToggle={handleSelectPaperToggle} isSelectedInfo={isSelectedInfo} />
                )}
                    
                </ul>
        </>

        
    );
};
