import Image from "next/image"
// import './SelectButton.css'

export default function SelectButton({isSelectedInfo,paperID,handleSelectPaperToggle}) {
    const paperInfo = isSelectedInfo?.find(info => info.paperID===paperID)

    return (
    <>

    <Image className="SelectButtonImage" onClick={()=>handleSelectPaperToggle(paperID)} 
    src={paperInfo?.isSelected ? '/ticked.svg':'/cross.svg'}
    alt={paperInfo?.isSelected ? 'Deselect paper':'Select paper'}
    width={30}
    height={30}
    />

    </>
    )
}