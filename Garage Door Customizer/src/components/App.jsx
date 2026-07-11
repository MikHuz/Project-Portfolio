import { useState, useEffect,useRef,useLayoutEffect} from 'react'
import { Routes, Route, Link,useLocation,useNavigate,useParams} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import '../css/index.css'
import '../css/App.css'
import DoorSelector from "./DoorSelector.jsx";
import Build from './Build.jsx'
import SubmittedDoor from './SubmittedDoor.jsx'
import Gallery from './Gallery.jsx'
import Header from './Header.jsx'
import {getDoors} from '../utils/door_data.js'
import {getHomeImages} from '../utils/home_door_images.js'
import {getSubTypeImages } from '../utils/subtype_door_images.js';  
import doorgiLogo from '/logo.png'
/*Home Images*/
const tradDoorsImages = getHomeImages('traditional')
const contDoorsImages = getHomeImages('contemporary')
const carrDoorsImages = getHomeImages('carriage')
/*Home Images*/

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // optional smooth scroll
    });
  }, [pathname]);
  return null;
}
function LoadingPage(){
  return (
  <div id ="loading-page">
    <img src={doorgiLogo} className="page-loading-style"/>
    <h1 className="wave">
    <span>L</span><span>o</span><span>a</span><span>d</span>
    <span>i</span><span>n</span><span>g</span>
    <span>.</span><span>.</span><span>.</span>
    </h1>
  </div>
  )
}
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
      <img src={imgSrc} onClick={handleCarouselClick} className="d-block w-100" alt={`Garage door ${i + 1}`} />
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
    <h1 className="homeCarouselHeader">Traditional</h1>
    <SlideShow id="Carousel-trad"  doorImgs={tradDoorsImages} type={"traditional"}/>
    {/* <Link id="view-btn-link"to="/traditional">
      <button id="view-doors-type-btn" style={{}}>View Traditional Doors</button>
    </Link> */}
    
    <h1 className="homeCarouselHeader">Contemporary</h1>
    <SlideShow id="Carousel-cont" doorImgs={contDoorsImages} type={"contemporary"}/>
    {/* <Link id="view-btn-link" to="/contemporary">
      <button id="view-doors-type-btn" style={{}}>View Contemporary Doors</button>
    </Link>
     */}
    <h1 className="homeCarouselHeader">Carriage</h1>
    <SlideShow id="Carousel-carriage"  doorImgs={carrDoorsImages} type={"carriage"}/>
    {/* <Link id="view-btn-link" to="/carriage">
      <button id="view-doors-type-btn" style={{}}>View Carriage Doors</button>
    </Link> */}
  </>);
}

function PersistentState(key, door){
  if (door){
    //alert("Setting door")
    sessionStorage.setItem(key,JSON.stringify(door));
  }
 /* alert("Returning from local storage")*/
  //console.log("RETURNING LOCAL STORAGE DOOR:")
  //console.log(JSON.parse(localStorage.getItem(key)) )
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null; // fallback
}
// Add this small wrapper to safely render DoorSelector once data is ready
function DoorSelectorWrapper({ doorData, subTypeImages, handleDoorSelection, handleGalleryBtn }) {
  let { type } = useParams();
  type = type?.toLowerCase();
  // Wait for data
  const imagesReady = subTypeImages && Object.keys(subTypeImages).length > 0;
  if (!doorData || !imagesReady) {
    return <LoadingPage />;
  }

  // Validate category
  if (!doorData[type]) {
    return (
      <div className="message-container">
        <div className="door-not-found message-box">
          <h1 className="message-title">Unknown category</h1>
          <p className="message">
            The category <b style={{ color: "black" }}>"{t}"</b> does not match any of our records.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DoorSelector
      Doors={doorData[type]}
      handleDoorSelection={handleDoorSelection}
      handleGalleryBtn={handleGalleryBtn}
      doorType={type}
      doorImgs={subTypeImages[type]}
    />
  );
}
function BuildWrapper({ doorData ,isDataReady,setWaitForAPI,setUserDoorSelections}) {
  const location = useLocation();
  let { type, doorName} = useParams();
  // Wait for data first to avoid false "not found" and extra remounts
  if (!isDataReady || !doorData) {
    return <LoadingPage />;
  }
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
          This door does not exist in our system.<br /><br />
        </h1>
        <p className="message">
         The door <b style={ {color:"black"}}>"{doorName}"</b> in the <b style={ {color:"black"}}>"{type}"</b> collection, does not match any of our records.<br /><br />
         Please check for correct parameter input.
        </p>
      </div>
    </div>
      );
  }
  //console.log("location",location.pathname);
  return <Build  selectedDoor={door} doorType={type}  setWaitForAPI={setWaitForAPI} setUserDoorSelections={setUserDoorSelections}/>;
}

