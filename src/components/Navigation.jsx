import { Link } from "react-router";
import 'flowbite';  

export default function Navigation() {
  return (
    <div className="bg-gray-800 shadow-lg place-items-center">
      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center">
          {/* <img src="" alt="Logo" className=" " /> */}
          <span className="text-white text-xl font-semibold">Formation</span>
        </div>
        <div className="md:hidden">
          <button
            className="text-white"
            data-collapse-toggle="navbar-default"
            type="button"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="hidden md:flex justify-center">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/formulaire"
              className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
            >
              Formulaire
            </Link>
          </li>
        </ul>
      </div>

      <div
        id="navbar-default"
        className="md:hidden hidden"
        data-collapse="collapse"
      >
        <ul className="flex flex-col items-center space-y-4">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/formulaire"
              className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
            >
              Formulaire
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
