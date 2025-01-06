import { Link } from "react-router-dom"

const Navbar = () => {

  return (
    <nav className="bg-slate-800 sticky top-0 mx-auto flex lg:flex-col w-full pr-1 lg:pr-0 items-center justify-between md:h-full lg:h-screen lg:rounded-br-lg">
      <div className="h-20 w-20 bg-indigo-500/100 rounded-r-3xl grid place-items-center">
            <Link to="invoiceApp"><div className="w-10 h-10 rounded-full bg-slate-100"></div></Link>
      </div>
      <div className="border-l-2 lg:border-t-2 lg:border-l-0 border-indigo-500/100 h-20 w-20 grid place-items-center lg:rounded-br-lg">
        <img src="./src/assets/profile-picture.jpg" alt="profile picture" className="w-8 h-8 rounded-full"/>
      </div>
    </nav>
  )
}

export default Navbar
