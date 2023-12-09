import Link from "next/link";
import FavButton from "../FavButton/FavButton";
export default function ShowHighlight({content,favInfo,handleToggleFav}) {
    return (
        <>
            <section className="highlight_titleContainer">
            <FavButton  content={content} favInfo={favInfo} handleToggleFav={handleToggleFav} />
                <h3 className="highlight_title">{content.title}</h3>
                <Link className="highlight_refLink" href={content.refLink} rel='noopener noreferrer' target='_blank'>{content.refText}  </Link>
            </section>
            
            {/* {content.paperID && <p>PaperID: {content.paperID}</p>} */}
                <section className="highlight_mainContent">
                <img className="highlight_image" src={content.imageURL} alt={content.title}/>
                <p className="highlight_mainText">{content.mainText}</p>
                </section>
        </>

    )
}