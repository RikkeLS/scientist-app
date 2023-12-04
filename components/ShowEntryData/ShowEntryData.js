export default function ShowEntryData({entry}) {
    //--add space after comma:
    let formattedEntryText
    if (entry.fieldTitle.toLowerCase()==='collaborators') {
        const textToFormat = entry.mainText.split(',')
        formattedEntryText = textToFormat.map((words,index) => index!==textToFormat.length-1 ? `${words}, `: `${words}` )
    }

    return (
        <>
            <h2>{entry.fieldTitle}:</h2>
            {formattedEntryText ? <p>{formattedEntryText}</p>: <p>{entry.mainText}</p> }
        </>
    )
}