function App() {/*Route generations and door generation*/
  const [selectedDoor,setSelectedDoor] = useState(PersistentState("selectedDoor",null))
  const [subTypeImages, setSubTypeImages] = useState({}); 
  const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));
  const [isDataReady, setIsDataReady] = useState(false);
  const [doorData, setDoorData] = useState(null)
  const [waitforAPI,setWaitForAPI] = useState(false)
  const [showHeader, setShowHeader] = useState(false);
  const [userDoorSelections, setUserDoorSelections] = useState({});  const location = useLocation();
  const navigate = useNavigate();
  //console.log("SELECTED DOOR:",selectedDoor)
  //console.log("FULL DOOR DATA:",doorData)F
console.log("PORT WIDTH:", document.documentElement.scrollWidth <= window.innerWidth)

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setShowHeader(e.clientY < 200); 
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);
  
  function getDeviceType(width){
    if (width < 768) return "mobile";
   // if (width < 1024) return "tablet";
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

  useEffect(() => {
    const fetchAllData = async () => {
      if (!deviceType) return;
      sessionStorage.removeItem("subTypeImages"); 
      const doorsPromise = getDoors();

      const imagesPromise = (async () => {
        const newImages = {
          traditional: await getSubTypeImages("traditional", deviceType),
          contemporary: await getSubTypeImages("contemporary", deviceType),
          carriage: await getSubTypeImages("carriage", deviceType),
        };

        setSubTypeImages(newImages);
        sessionStorage.setItem("subTypeImages", JSON.stringify(newImages));
      })();
      
      const [doorsResult] = await Promise.all([doorsPromise, imagesPromise]);
      setDoorData(doorsResult);
      setIsDataReady(true);
    };

    fetchAllData();
  }, [deviceType]);
  
useLayoutEffect(() => {
  // Scroll resets
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  ['#options-section', '#order-container', '#build-page-grid'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.scrollTop = 0;
  });

  // Fade effect
  document.body.classList.add('page-fade');
  const timeout = setTimeout(() => {
    document.body.classList.remove('page-fade');
  }, 600);
  return () => clearTimeout(timeout);
}, [location.pathname]);

  const handleDoorSelection = (door) =>{
    setSelectedDoor(door);
    PersistentState("selectedDoor",door)
  }/*Chosen door in DoorSelector to sent to Build*/
  /*These types are for dynamic route generation*/
  const handleGalleryBtn = (doorType,subType) => {
    handleDoorSelection(doorData[doorType][subType]);
    console.log("DOOR FROM GALLERY:", doorData[doorType][subType]);
    navigate(`/${doorType}/${subType.replace(/ /g, '_').toLowerCase()}/gallery`);
  }
  const doorTypes = {traditional:["raised_panel","stamped_carriage_house","stamped_shaker","recessed_panel"], 
                    contemporary:["sterling","planks","skyline_flush","aluminum"],
                    carriage:["shoreline","steel_overlay","wood_overlay","fiber_glass_overlay","stamped_carriage_house","stamped_shaker","recessed_panel"]}

  // let routePaths = []
  // for (const type in doorTypes){
  //   generatedRoutes.push(<Route  path={`${type}/`} 
  //                         element={<DoorSelector Doors={doorData[type]} handleDoorSelection={handleDoorSelection} 
  //                                   handleGalleryBtn={handleGalleryBtn}doorType={type} doorImgs={subTypeImages[type]}/>} />)
  //   routePaths.push(`${type}/`)

  //   for (const doorName of doorTypes[type]){
  //     // generatedRoutes.push(<Route path={`${type}/${doorName}/build`} 
  //     //                       element={<Build selectedDoor={selectedDoor} doorType={type}/>} />)
  //     routePaths.push(`${type}/${doorName}/build`)
  //   }
  // }
  
  // Remove the dynamic route construction that depends on doorData/subTypeImages being ready.
  // Instead, define routes up-front and let wrappers decide what to show.
  const generatedRoutes = [
    // Category list (traditional, contemporary, carriage, etc.)
    <Route
      key="type-root"
      path=":type"
      element={
        <DoorSelectorWrapper
          doorData={doorData}
          subTypeImages={subTypeImages}
          handleDoorSelection={handleDoorSelection}
          handleGalleryBtn={handleGalleryBtn}
        />
      }
    />,

    // Gallery (safe to render; Gallery receives images; if it needs loading, you can create a similar wrapper)
    <Route
      key="gallery"
      path=":type/:doorName/gallery"
      element={<Gallery galleryImages={subTypeImages} />}
    />,

    // Build entry
    <Route
      key="build"
      path=":type/:doorName/build"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,

    // Optional params variants
    <Route
      key="build-size"
      path=":type/:doorName/build/:size"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
    <Route
      key="build-size-design"
      path=":type/:doorName/build/:size/:design"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
    <Route
      key="build-size-design-ins"
      path=":type/:doorName/build/:size/:design/:insType"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
    <Route
      key="build-5"
      path=":type/:doorName/build/:size/:design/:insType/:colorType/:color"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
    <Route
      key="build-7"
      path=":type/:doorName/build/:size/:design/:insType/:colorType/:color/:glassType/:glass"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
    <Route
      key="build-8"
      path=":type/:doorName/build/:size/:design/:insType/:colorType/:color/:glassType/:glass/:inserts"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
    <Route
      key="build-9"
      path=":type/:doorName/build/:size/:design/:insType/:colorType/:color/:glassType/:glass/:inserts/:position"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
    <Route
      key="build-10"
      path=":type/:doorName/build/:size/:design/:insType/:colorType/:color/:glassType/:glass/:inserts/:position/:hardware"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
    <Route
      key="build-10"
      path=":type/:doorName/build/:size/:design/:insType/:colorType/:color/:glassType/:glass/:inserts/:position/:hardware/:motor"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />,
       <Route
      key="build-11"
      path=":type/:doorName/build/:size/:design/:insType/:colorType/:color/:glassType/:glass/:inserts/:position/:hardware/:motor/:installation"
      element={<BuildWrapper doorData={doorData} isDataReady={isDataReady} setUserDoorSelections={setUserDoorSelections} setWaitForAPI={setWaitForAPI} />}
    />
    
    
  ];

  //console.log("Registered paths:", generatedRoutes);
  //console.log("ROUTES:", routePaths)

 return (<>
    {/* {showHeader && <Header handleDoorSelection={handleDoorSelection}/>} */}
    <ScrollToTop />
    <Routes>
      <Route  path="/" element={<HomePage />} />
      <Route  path="/submittedDoor" element={<SubmittedDoor 
        email="help@doorgi.com" phone="408-256-2727" location="177 Mayhew Way, Concord"/>} 
      />
      {generatedRoutes}

      {/* Optional: while data is loading on a deep link, avoid console "No routes matched" by showing loading */}
      {/* <Route path="*" element={(!isDataReady || Object.keys(subTypeImages).length === 0) ? <LoadingPage /> : <HomePage />} /> */}
    </Routes>

    {deviceType === "mobile" && (!isDataReady || waitforAPI) && (
      <LoadingPage />
    )}
    {/*<Footer/>*/}
  </>);
}

export default App;
