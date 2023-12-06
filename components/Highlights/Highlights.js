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
        const response = await fetch(`/api/${currentPageOwner}/highlights`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(content)
            },
            )
            if (response.ok) {
                setIsContentSaved(true)
                mutate()

        }
    }  

    //----fav toggling---: 

    function handleToggleFav(id) {
        console.log('id of highlight',id);
        const infoForID = favInfo?.find(info => info.highlightID === id)
        if (!infoForID) {
            setFavInfo([...favInfo,{highlightID:id,isFav:true}])
        } 
        if (infoForID) {
            setFavInfo(
                favInfo.map(info=> info.highlightID!==id ?
                info:{...info,isFav:!info.isFav} )
            )
        }

    console.log('favInfo',favInfo);
    }


    
    

    return (
        <>
        <h2>Scientific results</h2>
        {session?.user.name===currentPageOwner &&
            <HighlightForm getHighlightContent={getHighlightContent}/>
        }
            { content ?
            <>
            <SaveButton isSaved={isContentSaved} onSave={handleAddHighlight} itemSaved={'highlight'}/> 
            <ShowHighlight content={content}/>
            </>
            :''} 
            
            {highlights ? 
                highlights?.reverse().map( highlight => (
                    <>
                     <FavButton content={highlight} favInfo={favInfo} handleToggleFav={handleToggleFav} />
                    <ShowHighlight key={highlight._id} content={highlight}/> 
                    </>))
            :''} 

        </>
        
    )
}