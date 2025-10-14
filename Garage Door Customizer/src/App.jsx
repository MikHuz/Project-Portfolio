import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useLocation,useNavigate,useParams} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './css/index.css'
import './css/Home.css'
import DoorSelector from "./DoorSelector.jsx";
import Build from './Build.jsx'
import SubmittedDoor from './SubmittedDoor.jsx'
import {getDoors} from './door_data.js'
import {getHomeImages} from './home_door_images.js'
import {getSubTypeImages } from './subtype_door_images.js';  
import RaisedPanel from './assets/door_imgs/traditional/Raised_Panel.jpg';
import doorgiLogo from '/logo.png'
/*Home Images*/
const tradDoorsImages = getHomeImages('traditional')
const contDoorsImages = getHomeImages('contemporary')
const carrDoorsImages = getHomeImages('carriage')
/*Home Images*/

function SlideShow(props){ /*Slideshow for each doorType carousel*/
  const navigate = useNavigate()
    useEffect(() => {
      const carouselEl = document.getElementById(props.id);
      if (carouselEl) {
        /*new window.bootstrap.Carousel(carouselEl, {
          interval: 3000, 
          ride: 'carousel' 
        });*/
      }
  }, [props.id]);
  const handleCarouselClick = () => {
    navigate(`/${props.type}`)
  }
  let doorElements = props.doorImgs.map((imgSrc, i) => (
    <div id="homeItemSlide" className={`carousel-item ${i === 0 ? 'active' : ''} `} key={i}>
      <img src={imgSrc} onClick={handleCarouselClick}className="d-block w-100" alt={`Garage door ${i + 1}`} />
      {/*<div class="carousel-caption" style={{bottom:"0px"}}>
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>*/}
    </div>
  ));

  return (
    <>
      <div id={props.id} className="carousel carousel-dark slide homeCarousel">
        <div className="carousel-inner" id="homeCarouselInner">
          {doorElements}
        </div>

        <button id="homePrevBtn" className="carousel-control-prev" type="button" data-bs-target={`#${props.id}`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button id="homeNextBtn" className="carousel-control-next" type="button" data-bs-target={`#${props.id}`} data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}

function HomePage() {
  return (<>  
    <h2 className="homeCarouselHeader">Traditional</h2>
    <SlideShow id="Carousel-trad"  doorImgs={tradDoorsImages} type={"traditional"}/>
    {/* <Link id="view-btn-link"to="/traditional">
      <button id="view-doors-type-btn" style={{}}>View Traditional Doors</button>
    </Link> */}
    
    <h2 className="homeCarouselHeader">Contemporary</h2>
    <SlideShow id="Carousel-cont" doorImgs={contDoorsImages} type={"contemporary"}/>
    {/* <Link id="view-btn-link" to="/contemporary">
      <button id="view-doors-type-btn" style={{}}>View Contemporary Doors</button>
    </Link>
     */}
    <h2 className="homeCarouselHeader">Carriage</h2>
    <SlideShow id="Carousel-carriage"  doorImgs={carrDoorsImages} type={"carriage"}/>
    {/* <Link id="view-btn-link" to="/carriage">
      <button id="view-doors-type-btn" style={{}}>View Carriage Doors</button>
    </Link> */}
  </>);
}

function PersistentState(key, door){
  if (door){
    //alert("Setting door")
    localStorage.setItem(key,JSON.stringify(door));
  }
 /* alert("Returning from local storage")*/
  //console.log("RETURNING LOCAL STORAGE DOOR:")
  //console.log(JSON.parse(localStorage.getItem(key)) )
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null; // fallback
}

function BuildWrapper({ doorData }) {
  let { type, doorName} = useParams();
  type = type.toLowerCase()
  doorName = doorName.toLowerCase().replace(/[_\-.]/g, " ");
  let doorDataName = ""
  let words = doorName.split(" ")
  //console.log(type)
  for (let word of words){
    doorDataName += word.charAt(0).toUpperCase() + word.slice(1) + " "
    //console.log("WORD:", word)
  }
  doorDataName = doorDataName.slice(0,-1)
  // console.log("LOOKING FOR :",doorDataName)
  // console.log(doorData)
  const door = doorData?.[type]?.[doorDataName] || null;

  if (!door) {
    return (
      <div className="message-container">
       <div className="door-not-found message-box">
        <h1 className="message-title">
          This door does not exist in our system
        </h1>
        <p className="message">
         The door <b style={ {color:"black"}}>"{doorName}"</b> of category <b style={ {color:"black"}}>"{type}"</b> does not match any records<br />
         Please check for correct parameter input.
        </p>
      </div>
    </div>
      );
  }

  return <Build selectedDoor={door} doorType={type} />;
}

function App() {/*Route generations and door generation*/
  const [selectedDoor,setSelectedDoor] = useState(PersistentState("selectedDoor",null))
  const [subTypeImages, setSubTypeImages] = useState({}); 
  const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));
  const [isDataReady, setIsDataReady] = useState(false);
  const [doorData, setDoorData] = useState(null)
  const location = useLocation();
  //console.log("SELECTED DOOR:",selectedDoor)
  //console.log("FULL DOOR DATA:",doorData)F

  function getDeviceType(width){
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }
  useEffect(() => {/*listener for window viewport change*/
    const handleResize = () => {
      const newType = getDeviceType(window.innerWidth);
      // update only if type actually changes
      //console.log("Resize fired, newType:", newType);
      setDeviceType(prev => (prev !== newType ? newType : prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {/*Load carousel images for DoorSelector and fetches door prices*/
      // localStorage.removeItem("doorsData")
    const fetchAllData = async ()=>{
      const doorsPromise = getDoors();
      // const cachedDoors = localStorage.getItem("doorsData");
      // if (!cachedDoors) {
      //   // First-time fetch
      //   getDoors().then(allDoors => {
      //     setDoorData(allDoors);
      //     // 🗄 Cache it
      //     //alert("first doors fetch")
      //     localStorage.setItem("doorsData", JSON.stringify(allDoors));
      //   });
      // }
    const imagesPromise = ( async () => {
        // localStorage.removeItem("subTypeImages")
        const cached = localStorage.getItem("subTypeImages");
        if (cached) setSubTypeImages(JSON.parse(cached));

        const newImages = {
          traditional: await getSubTypeImages("traditional", deviceType),
          contemporary: await getSubTypeImages("contemporary", deviceType),
          carriage: await getSubTypeImages("carriage", deviceType),
        };

        setSubTypeImages(newImages);
        localStorage.setItem("subTypeImages", JSON.stringify(newImages));
      } )();
    const [doorsResult] = await Promise.all([doorsPromise, imagesPromise]);
    setDoorData(doorsResult)
    setIsDataReady(true); // both are done
    }
    fetchAllData()
  }, [deviceType]);
  
  useEffect(() => {/*Page fade effect fro all components*/
    //alert("Changing page")
    document.body.classList.add("page-fade");
    const timeout = setTimeout(() => {
      document.body.classList.remove("page-fade");
    }, 600);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const handleDoorSelection = (door) =>{
    setSelectedDoor(door);
    PersistentState("selectedDoor",door)
  }/*Chosen door in DoorSelector to sent to Build*/
  /*These types are for dynamic route generation*/
  const doorTypes = {traditional:["raised_panel","stamped_carriage_house","stamped_shaker","recessed_panel"], 
                    contemporary:["sterling","planks","skyline_flush","aluminum"],
                    carriage:["shoreline","steel_overlay","wood_overlay","fiber_glass_overlay","stamped_carriage_house","stamped_shaker","recessed_panel"]}
  let generatedRoutes = []
  let routePaths = []
  // console.log(subTypeImages["contemporary"])
  if (doorData!= null && Object.keys(subTypeImages).length > 0) {

  for (const type in doorTypes){/*Route for each door type*/
    generatedRoutes.push(<Route path={`${type}/`} 
                          element={<DoorSelector Doors={doorData[type]} handleDoorSelection={handleDoorSelection} 
                                    doorType={type} doorImgs={subTypeImages[type]}/>} />)
    routePaths.push(`${type}/`)

    for (const doorName of doorTypes[type]){
      // generatedRoutes.push(<Route path={`${type}/${doorName}/build`} 
      //                       element={<Build selectedDoor={selectedDoor} doorType={type}/>} />)
      routePaths.push(`${type}/${doorName}/build`)
    }
  }
  generatedRoutes.push(
    <Route path={`:type/:doorName/build`} /*Route for doorType/doorName/any preselected options*/
    element={<BuildWrapper doorData={doorData} />}
    />
  );

  generatedRoutes.push(
    <Route path={`:type/:doorName/build/:size/:design/:color`} /*Route for doorType/doorName/any preselected options*/
    element={<BuildWrapper doorData={doorData} />}
    />
  );

  }
  //console.log("ROUTES:", routePaths)

  return (<>
  {/*<Header/>*/}
    {deviceType!="mobile" ?
    <Routes>
      <Route path="/" element={<HomePage />} />
       <Route path="/submittedDoor" element={<SubmittedDoor 
        email="doorgidoors@gmail.com" phone="925-245-2345" location="177 Mayhew Way Concord"/>} 
        />
      {generatedRoutes}
    </Routes>
    :
    isDataReady ?
    <Routes>
      <Route path="/" element={<HomePage />} />
       <Route path="/submittedDoor" element={<SubmittedDoor 
        email="doorgidoors@gmail.com" phone="925-245-2345" location="177 Mayhew Way Concord"/>} 
        />
      {generatedRoutes}
    </Routes>
    :
    <div id ="loading-page">
      <img src={doorgiLogo} className="loading-style"/>
      <h1 className="wave">
      <span>L</span><span>o</span><span>a</span><span>d</span>
      <span>i</span><span>n</span><span>g</span>
      <span>.</span><span>.</span><span>.</span>
      </h1>
    </div>
    }
  {/*<Footer/>*/}
  </>);
}

export default App;
