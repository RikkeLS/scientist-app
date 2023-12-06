import Link from "next/link";

export default function ShowHighlight({content}) {
    return (
        <>
            <section className="highlightContainer">
            <h3 className="highlight_title">{content.title}</h3>
                <section className="highlight_mainContent">
                <img className="highlight_image" src={content.imageURL} alt={content.title}/>
                <p>{content.mainText}</p>
                </section>
                <section className="highlight_extra">
                    <Link href={content.refLink}>{content.refText}</Link>
                </section>
            </section>

        </>

    )
}