import { useState } from "react";
import HighlightForm from "../HighlightForm/HighlightForm"
import ShowHighlight from "../ShowHighlight/ShowHighlight";

export default function Highlights() {
    const [content, setContent] = useState();

    function getHighlightContent (formContent) {
        setContent(formContent)
    }

    return (
        <>
        <h2>Scientific results</h2>
        <HighlightForm getHighlightContent={getHighlightContent}/>
        { content ? <ShowHighlight content={content} /> :''} 
        </>
        
    )
}