import HighlightForm from "../HighlightForm/HighlightForm"
import ShowHighlight from "../ShowHighlight/ShowHighlight";
import SaveButton from "../SaveButton/SaveButton";
import FavButton from "../FavButton/FavButton";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

export default function Highlights() {
    const [content, setContent] = useState();
    const [isContentSaved,setIsContentSaved] = useState(false);
    const [favInfo,setFavInfo] = useState([])
    const [isAddHighlight,setIsAddHighlight] = useState(false);
    // const [favCountInfo,setFavCountInfo] = useState([])
    // const [favChange,setFavChange] = useState()
    const {data:session} = useSession()
    const router = useRouter()
    const currentPageOwner = router.query.userName

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
                mutate()
        }
    }  
    async function handleUpdateHighlight(favCountUpdated) {
        console.log('updatedFavCountInfo frontend',favCountUpdated);
        const response = await fetch(`/api/${currentPageOwner}/highlights`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(favCountUpdated)
        },
        )
        if (response.ok) {
            console.log('updated')
        }
    }

    //----fav toggling--with fav counter-: 
    function handleToggleFav(id) {
        const infoForID = favInfo?.find(info => info.highlightID === id)
        
        // if (infoForID.isFav) {
        //     favChange = {highlightID:id,favChange:-1}
        //     // favChange = -1
        // } 
        const highlightForID = highlights.find(highlight => highlight._id === id)
        let favCountInfo = {highlightID:id,favCount:highlightForID.favCount}

        // setFavChange({highlightID:id,favChange:favChange})
        if (infoForID) {
            let favChange = 1;
            if (infoForID.isFav) {
                favChange = -1
            }
            favCountInfo['favCount']=favCountInfo['favCount']+favChange
            // let favChange = {highlightID:id,favChange:-1}
            // if (!infoForID.isFav) {
            //     favChange = {highlightID:id,favChange:1}
            // }
            

            setFavInfo(
                favInfo.map(info=> info.highlightID!==id ?
                info:{...info,isFav:!info.isFav})
            )
            // setFavCountInfo(
            //     favCountInfo.map(info=> info.highlightID!==id ?
            //     info:{...info,favCount:info.favCount+favChange} )
            // )

        }
        if (!infoForID) {
            // setFavCountInfo([...favCountInfo,{highlightID:id,favCount:1}])
            setFavInfo([...favInfo,{highlightID:id,isFav:true}])
            favCountInfo['favCount']++
        } 
        handleUpdateHighlight(favCountInfo);
    }
    // console.log('favCountInfo',favCountInfo);


    //---sort by created date/time---
    const highlightsSorted = highlights.sort((a,b)=> 
    //get a number/integer for all the createdAt dates by removing non-digits(/\D/g ):
        b.createdAt.replace(/\D/g, '')-a.createdAt.replace(/\D/g, '')
    )

    return (
        <>
        <h2>Scientific results</h2>
        {session?.user.name===currentPageOwner && 
        <>
            <button onClick={()=>setIsAddHighlight( !isAddHighlight )} >{!isAddHighlight ? 'Add entry': 'Hide entry form'}</button>
            {isAddHighlight &&  <HighlightForm getHighlightContent={getHighlightContent}/> }
            
        </>
        }
            { content ?
            <>
            <SaveButton isSaved={isContentSaved} onSave={handleAddHighlight} itemSaved={'highlight'}/> 
            <ShowHighlight content={content}/>
            </>
            :''} 
            {highlights ? 
                (highlightsSorted?.map( highlight => 
                    <section key={highlight._id} className="highlightContainer" >
                     <FavButton  content={highlight} favInfo={favInfo} handleToggleFav={handleToggleFav} />
                    <ShowHighlight content={highlight}/> 
                    </section>
                    )
                )
            :''} 

        </>
        
    )
}