import Image from "next/image"
export default function SaveButton({onSave,isSaved}) {

    console.log('isSaved:',isSaved);
    return (
        <span className={isSaved ? "saveButton saved" : "saveButton"}
         onClick={onSave}>
         {isSaved ? 'Saved papers': 'Save papers'}
        {/* <Image 
            src={ isSaved ? 'ticked':'cross.svg'} 
            alt={ isSaved ? 'saved to DB ':'Not Saved to SB'}
            width={10}
        /> */}
        </span>
    )
}