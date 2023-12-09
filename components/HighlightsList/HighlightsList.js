import ShowHighlight from "../ShowHighlight/ShowHighlight"
export default function HighlightsList ({highlights,handleToggleFav,favInfo}) {
    return (
        highlights?.map( highlight => 
            <section key={highlight._id} className="highlightContainer" >
            <ShowHighlight
             favInfo={favInfo} 
             handleToggleFav={handleToggleFav}
             content={highlight}/> 
            </section>
        )
    )
}