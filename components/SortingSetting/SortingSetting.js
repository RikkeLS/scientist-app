export default function SortingSetting({handleSortingHighlights,sortedBy}) {
    let sortedByText
    if (sortedBy==='newest') sortedByText='newest'
    if (sortedBy==='oldest') sortedByText='oldest'
    if (sortedBy==='mostFav') sortedByText='most favourited'

    return (
        <>
    <section className="sortingSettingSection">
    <span className="sortingSettingSection-title">Sorted by {sortedByText} </span>
    <ul className="sortByList">
        <li onClick={()=>handleSortingHighlights('newest')} className="sortByListItem">newest</li>
        <li onClick={()=>handleSortingHighlights('oldest')} className="sortByListItem">oldest</li>
        <li onClick={()=>handleSortingHighlights('mostFav')} className="sortByListItem">most favourited</li>
    </ul>
    </section>
        </>
    )

}