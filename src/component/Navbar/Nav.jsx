// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import logo from '../../assets/logo.png';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Prediction", path: "/prediction" },
//     {name:"knowledge",path:"/knowledge"},
//     {name:"tretmenet",path:"/treatment"},
//     {name:"Chat",path:"/chat"},
//     { name: "Contact", path: "/contact" },
    
    


//   ];

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <NavLink to="/" className="flex items-center">
      
//             <img src={logo} alt="Logo" className="h-10 w-auto rounded-md mr-2" />
//             <h1 className='text-lg text-red-500'>Heart Sathi</h1>
//           </NavLink>

//           {/* Hamburger */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-black focus:outline-none"
//               aria-label="Toggle menu"
//             >
//               {isOpen ? (
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>

//           {/* Navigation Links */}
//           <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 absolute md:static left-0 top-16 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none px-6 py-4 md:p-0 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
//             {navItems.map(({ name, path }) => (
//               <NavLink
//                 key={name}
//                 to={path}
//                 onClick={() => setIsOpen(false)}
//                 className={({ isActive }) =>
//                   `block md:inline-block py-2 md:py-0 text-lg ${
//                     isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
//                   } hover:text-blue-500 transition`
//                 }
//               >
//                 {name}
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const navItems = [
    { name: "Home", path: "/", subMenu: ["Latest News", "Overview"] },
    { name: "About", path: "/about", subMenu: ["Our Story", "Team", "Mission"] },
    { name: "Prediction", path: "/prediction", subMenu: ["Heart Disease Prediction", "Risk Factors", "Symptoms"] },
    { name: "Knowledge", path: "/knowledge", subMenu: ["Videos", "Blog", "Articles", "Research"] },
    { name: "Treatment", path: "/treatment", subMenu: ["Medication", "Therapies", "Surgical Options"] },
    { name: "Chat", path: "/chat", subMenu: ["Start Chat", "FAQ"] },
    { name: "Contact", path: "/contact", subMenu: ["Email", "Phone", "Address"] },
  ];

  const handleDropdownToggle = (index) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out hover:shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-auto rounded-md" />
            <h1 className="text-xl font-bold text-red-500 tracking-wide">Heart Sathi</h1>
          </NavLink>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 absolute md:static left-0 top-16 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none px-6 py-4 md:p-0 transition-all duration-300 ease-in-out ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {/* Main Nav Link */}
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block md:inline-block py-2 md:py-0 text-lg font-medium ${
                      isActive ? 'text-blue-600 font-semibold' : 'text-gray-800 hover:text-blue-500'
                    } transition-colors duration-200 ease-in-out transform hover:scale-105`}
                >
                  {item.name}
                </NavLink>

                {/* Dropdown for Submenu */}
                {item.subMenu && (
                  <div
                    onMouseEnter={() => handleDropdownToggle(index)}
                    onMouseLeave={() => handleDropdownToggle(index)}
                    className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-all duration-300 ease-in-out ${
                      dropdownOpen[index] ? 'block' : 'hidden'
                    }`}
                  >
                    {item.subMenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={`/${item.name.toLowerCase()}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block py-2 px-4 text-gray-800 hover:bg-blue-100"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
