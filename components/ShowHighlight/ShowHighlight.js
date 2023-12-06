import Link from "next/link";
export default function ShowHighlight({content}) {
    return (
        <>
            
            <h3 className="highlight_title">{content.title}</h3>
                <section className="highlight_mainContent">
                <img className="highlight_image" src={content.imageURL} alt={content.title}/>
                <p className="highlight_mainText">{content.mainText}</p>
                </section>
                <section className="highlight_extra">
                    <Link href={content.refLink} rel='noopener noreferrer' target='_blank'>{content.refText}  </Link>
                </section>
        </>

    )
}