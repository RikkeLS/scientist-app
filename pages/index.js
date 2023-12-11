import Link from "next/link";

export default function Home() {

  return (
    <>
    <section className="homePageContainer">
      <h1 className="homePage-title">Physicists App</h1>
      <nav className="mainNavbar">
      <ul>
      <li>
        <Link href={'/create-profile'} className="createProfile-title">Create profile</Link>
        </li>
        {/* <li>
        <Link href={'/papers'}>Link to Publications/papers</Link>
        </li> */}
        {/* <li>
        <Link href={'/login'}>Link to login page</Link>
        </li> */}
      </ul>
      <h2 className="regUsers-title">Registered users</h2>
      <ul>
        <li>
        <Link className="regUser-ListItem" href={'/RikkeLS'}>RikkeLS</Link>
        </li>
        <li>
        <Link className="regUser-ListItem" href={'/RikkeTesting'}>Test profile</Link>
        </li>
      </ul>

      </nav>
      </section>
    </>
  );
}
