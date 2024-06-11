// import { papers } from "../../lib/mockPapers";
import { useEffect, useState } from 'react';
import Paper from '../Paper/Paper';
import SaveButton from '../SaveButton/SaveButton';
import SavePaperButton from '../SavePaperButton/SavePaperButton';
import SelectAllButton from '../SelectAllButton/SelectAllButton';
import StyledButton from '../StyledButton/StyledButton';

console.clear();
export default function PapersList ({authorToFetch,handleNewSearch,addSelectedPapers,isPaperSaved}) {
    //--- arXiv-api Wrapper:
    //parameters:
    const prefix = 'au'// for author: https://info.arxiv.org/help/api/user-manual.html#51-details-of-query-construction
    const arxiv = require('arxiv-api');
    const authorName = authorToFetch.author// 'saust'
    const axios = require('axios');
    const _ = require('lodash');
    // const util = require('util');
    // const {parseString} = require('xml2js');
    // const parseStringPromisified = util.promisify(parseString);
    
    
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
    // async function fetchData() {
    //     try {
    //         const response = await arxiv.search({
    //             searchQueryParams: [
    //                 {
    //                     include: [{name: authorName,prefix:prefix}]
    //                 },
    //             ],
    //             start: 0,
    //             maxResults: 10,
    //                 });
    //         setPapers(response)
    //         setLoading(false)
    //     } catch (error) {
    //         setError(error)
    //         console.log('error fetching',error);
    //         setLoading(false)
    //     }
    async function fetchData() {
        try {
            const arxiv_url = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=10'
        // const searchQuery = searchQueryParams.map(parseTags).join(SEPARATORS.OR);
            const response = await axios.get(arxiv_url,
                {
                  headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
                 },
            );
             
             console.log('response',response)
             setPapers(response.data)
            //  const parsedData = await parseStringPromisified(response.data);
            //  console.log('parsedData',parsedData)
            //  setPapers(parsedData)
        // return _.get(parsedData, 'feed.entry', []).map(parseArxivObject)
             setLoading(false);
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
    if (papers) {
        console.log('data',papers)
        return (<h1>console for data</h1>)
    }
        
    const numberOfSelectedPapers = isSelectedInfo?.filter(info => info.isSelected).length

    return (
        <> 
        <h3 className='papersList-title'>Papers on arXiv from search <em>author: {authorName}</em> </h3>
        <ul className='papersSelectionButtonList'>
        <li>
        {/* <button className='NewSearchButton' onClick={()=> handleNewSearch()}>New search</button> */}
        <StyledButton onClick={()=> handleNewSearch()}>New search</StyledButton>
        </li><li>
        <SelectAllButton action='select' onClick={()=>handleSelectAllPapers()}>Select all papers</SelectAllButton>
        </li><li>
        <SelectAllButton action='deselect' onClick={()=>handleDeSelectAllPapers()}>Deselect all papers</SelectAllButton>
        </li><li>
        {numberOfSelectedPapers===0 ? <p className='selectPapersInfoText'>Select papers to save to the profile</p> : 
        <SavePaperButton onSave={()=>addSelectedPapers(papers,isSelectedInfo)} isSaved={isPaperSaved} itemSaved={numberOfSelectedPapers===1 ?  'paper':`${numberOfSelectedPapers} papers`}/>
        }
        </li>
        </ul>
                <ul className='papersList'>
                {papers?.map( paper =>
                    <Paper key={paper._id} paper={paper} handleSelectPaperToggle={handleSelectPaperToggle} isSelectedInfo={isSelectedInfo} />
                )}
                    
                </ul>
        </>

        
    );
};
