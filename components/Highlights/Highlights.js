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
    async function handleUpdateHighlight(updatedFavChangeInfo) {
        //--reset:
        // favCountInfo['favCount']=0 
        const response = await fetch(`/api/${currentPageOwner}/highlights`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updatedFavChangeInfo)
        },
        )
        if (response.ok) {
            console.log('updated')
            mutate()
        }
    }

    //----fav toggling--with fav counter-: 
    function handleToggleFav(id) {
        const infoForID = favInfo?.find(info => info.highlightID === id)
        let favChange = 1;

        // setFavChange({highlightID:id,favChange:favChange})
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