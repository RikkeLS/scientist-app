export default function SavePaperButton({onSave,isSaved,itemSaved}) {
    if (isSaved===undefined) return ('');
    // console.log('isSaved in button:',isSaved);
    return (
        <button role="button" className={isSaved ? "savePaperButton saved" : "savePaperButton"}
         onClick={!isSaved ? onSave : null}>
         {isSaved ? 'Saved '+itemSaved : 'Save '+itemSaved}
        {/* <Image 
            src={ isSaved ? 'ticked.svg':'cross.svg'} 
            alt={ isSaved ? 'saved to DB ':'Not Saved to SB'}
            width={10}
        /> */}
        </button>
    )
}