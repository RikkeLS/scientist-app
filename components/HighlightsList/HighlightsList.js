import ShowHighlight from "../ShowHighlight/ShowHighlight"

export default function HighlightsList ({highlights,handleToggleFav,favInfo,handleDeleteHighlight}) {
    return (
        <section className="highlightsList">
        {
            highlights?.map( highlight => 
            <section key={highlight._id} className="highlightContainer" >
            <ShowHighlight
             handleDeleteHighlight={handleDeleteHighlight}
             favInfo={favInfo} 
             handleToggleFav={handleToggleFav}
             content={highlight}/> 
            </section>
        ) }
        </section>

    )
}