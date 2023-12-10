import SaveButton from '../SaveButton/SaveButton';

export default function ShowEntryData({entry,handleSaveProfileContent,isSaved}) {
    //--add space after comma:
    let formattedEntryText
    if (entry.title.toLowerCase()==='collaborators') {
        const textToFormat = entry.mainText.split(',')
        formattedEntryText = textToFormat.map((words,index) => index!==textToFormat.length-1 ? `${words}, `: `${words}` )
    }
    return (
        <>
        <section className={isSaved===undefined ?`ContentField`:`ContentField toSave`}>
            <SaveButton onSave={handleSaveProfileContent} isSaved={isSaved} itemSaved={'entry'} />
            <h2 className='ContentField_title'>{entry.title}:</h2>
            {formattedEntryText ? <p className='ContentField_mainText'>{formattedEntryText}</p>
            : 
            <p className='ContentField_mainText'>{entry.mainText}</p> 
            }
            
        </section> 

        </>
    )
}