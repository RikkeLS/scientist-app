import Link from "next/link";

export default function Home() {

  return (
    <>
    <section className="homePageContainer">
      <h1 className="homePage-title">Physicists App</h1>
      <nav className="mainNavbar">
      <section className='createProfileLinkContainer'>

      

        <Link href={'/create-profile'} className="createProfile-title">Create profile</Link>
      </section>
      <h2 className="regUsers-title">Registered users</h2>
      <section className='regUserContainer'>
        <Link className="regUser" href={'/RikkeLS'}>RikkeLS</Link>

        <Link className="regUser" href={'/RikkeTesting'}>Test profile</Link>
      </section>

      </nav>
      </section>
    </>
  );
}
