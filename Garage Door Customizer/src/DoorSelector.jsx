import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useNavigate} from 'react-router-dom';
import './css/DoorSelector.css'
import Build from './Build.jsx'

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
function DoorSelector({Doors, handleDoorSelection,doorType,doorImgs}) {
  const [doorIndex, setDoorIndex] = useState(0)
  // console.log("DOORS RECIEVED:",Doors)
  // console.log(doorImgs)
  const navigate = useNavigate()
  const handleCarouselClick = (doorNavName,doorName)=>{
    //console.log(doorType,doorNavName,doorName)
    handleDoorSelection(Doors[doorName])
    navigate(`/${doorType}/${doorNavName}/build`)
  }
  const handleBuildBtn = (doorNavName,doorName) =>{
     //console.log(doorNavName,doorName);
  handleDoorSelection(Doors[doorName]) }/*Goes to parent for correct Route*/

  return (
  <div id="centering-div">
    <Link to={`/`}>
      <button className="home-btn" >Home</button>
    </Link>
    
    {Object.keys(doorImgs).map((subType,index) =>{
      const doorName = subType;
      const doorNavName = subType.replace(/ /g, '_').toLowerCase()

      console.log("DOORTYPE:",subType)
      //console.log("Doorname",doorNavName)
      return(
      <div className="subtype-container" key={subType}>
        <h2>{subType}</h2>
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

