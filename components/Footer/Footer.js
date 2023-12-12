import LoginButton from "../LoginButton/LoginButton"
import Link from "next/link"

export default function Footer () {
    return (
        <>
        <footer>
            <Link className="homePageLink" href={'/'}>Go to homepage.</Link>
            <LoginButton/>
        </footer>
        </>
    )
}