import React, { useState ,useEffect} from "react";
import { Routes, Route, Link,useLocation,useNavigate,useParams} from 'react-router-dom';
import '../css/Header.css'
import { Menu } from "lucide-react";

const allDoors = [
    { title: "Traditional", links: ["Raised Panel", "Stamped Carriage House", "Stamped Shaker" ,"Recessed Panel"] },
    { title: "Contemporary", links: ["Planks", "Skyline Flush", "Aluminum", "Sterling"] },
    { title: "Carriage", links: ["Steel Overlay", "Fiber Glass Overlay", "Shoreline","Wood Overlay"] },
  ];

function MobileMenu({handleDoorClick}) {
  const [openDoorDialog, setOpenDoorDialog] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleToggleMenu = () => {
    setOpenDoorDialog(!openDoorDialog);
    setOpenIndex(null)
  }
  const handleMobileDoorClick = (doorType, subType) => {
    setOpenDoorDialog(false);
    handleDoorClick(doorType, subType);
  };
  return (<>
    <button
      className="hamburger-btn"
      onClick={handleToggleMenu}
    >
      {/* Keep icons visually the same size box */}
      <div className="hamburger-icon-wrapper">
        {openDoorDialog ? <span className="close-icon">×</span> : <Menu className="hamburger-icon" />}
      </div>
    </button>
    {openDoorDialog && (<>
    <div className="menu-overlay" onClick={() => setOpenDoorDialog(false)}></div>
    <div className="mobile-menu-dialog">
      <ul className="mobile-dropdown">
        {allDoors.map((door, index) => (
          <li key={index} className="mobile-dropdown-item">
            <h2 className="mobile-dropdown-title" onClick={() => handleToggle(index)} >
              {door.title}
            </h2>
            {openIndex === index && (
              <ul className="mobile-dropdown-sublist">
                {door.links.map((link, i) => (
                  <li key={i} className="mobile-dropdown-subitem" onClick={()=> handleMobileDoorClick(door.title,link)}>
                    {link}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div></>
    )}
    </>
  )
}

export default function Header({handleDoorSelection}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 840);
  const navigate = useNavigate();

  const handleClick = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const handleOverlayClick = () => {
    setOpenMenu(null); // close any open menu
  };

const handleDoorClick = (doorType, subType) => {
  setOpenMenu(null);
  const typeLC = doorType.toLowerCase();
  const slug = subType.replace(/ /g, '_').toLowerCase();
  // Don’t call handleDoorSelection here; it causes a render on the old route
  navigate(`/${typeLC}/${slug}/build`);
};

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 840);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
    {/* {openMenu !== null && (
      <div className="click-overlay" onClick={handleOverlayClick}></div>
    )} */}
    <header className={`header ${isMobile ? "mobile-header" : ""}`}>
      <button className="start-over" onClick={()=> navigate("/")}>Start Over</button>
      {isMobile ? <MobileMenu handleDoorClick={handleDoorClick}/>:
      <>
      {allDoors.map((door, index) => (
        <div
          key={index}
          className="menu"
          onMouseEnter={() => setOpenMenu(index)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <h2 className="menu-title" >
            {door.title}
          </h2>
          <ul className={`dropdown ${openMenu === index ? "show-dropdown" : ""}`}>
            {door.links.map((link, i) => (
              <li key={i} className="dropdown-item" onClick={()=>handleDoorClick(door.title,link)}>
                {link}
              </li>
            ))}
          </ul>
        </div>
      ))}
     {/* GALLERY MENU */}
      <div
        className="menu"
        onMouseEnter={() => setOpenMenu("gallery")}
        onMouseLeave={() => setOpenMenu(null)}
        onClick={()=> setOpenMenu(null)}
      >
        <h2 className="menu-title">Gallery</h2>
        <ul id="gallery-dropdown" className={`dropdown gallery-dropdown ${openMenu === "gallery" ? "show-dropdown" : ""}`}>
          {allDoors.map((door, i) => (
            <li key={i} className="dropdown-submenu">
              <span className="submenu-title">{door.title}</span>
              <ul className="sub-dropdown">
                {door.links.map((link, j) => (
                  <li
                    key={j}
                    className="dropdown-item"
                    onClick={() => navigate(`/gallery/${door.title}/${link}`)}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div></>}
    </header>
  </>
  );
}

{/* <div id="menu-container">
  //   <button className="menu-btn" onClick={() => setOpenDoorDialog(!openDoorDialog)}>
  //     <Menu className="menu-icon" />
  //   </button>
  //     {openDoorDialog && (<>
  //     <div className="menu-overlay" onClick={() => setOpenDoorDialog(false)}></div>
  //       <div className="menu-dialog">

  //       <h1>View Gallery</h1>
  //         {Object.keys(doorImgs).map((subType,index) =>{
  //         return <p id="dialog-door" key={index} onClick={() => handleGalleryBtnClick(doorType,subType)}>{subType}</p>;
  //       })}

  //       <div id="dialog-buttons">
  //         <button onClick={() => setOpenDoorDialog(false)}>Close</button>
  //         <button onClick={()=> navigate("/")}>Home</button>
  //       </div>

  //     </div>
  //   </>
  //   )}
  // </div> */}