import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useNavigate} from 'react-router-dom';
import '../css/DoorSelector.css'
import Build from './Build.jsx'
import { Menu } from "lucide-react"; // <-- the hamburger icon
function SlideShow({ handleCarouselClick, subTypeImgs,index,doorNavName,doorName,doorType}) {
  let doorElements = [];
  for (let i = 0; i < subTypeImgs.length; i++) {
    doorElements.push(
      <div className={`carousel-item subtype-item ${i === 0 ? 'active' : ''}`} key={i}>
        <img loading="eager" onClick={() => handleCarouselClick(doorNavName,doorName)} src={subTypeImgs[i]} className="img-fluid" />
      </div>
    );
  }
  return (
    <div id={`doorSelectCarousel-${index}`} className="carousel slide subtype-carousel">
      <div className="carousel-inner subtype-inner">
        {doorElements}
        <button
          id="subTypePrevBtn"
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#doorSelectCarousel-${index}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
         id="subTypeNextBtn"
          className="carousel-control-next"
          type="button"
          data-bs-target={`#doorSelectCarousel-${index}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
function DoorMenu({ allDoors, handleDoorClick, handleGalleryBtn }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      {/* --- MENU BUTTON / ICON --- */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <Menu className="menu-icon" size={36} /> {/* adjustable size */}
      </button>

      {/* --- OVERLAY --- */}
      {isOpen && <div className="menu-overlay" onClick={() => setIsOpen(false)} />}

      {/* --- DIALOG MENU --- */}
      {isOpen && (
        <div className="menu-dialog">
          {/* Each door collection */}
          {allDoors.map((door, idx) => (
            <div key={idx}>
              <h2>{door.title}</h2>
              {door.links.map((link, i) => (
                <div
                  id="dialog-door"
                  key={i}
                  onClick={() => {
                    handleDoorClick(door.title, link);
                    setIsOpen(false);
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}

          {/* Gallery + Home buttons */}
          <div id="dialog-buttons">
            <button
              onClick={() => {
                handleGalleryBtn();
                setIsOpen(false);
              }}
            >
              Gallery
            </button>
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function DoorSelector({Doors, handleDoorSelection,handleGalleryBtn,doorType,doorImgs}) {
  const [doorIndex, setDoorIndex] = useState(0)
  const [openDoorDialog, setOpenDoorDialog] = useState(false)
  // console.log("DOORS RECIEVED:",Doors)
  // console.log(doorImgs)
  const navigate = useNavigate()
  const handleCarouselClick = (doorNavName,doorName)=>{
    console.log("YOY",doorType,doorNavName,doorName)
    handleDoorSelection(Doors[doorName])
    navigate(`/${doorType}/${doorNavName}/build`)
  }

  const handleGalleryBtnClick = (doorType, subType) => {
    handleGalleryBtn(doorType, subType);
  };

  return (
  <div id="centering-div">
    {/* <DoorMenu allDoors={Doors} handleDoorClick={handleDoorSelection} handleGalleryBtn={handleGalleryBtnClick} /> */}
  
    {Object.keys(doorImgs).map((subType,index) =>{
      const doorName = subType;
      const doorNavName = subType.replace(/ /g, '_').toLowerCase()

      //console.log("DOORTYPE:",subType)
      //console.log("Doorname",doorNavName)
      return(
      <div className="subtype-container" key={subType}>
        <h1>{subType}</h1>
        <SlideShow handleCarouselClick={handleCarouselClick} subTypeImgs={doorImgs[subType]} index={index} doorName={doorName} doorNavName={doorNavName}/>
        <Link to={`/${doorType}/${doorNavName}/build`}>
          {/* <button className="build-door-btn continue-btn" onClick={()=> handleBuildBtn(doorNavName,doorName)}>Build</button> */}
        </Link>
      </div>
      )  
    })}
  </div>
  );
}

export default DoorSelector

