export default function SaveButton({onSave,isSaved,itemSaved}) {
    if (isSaved===undefined) return ('');
    // console.log('isSaved in button:',isSaved);
    return (
        <span role="button" className={isSaved ? "saveButton saved" : "saveButton"}
         onClick={!isSaved ? onSave : null}>
         {isSaved ? 'Saved '+itemSaved : 'Save '+itemSaved}
        {/* <Image 
            src={ isSaved ? 'ticked.svg':'cross.svg'} 
            alt={ isSaved ? 'saved to DB ':'Not Saved to SB'}
            width={10}
        /> */}
        </span>
    )
}