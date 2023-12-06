import { useState } from "react";
import HighlightForm from "../HighlightForm/HighlightForm"
import ShowHighlight from "../ShowHighlight/ShowHighlight";
import SaveButton from "../SaveButton/SaveButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Highlights() {
    const [content, setContent] = useState();
    const [isContentSaved,setIsContentSaved] = useState(false);
    const {data:session} = useSession()
    const router = useRouter()
    const currentPageOwner = router.query.userName

    function getHighlightContent (formContent) {
        setContent(formContent)
    }

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
        }
    }  


    return (
        <>
        <h2>Scientific results</h2>
        {session?.user.name===currentPageOwner &&
            <HighlightForm getHighlightContent={getHighlightContent}/>
        }
            { content ?
            <>
            <ShowHighlight content={content} />
            <SaveButton isSaved={isContentSaved} onSave={handleAddHighlight} itemSaved={'highlight'}/> 
            </>
            :''} 

        </>
        
    )
}