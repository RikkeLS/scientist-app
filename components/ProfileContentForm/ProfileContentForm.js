import { useState } from "react";

export default function ProfileContentForm ({papers,getProfileContent}) {
    const [selectedTemplate,setTemplate] = useState()

    function handleTemplate(event) {
        setTemplate(event.target.value)
    }
    
    function handleSubmit (event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData)
        getProfileContent(data)
    }

    let topCoAuthors;
    if (selectedTemplate==='collaborators') {
        const authors = papers.map(paper => paper.authors )
        const allAuthors = authors.flat(1);
        //counting occurences:
        const counts = {};
        for (const author of allAuthors) {
            counts[author] = counts[author] ? counts[author]+1:1;
        }
        topCoAuthors = Array.from(Array(Object.keys(counts).length));
        let i = 0
        let prevVal = 0;
        for (const [author,value] of Object.entries(counts)) {
            if (value > prevVal) {
                topCoAuthors.unshift(author)
                topCoAuthors.pop()
            } else {
                topCoAuthors[i]=author
            }
            prevVal=value
            i++
        }
        
    }
    
    return (
        <>
            
        <label htmlFor="template">Select a template:</label>
        <select defaultValue='basic' onInput={handleTemplate} name="template" id="template" form='ProfileContentForm'>
            <option value='collaborators'>Collaborators</option>
            <option value='basic'>basic</option>
        </select>
        <form onSubmit={handleSubmit} id='ProfileContentForm'>

        <label htmlFor="title" >Field title:</label>
        {selectedTemplate ? <input defaultValue={selectedTemplate.toUpperCase()} type='text' name="title" id="title"></input> :
        <input defaultValue='' type='text' name="title" id="title"></input> }
        
        {selectedTemplate==='collaborators' ? <>
        <label htmlFor="mainText">Top 5 co-authors:</label>
        <textarea defaultValue={topCoAuthors.slice(0,5)} name="mainText" id="mainText"></textarea>
        </>
        : <>
        <label htmlFor="mainText">Text content:</label>
        <textarea defaultValue='' name="mainText" id="mainText"></textarea>
        </>
        }
        <button type='submit'>Submit</button>
        </form>
        </>
    )
}