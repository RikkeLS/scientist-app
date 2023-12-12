import HighlightForm from "../HighlightForm/HighlightForm"
import ShowHighlight from "../ShowHighlight/ShowHighlight";
import SaveButton from "../SaveButton/SaveButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import {  useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import SortingSetting from "../SortingSetting/SortingSetting";
import FilterSetting from "../FilterSetting/FilterSetting";
import HighlightsList from "../HighlightsList/HighlightsList";
import StyledButton from "../StyledButton/StyledButton";

export default function Highlights() {
    const [content, setContent] = useState();
    const [isContentSaved,setIsContentSaved] = useState(false);
    const [favInfo,setFavInfo] = useLocalStorageState('favInfo', {
        defaultValue:[]});// useState() //useState(('favInfo'));
    const [isAddHighlight,setIsAddHighlight] = useState(false);
    const [sortedBy,setSortedBy] = useLocalStorageState('sortedBy', {
            defaultValue: 'newest' });
    const [highlightsSorted,setHighlightsSorted] = useState([]);
    const [isFavFilter,setIsFavFilter] = useLocalStorageState('isFavFilter',{defaultValue:false});
    const {data:session} = useSession();
    const router = useRouter();
    const currentPageOwner = router.query.userName;

    function getHighlightContent (formContent) {
        setContent(formContent)
    }

    const { data:highlights, isLoading, error, mutate} = useSWR(`/api/${currentPageOwner}/highlights`)
    if (isLoading) return (<div>Loading...</div>)
    if (error) return (<div>Error! {error.message}</div>)

    async function handleAddHighlight() {
        const contentWithFavCount = {...content,favCount:0}
        const response = await fetch(`/api/${currentPageOwner}/highlights`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(contentWithFavCount)
            },
            )
            if (response.ok) {
                setIsContentSaved(true)
                let timeout;
                function MyTimeOut() {
                    timeout = setTimeout(afterSavePause,1500)
                }
                function afterSavePause() {
                    setContent(null)
                    setIsContentSaved(false)
                    mutate()
                }
                MyTimeOut()

        }
    }  
    async function handleUpdateHighlight(updatedFavChangeInfo) {
        const response = await fetch(`/api/${currentPageOwner}/highlights`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updatedFavChangeInfo)
        },
        )
        if (response.ok) {
            mutate()
        }
    }
    async function handleDeleteHighlight(highlightID) {
        const response = await fetch(`/api/${currentPageOwner}/highlights`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(highlightID)
        },
        )
        if (response.ok) {
            mutate()
        }
    }
    

    //----fav toggling--with fav counter-: 
    function handleToggleFav(id) {
        const infoForID = favInfo?.find(info => info.highlightID === id)
        let favChange = 1;
        if (infoForID) {
            
            if (infoForID.isFav===true) {
                favChange = -1
            }
            setFavInfo(
                favInfo.map(info=> info.highlightID!==id ?
                info:{...info,isFav:!info.isFav})
            )
        }
        if (!infoForID) {
            setFavInfo([...favInfo,{highlightID:id,isFav:true}])
        } 
        const favChangeInfo = {highlightID:id,favChange:favChange};
        handleUpdateHighlight(favChangeInfo);
    }

    //--sorting on first render:--
    let firstHighligts
    if (highlightsSorted.length === 0){
        if (sortedBy === 'newest') firstHighligts = sortByNewest()
        if (sortedBy === 'oldest') firstHighligts = sortByOldest()
        if (sortedBy === 'mostFav') firstHighligts = sortByMostFav()
    }
    function sortByOldest() {
        return highlights.sort((a,b)=> 
        //get a number/integer for all the createdAt dates by removing non-digits(/\D/g ):
        a.createdAt.replace(/\D/g, '') - b.createdAt.replace(/\D/g, ''))
    }
    function sortByNewest () {
        return highlights.sort((a,b)=> 
        b.createdAt.replace(/\D/g, '') - a.createdAt.replace(/\D/g, ''))
    }
    function sortByMostFav () {
        return highlights.sort((a,b)=> 
        b.favCount - a.favCount)
    }
    function handleSortingHighlights(sortSetting) {
        setSortedBy(sortSetting)
        firstHighligts = null
        if (sortSetting==='oldest') setHighlightsSorted(sortByOldest())
        if (sortSetting==='newest') setHighlightsSorted(sortByNewest())
        if (sortSetting==='mostFav') setHighlightsSorted(sortByMostFav())
    }

    //--filter by fav:
    const favedIDs = favInfo?.map(info => info.isFav && info.highlightID)
    const favHighlightsSorted = highlightsSorted.filter(highlight =>
        favedIDs && favedIDs?.includes(highlight._id) )
    const firstFavHighlights = firstHighligts?.filter(highlight =>
        favedIDs && favedIDs?.includes(highlight._id))
    function handleFilterSetting() {
        setIsFavFilter(!isFavFilter)
    }

    return (
        <>
        <h2 className="highligtsMainTitle">Scientific results</h2>
        {session?.user.name===currentPageOwner && 
        <>
            <StyledButton onClick={()=>setIsAddHighlight( !isAddHighlight )} >{!isAddHighlight ? 'Add entry': 'Hide entry form'}</StyledButton>
            {isAddHighlight &&  <HighlightForm getHighlightContent={getHighlightContent}/> }
            
        </>
        }
            { content &&
            <>
            <SaveButton isSaved={isContentSaved} onSave={handleAddHighlight} itemSaved={'highlight'}/> 
            <ShowHighlight content={content}/>
            </>} 
            {highlights ? 
            <>
            <FilterSetting isFavFilter={isFavFilter} handleFilterSetting={handleFilterSetting}/>
            <SortingSetting handleSortingHighlights={handleSortingHighlights} sortedBy={sortedBy}/>
            {firstHighligts ? 
            <HighlightsList 
            highlights={isFavFilter ? firstFavHighlights:firstHighligts} 
            handleToggleFav={handleToggleFav} favInfo={favInfo} handleDeleteHighlight={handleDeleteHighlight}/>:
             <HighlightsList highlights={ isFavFilter ? favHighlightsSorted : highlightsSorted} 
             handleToggleFav={handleToggleFav} favInfo={favInfo}
             handleDeleteHighlight={handleDeleteHighlight}
             />
            }
            </>
            :<p > No highlights added for this profile</p>}

        </>
        
    )
}