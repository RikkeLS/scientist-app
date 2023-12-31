import Link from "next/link";
import FavButton from "../FavButton/FavButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ShowHighlight({content,favInfo,handleToggleFav,handleDeleteHighlight}) {
    const {data:session} = useSession();
    const router = useRouter();
    const currentPageOwner = router.query.userName;
    return (
        <>
            <section className="highlight_titleContainer">
            {session?.user.name===currentPageOwner ? <DeleteButton handleDelete={handleDeleteHighlight} ID={content._id}/> :
            <FavButton  content={content} favInfo={favInfo} handleToggleFav={handleToggleFav} />
            }
            
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