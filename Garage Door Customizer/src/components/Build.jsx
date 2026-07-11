import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useLocation,useNavigate,useParams} from 'react-router-dom';
import { ZoomIn } from "lucide-react";
import '../css/Build.css'
import '../css/index.css'
import '../css/message_container.css'
import '../css/Order.css'
import DoorSelector from "./DoorSelector.jsx";
import Order from "./Order.jsx";
import doorgiLogo from '/logo.png'
import doorgiWithTools from '/doorgi-with-tools.png'
import shortSize from '../assets/door_imgs/traditional/ShortPanel.jpg'
import doubleSize from '../assets/door_imgs/traditional/LongPanel.jpg'
/*Aluminum double images*/
import anodizedClear from '../assets/door_imgs/contemporary/anodized-clear.jpg'
import anodizedWhite from '../assets/door_imgs/contemporary/anodized-white.png'
import anodizedBlack from '../assets/door_imgs/contemporary/anodized-black.png'
import bronzeClear from '../assets/door_imgs/contemporary/bronze-clear.jpg'
import bronzeWhite from '../assets/door_imgs/contemporary/bronze-white.png'
import bronzeBlack from '../assets/door_imgs/contemporary/bronze-black.png'
import blackClear from '../assets/door_imgs/contemporary/black-clear.jpg'
import blackWhite from '../assets/door_imgs/contemporary/black-white.png'
import blackBlack from '../assets/door_imgs/contemporary/black-black.png'
/*Aluminum double images*/
/*Aluminum single images*/
import smallanodizedClear from '../assets/door_imgs/contemporary/small-anodized-clear.jpg'
import smallanodizedWhite from '../assets/door_imgs/contemporary/small-anodized-white.png'
import smallanodizedBlack from '../assets/door_imgs/contemporary/small-anodized-black.png'
import smallbronzeClear from '../assets/door_imgs/contemporary/small-bronze-clear.jpg'
import smallbronzeWhite from '../assets/door_imgs/contemporary/small-bronze-white.png'
import smallbronzeBlack from '../assets/door_imgs/contemporary/small-bronze-black.png'
import smallblackClear from '../assets/door_imgs/contemporary/small-black-clear.jpg'
import smallblackWhite from '../assets/door_imgs/contemporary/small-black-white.png'
import smallblackBlack from '../assets/door_imgs/contemporary/small-black-black.png'
/*Aluminum single images*/
import no_window_img from '../assets/Glass/no_window_image.jpg'
import window_img from '../assets/Glass/window_image.jpg'

import Omit from '../assets/motors/Omit.png';
import EssentialMotor from '../assets/Motors/Basic.png';
import PlusMotor from '../assets/Motors/Plus.png';
import PremiumMotor from '../assets/Motors/Premium.png';
import EliteMotor from '../assets/Motors/Elite.png';
const commonMotors = 
  {"Omit": ["",Omit,0,"null"],
  "Essential": ["LiftMaster 2420L",EssentialMotor,699,"https://doorgi.com/garage-door-openers/lm-2420l/"],
  // "Plus":["LiftMaster 65080L",PlusMotor,849,"https://doorgi.com/garage-door-openers/lm-6580l/"],
  "Premium":["LiftMaster 6690L",PremiumMotor,999,"https://doorgi.com/garage-door-openers/lm-6690l/"],
  "Elite":["LiftMaster 98022MC",EliteMotor,1299,"https://doorgi.com/garage-door-openers/lm-98022/"]}
const commonHardware = {"Standard Spade Handles and Hinges":75.12,"Standard Barcelona Handles and Hinges":75.12, "Barcelona Pull Rings and Corner Brackets":184.94, "Wrought Iron Handles and Hinges":224.4}
const archedDesigns= new Set(["10A","11A","12A","13A","14A","15A","30A","31A","32A","33A","34A","35A"])
const nonArchedDesigns= new Set(["10","11","12","13","14","15","30","31","32","33","34","35"])
const singleRowDesigns = new Set(["30","30A","31","31A","32","32A","33","33A","34","34A","35","35A"])
const installationPrice = {"Single":595,"Double":695}
const insertNameDisplayMap = {
  "2 piece Sunburst": "2pc Sunburst",
  "4 piece Sunburst": "Sunburst",
  "8 piece Sunburst": "8pc Sunburst",
  "2 piece Arched Stockton": "A. Stockton",
  "4 piece Arched Stockton": "A. Stockton",
  "2 piece Arched Madison": "A. Madison",
  "4 piece Arched Madison": "A. Madison",
  "No Inserts": "Plain",
}
const hardwareURLToAPIName = {
  "Barcelona Set":"Standard Barcelona Handles and Hinges",
  "Barcelona Set 2": "Barcelona Pull Rings and Corner Brackets",
  "Iron Set":"Wrought Iron Handles and Hinges",
  "Spade Set":"Standard Spade Handles and Hinges"
}
const hardwareAPIToURLName = {
  "Standard Barcelona Handles and Hinges": "Barcelona Set",
  "Barcelona Pull Rings and Corner Brackets": "Barcelona Set 2",
  "Wrought Iron Handles and Hinges": "Iron Set",
  "Standard Spade Handles and Hinges": "Spade Set"
}
const twoTonedImgNames = {
  "Cedar Black Two Tone":"Cedar Black",
  "Driftwood Black Two Tone":"Driftwood Black",
  "Dark Oak Black Two Tone":"Dark Oak Black",
  "Walnut Black Two Tone":"Walnut Black"
}
const urlWoodNameToAPIName = {
  "Cedar Black": "Cedar Black Two Tone",
  "Driftwood Black": "Driftwood Black Two Tone",
  "Dark Oak Black": "Dark Oak Black Two Tone",
  "DarkOak Black": "Dark Oak Black Two Tone",
  "Walnut Black": "Walnut Black Two Tone"
}
function findAluminumImage(size="Double", color, window){
  size = size.toLowerCase();
  color = color.toLowerCase();
  window = window.toLowerCase();
  //alert("Finding aluminum image for size " + size + " color:" + color + " and window:" + window)
  if (color=="anodized" && window=="plain"){
    return size=="single" ? smallanodizedClear:anodizedClear;
  }
  if (color=="anodized" && window=="frosted"){
    return size=="single" ? smallanodizedWhite:anodizedWhite;
  }
  if (color=="anodized" && window=="tinted"){
    return size=="single" ? smallanodizedBlack:anodizedBlack;
  }
  if (color=="brown" && window=="plain"){
    return size=="single" ? smallbronzeClear:bronzeClear;
  }
  if (color=="brown" && window=="frosted"){
    return size=="single" ? smallbronzeWhite:bronzeWhite;
  }
  if (color=="brown" && window=="tinted"){
    return size=="single" ? smallbronzeBlack:bronzeBlack;
  }
  if (color=="black" && window=="plain"){
    return size=="single" ? smallblackClear:blackClear;
  }
  if (color=="black" && window=="frosted"){
    return size=="single" ? smallblackWhite: blackWhite;
  }
  if (color=="black" && window=="tinted"){
    return size=="single" ? smallblackBlack:blackBlack;
  } 
  return null;
}

function Designs(props){
  //console.log("DESIGN STYLE:", props.designStyle)
  //console.log("INSIDE COMPONENT:",props.designs)
  const designStyle = props.designStyle ? props.designStyle : null
  let designDivs = null
  let isCarriage = false;
  if (props.door=="SteelOverlay" || props.door=="Shoreline"||props.door=="FiberGlassOverlay" || props.door=="WoodOverlay"){
    isCarriage = true;
  }
  designDivs = Object.entries(props.designs).map(([design,url]) =>{
    let displayDesignName = design;
    if (design=="No Or Short Windows"){
      displayDesignName="Small"
    } 
    else if(design=="Long Windows"){
      displayDesignName="Standard"
    }
    else if (props.door=="SkylineFlush" && design=="Narrow" && props.selectedInsulation=="Standard"){
      return null;/*Standard insulation doesnt support narrow/stylelite windows*/
    }
    return (
      <div className={`design-box ${isCarriage ? 'design-box-small':''}`} key={design}>
        <h3>{displayDesignName}</h3>
        <img  
          id="design-img" 
          className={`${designStyle === design ? "selected-design" : ""}`}
          src={url}
          alt={design}
          onClick={() =>props.handleDesign(design)}/>
      </div>)})
  //console.log(designDivs)
  //console.log("ID of design door:",props.door)
 return(
  <div id="design-container">
    <h2>{props.door == "Planks" || props.door == "SkylineFlush" ? "Window Size" : "Design"}</h2>
    {designDivs}
  </div>)
}

function Insulations(props){
  const { insulations, selectedInsulation, handleInsulationType } = props;
  const [openDialog, setOpenDialog] = useState(null); 
  //console.log("Selected",selectedInsulation)
  const isDesktop = () => {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  };
  const handleHover = (type) => {
    if (isDesktop()) {
      setOpenDialog(type);
    }
  };
  const handleHoverLeave = (type) => {
    if (isDesktop()) {
      setOpenDialog(null); 
    }
  };
  const toggleDialog = (type) => {
    if (!isDesktop()){
      setOpenDialog(type==openDialog ? null : type);/*For buttons clicks on mobile*/
    }
  };
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".insulation-dialog") &&
          !e.target.closest(".insulation-dialog-btn")) {
        toggleDialog(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div id="insulation-container">
    <h2>Insulation</h2>
    <div className={`insulation-box ${insulations.Standard==null ? "void-box": ""}`}>
      <h3 className="insulation-header">
        Standard
        <button
          className={`insulation-dialog-btn ${openDialog=="Standard"? "bg-orange-main": ""}`}
          onMouseEnter={() => handleHover("Standard")}
          onMouseLeave={() => handleHoverLeave("Standard")}
          onClick={() => toggleDialog("Standard")}
          onBlur={()=>toggleDialog(null)}
          disabled={insulations.Standard==null ? true:false}
          >?</button>

        {openDialog === "Standard" &&
      
          <div id="ins-standard-dialog" className="insulation-dialog">
            <ul>
              <li>Less Insulation</li>
              <li>Less Thermal Rating</li>
              <li>1 Sided Steel</li>
              <li>Light Duty Steel</li>
              {((props.door.collection=="Traditional" || props.door.collection=="Contemporary") && props.door.id!="Aluminum" && props.door.id!="Sterling") 
              && <li>No Woodtones</li>}
              {props.door.id=="SkylineFlush" && <li>No Narrow Windows</li>}
              <li>Limited Options</li>
            </ul>
            {/* <button onClick={closeDialog}>Close</button> */}
          </div>
        }

      </h3>
      <img src={insulations.StandardImg}  onClick={()=>handleInsulationType("Standard")}
           className={selectedInsulation === "Standard" ? "selected-ins" : ""}></img>
    </div>
    <div className='insulation-box'>
      <h3 className="insulation-header">
        Premium
         <button
          className={`insulation-dialog-btn ${openDialog=="Premium"? "bg-orange-main": ""}`}
          onMouseEnter={() => handleHover("Premium")}
          onMouseLeave={() => handleHoverLeave("Premium")}
          onClick={() => toggleDialog("Premium")}
          onBlur={()=>toggleDialog(null)}
          disabled={insulations.Premium==null ? true:false}
          >?</button>

          {openDialog === "Premium" && 
        
            <div id="ins-premium-dialog" className="insulation-dialog">
            <ul>
              <li>Good Insulation</li>
              <li>Great Thermal Rating</li>
              <li>2 Sided Steel</li>
              <li>Medium Duty Steel</li>
              <li>All Options Available</li>
            </ul>
            {/* <button onClick={closeDialog}>Close</button> */}
          </div>
         
          }
      </h3>
      <img src={insulations.PremiumImg}  onClick={()=>handleInsulationType("Premium")} alt="Premium insulation"
          className={selectedInsulation === "Premium" ? "selected-ins" : ""}></img>
    </div>
  </div>
  )
}

function Colors(props) {
  const IconColor = props.IconColor
  let doorCombo = props.doorCombination
  // const [hasWood] = useState(Object.keys(props.woods).length == 0 ? false:true)
  // const [hasColor] = useState(Object.keys(props.colors).length == 0 ? false:true)
  const [colorType,setColorType] = useState(props.colorType)
  // console.log("HAS COLOR?:", hasColor)
  // console.log(colorType)
  const handleColor = (event, color, type) => {
    console.log("Color type:",type)
    props.handleColor(color,type);
  };

  console.log("DOOR COMBO COLOR:",doorCombo)
  let colorDoorCombo = doorCombo
  let woodsDoorCombo = doorCombo;
  if (doorCombo.includes("Narrow") && doorCombo.includes("Standard")){
    colorDoorCombo = doorCombo.replace("Narrow","LongWindows");
  }
  let colorDivs = null
  if(props.colors[colorDoorCombo]){
    // alert("Has colors")
    let correctColors = {}
    if (props.colors[colorDoorCombo] =="common"){
      //console.log("common")
      correctColors = props.commonSolidColors
    }
    else{
      correctColors = props.colors[colorDoorCombo]
    }
    colorDivs = Object.entries(correctColors).map(([colorName, hexCode]) => {
      let background= {}
      let twoToned= props.door=="SteelOverlay" ? true : false;
      if (hexCode==null){
        return
      }
      if(!hexCode.includes("#")){
        background={ backgroundImage: `url(${hexCode})`}
      }
      else if (colorName.includes("with")){
        twoToned=true;
        //console.log("Two toned color")
        const [firstColor, secondColor] = hexCode.split(",");
        background= {
        background: `linear-gradient(to right, ${firstColor}, ${secondColor})`
      };
      }else{
         background = {backgroundColor:hexCode}
      }
      /*check is color name contains "Woodgrain" in the string*/ 

      return(
      <div className={`color-box ${colorName.includes("Woodgrain") ? 'woodgrain' : ''} ${twoToned ? 'two-toned' : ''}`} key={colorName}>
        <h5>{colorName}</h5>
        <div
          style={background}
          className={IconColor === colorName ? 'selected' : ''}
          onClick={(event) => handleColor(event, colorName, "Solid Color")}
        />
      </div>
      
    ) });
  }
  else{
    //alert("No colors for this door combo: " + doorCombo)
  }
  let woodDivs = null
  if (doorCombo in props.woods){
    //console.log("has woods")
    let correctWoods = {}
    if (props.woods[doorCombo] =="common"){
      //console.log("common")
      correctWoods = props.commonWoodTones
    }
    else{
      correctWoods = props.woods[doorCombo]
    }
    let spaceHeader = false
    if (props.door=="Shoreline"){
      spaceHeader=true
    }
    woodDivs = Object.entries(correctWoods).map( ([woodName,woodUrl]) => {
      let useImg = false;
      let woodDisplayName = woodName in twoTonedImgNames ? twoTonedImgNames[woodName] : woodName;
      if (props.door=="Shoreline" && woodName.includes("Black")) {
        useImg = true
      }
      return(
      <div className={`color-box ${spaceHeader ? 'use-img-header' : ''}`} key={woodName}>
        <h5>{woodDisplayName}</h5>
        {useImg && <img src={woodUrl}  className={IconColor === woodName ? 'selected' : ''}
            onClick={(event) => handleColor(event, woodName,"Accents Woodtones")}/>}
        {!useImg && <div
          style={{  backgroundImage: `url(${woodUrl})`}}
          className={IconColor === woodName ? 'selected' : ''}
          onClick={(event) => handleColor(event, woodName,"Accents Woodtones")}
        />}
      </div>
      ) } )
  }
  console.log(colorDivs)
return(
<> 
 <div id="colors-container">
  {colorDivs &&
    <div >
      <h2>Color</h2>
      {colorDivs} 
    </div>}
  {woodDivs &&
    <div>
      <h2>Woodtone</h2>
      {woodDivs} 
    </div>}
  </div>
  </> )
}

function Windows(props){
  if (props.door === "Aluminum") {
    //console.log("Skipping window options for Aluminum door");
    //return null;
  }
  // Derive everything from props (controlled component)
  const selectedWindow   = props.glass ?? null;
  const glassType        = props.glassType ?? "Glass";
  const selectedInsert   = props.insert ?? null;
  const fallbackPosition = props.door !== "Sterling" ? "FIRST ROW" : "TOP ROW";
  const selectedPosition = props.position || fallbackPosition;
  const selectedDesign   = props.design;
  const doorCombo        = props.doorCombination;
  //alert("selected glass:" + selectedWindow)
  const handleWindow = (glass, type, position) => {
    const pos = position ?? selectedPosition; // keep current position if not provided
    const resolvedGlassType = props.door === "Sterling" ? "Infinity Windows" : type;
    props.handleWindow(glass, resolvedGlassType, selectedInsert, pos);
  };

  const handleInsert = (insert) => {
    props.handleWindow(selectedWindow, glassType, insert, selectedPosition);
  };

  const handlePosition = (position) => {
    if (selectedWindow != null) {
      props.handleWindow(selectedWindow, glassType, selectedInsert, position);
    }
  };

  // Positions
  let positionDivs = null;
  if (props.windows.position && Object.keys(props.windows.position).length !== 0){
    positionDivs = Object.entries(props.windows.position).map(([position, url]) => (
      <div
        key={position}
        className="position-box"
        onClick={() => handlePosition(position.toUpperCase())}
      >
        <h6>{position}</h6>
        <img
          src={url}
          className={selectedPosition === position.toUpperCase() ? 'selected-position' : ''}
        />
      </div>
    ));
  }

  // Glass
  let glassDivs = null;
  if (props.windows.glass && doorCombo in props.windows.glass){
    const correctGlass = props.windows.glass[doorCombo] === "common"
      ? props.windows.commonGlass
      : props.windows.glass[doorCombo];

    glassDivs = Object.entries(correctGlass).map(([glass, url]) => {
      if (url == null) return null;
      let glassDisplayName = glass
      if (props.door === "Aluminum"){
        if ( glass=="Plain"){
          glassDisplayName = "Clear"
        }
        else if(glass=="Tinted"){
          glassDisplayName = "Black"
        }
        else if (glass=="Frosted"){
          glassDisplayName = "White"
        }
      }
      const isSelected = selectedWindow === glass;
      return (
        <div
          key={glass}
          className={`window-box ${isSelected ? 'selected-glass' : ''}`}
          onClick={() => handleWindow(glass, "Glass")}
        >
          <h5>{glassDisplayName}</h5>
          <div
            style={{ backgroundImage: `url(${url})` }}
            className={isSelected ? 'selected-glass' : ''}
          />
        </div>
      );
    });
  }
  // Designer glass (if applicable)
  const designerDivs = props.windows.designerGlass
    ? Object.entries(props.windows.designerGlass).map(([glass, url]) => {
        const isSelected = selectedWindow === glass;
        return (
          <div
            key={glass}
            className={`window-box ${isSelected ? 'selected-glass' : ''}`}
            onClick={() => handleWindow(glass, "Designer Glass")}
          >
            <h5>{glass}</h5>
            <div
              style={{ backgroundImage: `url(${url})` }}
              className={isSelected ? 'selected-glass' : ''}
            />
          </div>
        );
      })
    : null;

  // StyleLite for Narrow
  const styleLiteDivs = (props.windows?.styleLite != null && selectedDesign === "Narrow")
    ? Object.entries(props.windows.styleLite).map(([glass, url]) => {
        const glassName = glass.split(" ")[1];
        const isSelected = selectedWindow === glass;
        return (
          <div
            key={glass}
            className={`window-box ${isSelected ? 'selected-glass' : ''}`}
            onClick={() => handleWindow(glass, "StyleLite")}
          >
            <h5>{glassName}</h5>
            <div
              style={{ backgroundImage: `url(${url})` }}
              className={isSelected ? 'selected-glass' : ''}
            />
          </div>
        );
      })
    : null;

  // Inserts
  let insertDivs = null;
  if (props.windows.inserts){
    let insertsObj = null;
    let insertsDesignKey = selectedDesign
    if (archedDesigns.has(selectedDesign)){
      insertsDesignKey = "archedDesigns"
      // console.log("Arched:",props.windows.inserts)
      // console.log("Arched Design",props.windows.inserts[insertsDesignKey])
    }
    else if(nonArchedDesigns.has(selectedDesign)){
      //alert("non arched design selected:" + selectedDesign)
      insertsDesignKey = "nonArchedDesigns"
      // console.log("Non Arched:",props.windows.inserts)
      // console.log("Non Arched Design",props.windows.inserts[insertsDesignKey])
    }
    insertsObj = "Any Design" in props.windows.inserts
      ? props.windows.inserts["Any Design"]
      : props.windows.inserts[insertsDesignKey];
    // insertsObj = "Any Glass" in insertDesignObject ? insertDesignObject["Any Glass"]
    //                : insertDesignObject[selectedWindow];

    if (insertsObj){
      insertDivs = Object.entries(insertsObj).map(([insert, url]) => {
        if (url == null) return null;

        if (props.design!="Short Panel" && insert=="8 piece Sunburst"){
          return null
        }
        const isSelected = selectedInsert === insert;
        let insertDisplayName = insert;
        if (insert in insertNameDisplayMap) {
          insertDisplayName = insertNameDisplayMap[insert];
        }
        return (
          <div key={insert} className="insert-box">
            <h5>{insertDisplayName}</h5>
            <div
              style={{ backgroundImage: `url(${url})` }}
              className={isSelected ? "selected-insert" : ""}
              onClick={() => handleInsert(insert)}
            />
          </div>
        );
      });
    }
  }

  return (
    <>
      <div id="windows-container">
        {positionDivs && (
          <div id="window-positions">
            <h2>Window Position</h2>
            {positionDivs}
          </div>
        )}
        <div id="windows">
          {glassDivs && (
            <div>
              <h3>Glass
              {/* {props.door=="Aluminum" && 
              <p id="aluminum-glass-note">*Refer to <a href="https://doorgi.com/doors/contemporary/full-view-aluminum/"   
              target="_blank" rel="noopener noreferrer"> Doorgi.com</a> 
              to visualize Aluminum glass options
              </p>} */}
              </h3>
        
              {glassDivs}
            </div>
          )}
          {designerDivs && (
            <div>
              <h3>Designer Glass</h3>
              {designerDivs}
            </div>
          )}
          {styleLiteDivs && (
            <div>
              <h3>Glass</h3>
              {styleLiteDivs}
            </div>
          )}
        </div>
      </div>
      {insertDivs && (
        <div id="inserts">
          <h2>Window Designs</h2>
          {insertDivs}
        </div>
      )}
    </>
  );
}

function Hardware(props){
  const selectedHardware   = props.chosenHardwareSet ?? null;
  let isCarriage = false;
  const hardwareDivs = Object.entries(props.hardware).map(([hardware, [displayName, url]]) =>{
  
    return (
      <div id="hardware-box"className={`design-box design-box-small`} key={hardware}>
        <h3>{displayName}</h3>
        <img
          className={`${selectedHardware === hardware ? "selected-hardware" : ""}`}
          src={url}
          alt={displayName}
          onClick={() =>props.handleHardware(hardware)}/>
      </div>)})
  //console.log(designDivs)
  //console.log("ID of design door:",props.door)
 return(
  <div id="design-container" className="hardware-container">
    <label id="hardware-toggle">
      <h3>Add Hardware?</h3>
      <input
        type="checkbox"
        checked={props.showHardware}
        onChange={(e) => props.handleShowHardware(e.target.checked)}
      />
    </label>
    {props.showHardware && <>
    {hardwareDivs}
    </>}
  </div>)
}
function Motors(props){
 // alert("Chosen motor in component props:" + props.selectedMotor)
  const selectedMotor   = props.selectedMotor ?? null;
  const motorDivs = Object.entries(commonMotors).map(([motor, [technicalName, url, price, learnMoreUrl]]) => {
    return (
    <div id="motor-box" className={`design-box design-box-small`} key={motor}>
      <h5>{motor} {`${motor!="Omit"  ? "+" : ""}$${price}`}</h5>
      <img
        className={`${selectedMotor === motor ? "selected-motor" : ""}`}
        src={url}
        alt={motor}
        onClick={() =>props.handleMotor(motor)}/>
        {motor!="Omit" && <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer">Learn More</a>}
    </div>)} )

  return(
  <div id="design-container" className="motor-container">
    <h2>Garage Door Motors</h2>
    {motorDivs}
  </div>)
}

export default function Build(props) {
  var params= useParams();
  const [normalizedParams, setNormalizedParams] = useState({});
  const [createdURL, setCreatedURL] = useState("");
  //console.log("URL PASSED PARAMS:", params)

  const selectedDoor = props.selectedDoor
  const prices = selectedDoor.prices
  let [doorCombination, setDoorCombination] = useState("")
  const [Image,setImage] = useState(params?.size ? null : selectedDoor.defaultImg) 
  const [Price, setPrice] = useState(1000)
  const [Size,setSize] = useState("Double")

  const [Design,setDesign] = useState(selectedDoor.defaultDesign)
  const [DesignStyle,setDesignStyle] = useState()/*UI highlight for design only*/

  const [InsulationType, setInsulationType] = useState(selectedDoor.Insulation.Standard ? "": "Premium")
  const [Insulation, setInsulation] = InsulationType== "" ? useState("")
  : useState(selectedDoor.Insulation.Premium[Design])

  const [showColors,setShowColors] = useState(false)
  const [Color, setColor] = useState(selectedDoor.defaultColor)
  const [colorType,setColorType] = Color in selectedDoor.commonSolidColors ? useState("Solid Color") 
                                                                           : useState("Accents Woodtones")
  const [IconColor, setIconColor] = useState(selectedDoor.defaultColor);/*UI highlight for color only*/

  const [allowWindows,setAllowWindows] = useState(false)//This is if windows can be viewed at all 
  const [showWindows, setShowWindows] = useState(false)//This is rather showing windows if a user clicked the checkbox
  const [windowCheckBox,setWindowCheckBox] = useState(false)//React handles the state of the checkbox for resetting purposes
  const [windowPosition, setWindowPosition] = useState(null)

  const [glassType,setGlassType] = useState(null)
  const [Glass, setGlass] = useState(null)
  const [windowInserts, setWindowInserts] = useState(null)

  const [showHardware,setShowHardware] = useState(selectedDoor.hardware==null ? false:true)
  const [chosenHardwareSet,setChosenHardwareSet] = useState(null)
 // alert(chosenHardwareSet)
  const [selectedMotor,setSelectedMotor] = useState("Omit")
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false)
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [includePerimeterSeal, setIncludePerimeterSeal] = useState(false);
  const [installationPrice, setInstallationPrice] = useState(0);
  const [perimeterPrice, setPerimeterPrice] = useState(Size=="Single" ? 100 : 150);

  const [doorValid, setDoorValid] = useState(false)
  const [loading,setLoading] = useState(false);
  const [buildingFromURL, setBuildingFromURL] = useState(params?.size ? true: false);
  const [viewportHeight,setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth,setViewportWidth] = useState(window.innerWidth)
  const isDesktopLike = 
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(hover: hover)').matches;
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;

  const [selections, setSelections] = useState({/*Made obsolete by setting= true on init*/ 
    "Size":  true, 
    "Color": true,
    "Design":true
    /*(Object.keys(selectedDoor.designs).length > 1 ? false:true)
    Doors need a some values set always, such as default design set for API to work, 
      meaning a door completion check relies partly on user click selections.
      Doors that have only one design have no design selections and set this value to true*/
  });
  const [userDoorSelections, setUserDoorSelections] = useState({})
  const [detectFirstLoad, setDetectFirstLoad] = useState(true);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate()
  //console.log("USER SELECTIONS:",userDoorSelections)
  console.log("CURRENT DOOR:",selectedDoor)
  // console.log("IMAGE:",Image)
  console.log("Size:",Size,"Design:",Design,"Model insulation:",Insulation,"Insulation Type:",InsulationType,`${colorType}:${Color}`,
              "glassType:",glassType,"Glass:",Glass, "Inserts:",windowInserts, "Position:",windowPosition
  )
  //alert(loading)
  //console.log("show windows:",showWindows,"allow windows:",allowWindows,"window checkbox:",windowCheckBox)
  useEffect(() => {/*Handles Certain Default Options*/
    if (selectedDoor.available==false){
      return
    }
    if (!(selectedDoor.id == "Planks" || selectedDoor.id == "SkylineFlush") || selectedDoor.collection == "Traditional" || selectedDoor.collection == "Carriage") {
      if (!params?.insType) {
      
        if (selectedDoor?.Insulation?.Standard && "Any Design" in selectedDoor.Insulation.Standard) {
         // alert("Setting insulation to standard default by design:" + Design)
          setInsulation(selectedDoor.Insulation.Standard["Any Design"])
           setInsulationType("Standard")
        }
        else if (selectedDoor?.Insulation?.Standard){
          //alert("Setting insulation to standard by design:" + Design)
          setInsulation(selectedDoor.Insulation.Standard[Design])
          setInsulationType("Standard")
        }
        else if(selectedDoor?.Insulation?.Premium && "Any Design" in selectedDoor.Insulation.Premium){
          //alert("Setting insulation to premium default by design:" + Design)
          // Use local variable instead of relying on state update
          const premiumInsulation = selectedDoor.Insulation.Premium["Any Design"];
          setInsulation(premiumInsulation)
          setInsulationType("Premium")
        }
        else if(selectedDoor?.Insulation?.Premium){
          //alert("Setting insulation to premium by design:" + Design)
          setInsulation(selectedDoor.Insulation.Premium[Design])
          setInsulationType("Premium")
        }
      }
    }
    else if (selectedDoor.id == "Planks" || selectedDoor.id == "SkylineFlush") {
      //alert("Setting windows to true by default for special doors" + Color)
      setInsulationType("Premium")
      setInsulation(selectedDoor.Insulation.Premium[Design])
      if (!params?.size) {
        setShowWindows(true)
        handleShowWindows(true)
      }
    }
    if (selectedDoor.id=="Aluminum"){
      if (!params?.size && !showWindows){
        handleShowWindows(true,true)
      }
   
    }
  },[])
  useEffect(() => {/*Creates URL on any change of options*/
    if (selectedDoor.available==false){
      return
    }
     function createURLSearchParamsAndOptions(){
      let URLString = `https://doorgi.com/door-builder/#/${selectedDoor.collection.toLowerCase()}/${selectedDoor.nav_id}/build/`
      //let URLString = `http://localhost:5173/door-builder/#/${selectedDoor.collection.toLowerCase()}/${selectedDoor.nav_id}/build/`
      URLString += Size ? `${Size.toLowerCase()}/` : ""
      URLString += Design ? `${Design}/` : ""
      URLString += InsulationType ? `${InsulationType.toLowerCase()}/` : ""
      URLString += `${colorType.toLowerCase()}/${Color.toLowerCase()}/`
      if (showWindows){
        URLString += glassType?`${glassType.toLowerCase()}/`:"glass/"
        URLString += Glass?`${Glass.toLowerCase()}/`:"plain/"
        URLString += windowInserts?`${windowInserts.toLowerCase()}/`:"No Inserts/"
        URLString += windowPosition?`${windowPosition.toLowerCase()}/`:""
      }
      if (showHardware && chosenHardwareSet){
        //alert("Adding hardware to URL")
        if (!showWindows){
          URLString += `no glass/plain/no inserts/no position/`
          }
        let correctName = hardwareAPIToURLName[chosenHardwareSet] || chosenHardwareSet
        URLString += `${correctName.toLowerCase()}/`
      }
      // if (selectedMotor && selectedMotor!="Omit"){
      //   if (!showWindows && !showHardware){
      //     //alert("Adding no windows and no hardware to URL for motor")
      //     URLString += `no glass/plain/no inserts/no position/no hardware/`
      //   }
      //   else if (showWindows && !showHardware){
      //     //alert("Adding just no hardware to URL for motor")
      //     URLString += `no hardware/`
      //   }

      //   URLString += `${selectedMotor.toLowerCase()}/`
      // }
      // if (includeInstallation){
      //   if (!showWindows && ! showHardware && (selectedMotor==null || selectedMotor=="Omit")){
      //     alert("Adding no windows, no hardware, no motor to URL for installation")
      //     URLString += `no glass/plain/no inserts/no position/no hardware/no motor/`
      //   }
      //   else if (showWindows && !showHardware && (selectedMotor==null || selectedMotor=="Omit")){
      //     alert("Adding no hardware, no motor to URL for installation")
      //     URLString += `no hardware/no motor/`
      //   }
      //   else if (!showWindows && showHardware && (selectedMotor==null || selectedMotor=="Omit")){
      //     URLString += `no glass/plain/no inserts/no position/no motor/`
      //   }
      //   URLString += `installation/`
      // }
      const encodedURL = encodeURI(URLString);
      setCreatedURL(encodedURL);
      //alert("Created URL: " + encodedURL)
      console.log("Created URL Params:\n",encodedURL)
      //alert(encodedURL)
      return URLString;
  }
  createURLSearchParamsAndOptions();
  })

  const createDoorFromParams = ()=>{
      //alert("Building params from query")
      console.log("URL PARAMS BEFORE MODIFICATION:",params)
      setImage(null);
      //setLoading(true);
      const normalizedParams = { ...params };
      for (let key in normalizedParams) {
        if (typeof normalizedParams[key] === "string" && normalizedParams[key].length > 0) {
          let words = normalizedParams[key].split(/[ _-]+/);
          normalizedParams[key] = words
            .map(word => word.toLowerCase() === "with"
              ? word.charAt(0).toLowerCase() + word.slice(1)
              : word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
      }

    if (normalizedParams.size) setSize(normalizedParams.size);
   
    let correctDesignName = normalizedParams.design
    if (normalizedParams.design) {
      if (normalizedParams.design == "Narrow"){
        correctDesignName = "Long Windows"//API uses long windows, but need Narrow state name for differentiation between stylite windows
      }
      else if(normalizedParams.design == "Full View"){
        normalizedParams.design = "Full-View"
        correctDesignName = "Full-View"
      }
      setDesign(normalizedParams.design);
      setDesignStyle(normalizedParams.design);
    }

    if (normalizedParams.design && normalizedParams.insType) {
      if (selectedDoor.collection=="Carriage"){
        //alert("Changing insulation type from standard to Premium for Carriage collection")
        normalizedParams.insType = "Premium"
      }
      setInsulationType(normalizedParams.insType);
      handleInsulation(normalizedParams.insType, normalizedParams.design);
    }

    if (normalizedParams.colorType && normalizedParams.color) {
      if ( normalizedParams.colorType == "Accents Woodtones" && selectedDoor.id=="Shoreline" &&
        urlWoodNameToAPIName[normalizedParams.color]){
        normalizedParams.color = urlWoodNameToAPIName[normalizedParams.color]
        //npmalert("Adjusting woodtone name for URL")
      }
      setColorType(normalizedParams.colorType);
      setColor(normalizedParams.color);
      setIconColor(normalizedParams.color);
    }

    if (normalizedParams.glassType && normalizedParams.glass) {
      if (normalizedParams.glassType.toLowerCase() == "no glass"){
        //alert("No glass type found in URL, setting show windows to false")
        setAllowWindows(false);
        setShowWindows(false);
        setGlassType(null)
        setGlass(null)
      }
      else{
        //alert("Found glass type and glass in URL")
        if (normalizedParams.glassType.toLowerCase().includes("style")){
          normalizedParams.glassType = "StyleLite"
          let type = normalizedParams.glass.split(" ")
          //alert( normalizedParams.glass)
          normalizedParams.glass = normalizedParams.glass.replace("Stylelite","StyleLite")
        }
        setAllowWindows(true);
        setShowWindows(true);
        //alert("Setting glass from URL:" + normalizedParams.glass)
        setGlassType(normalizedParams.glassType);
        setGlass(normalizedParams.glass);
      }
    }
    else if (!normalizedParams.glassType && !normalizedParams.glass){
      if (selectedDoor.id=="Aluminum"){
        normalizedParams.glassType = "Glass"
        normalizedParams.glass = "Plain"
        //alert("No glass type or glass found in URL, setting show windows to false")
        setAllowWindows(true);
        setShowWindows(true);
        //alert("Setting glass from URL:" + normalizedParams.glass)
        setGlassType(normalizedParams.glassType);
        setGlass(normalizedParams.glass);
      }
    }
    if (normalizedParams.inserts){
      //console.log("current inserts:", normalizedParams.inserts)
      if (normalizedParams.inserts.includes("Piece")){
        //alert("Adjusting insert name for URL")
        normalizedParams.inserts = normalizedParams.inserts.replace("Piece","piece")
      }
      setWindowInserts(normalizedParams.inserts);
      //console.log("Normalized inserts:", normalizedParams.inserts)
    }
    else if (!normalizedParams.inserts){
      normalizedParams.inserts = "No Inserts";
      setWindowInserts("No Inserts");
    }

    if (normalizedParams.glass && !normalizedParams.position && normalizedParams.glassType.toLowerCase() != "no glass") {
      // default per collection; keep consistent with UI fallback
      //alert("Determining default window position from URL")
      if (props.selectedDoor.collection =="Traditional") {
        normalizedParams.position = "FIRST ROW";
      }
      else if (props.selectedDoor.collection == "Contemporary") {
        if (props.selectedDoor.id=="Aluminum"){
          normalizedParams.position = "FULL-VIEW";
          setWindowPosition("FULL-VIEW");
        }
        else if(props.selectedDoor.id=="Sterling"){
        }
        else{
          normalizedParams.position = "RIGHT EDGE";
        }
      }
      else if (props.selectedDoor.collection === "Carriage") {
        //alert("Determining default window position for carriage door")
        const result = determineDefaultWindowPosition(normalizedParams.design||selectedDoor.design, 
        props.selectedDoor.collection,false);
        normalizedParams.position = result.windowPosition
      }
      setWindowPosition(normalizedParams.position);
    }
    else if (normalizedParams.position && normalizedParams.glassType.toLowerCase() != "no glass" && normalizedParams.position.toLowerCase() != "no position") {
      //alert("Setting window position from URL:" + normalizedParams.position)
      normalizedParams.position = normalizedParams.position.toUpperCase();
      setWindowPosition(normalizedParams.position);
    }

    if (normalizedParams.hardware){
      if (normalizedParams.hardware in hardwareURLToAPIName){
        normalizedParams.hardware = hardwareURLToAPIName[normalizedParams.hardware]
        setChosenHardwareSet(normalizedParams.hardware);
      }
    }
    if (normalizedParams.motor){
      setSelectedMotor(normalizedParams.motor);
    }
    setNormalizedParams(normalizedParams);
    // Use normalizedParams for fetchDoor
      console.log("URL PARAMS AFTER MODIFICATION:",params)
    //alert("Fetch complete" + windowInserts)
    fetchDoor(
      getPattern(normalizedParams.size, correctDesignName || Design),
        {
          Width: normalizedParams.size,
          ...(normalizedParams.design && { Design:  correctDesignName }),
          ...(normalizedParams.colorType && { [normalizedParams.colorType]: normalizedParams.color }),
          ...(normalizedParams.glassType && {
                [normalizedParams.glassType]: normalizedParams.glass,
                "Window Inserts": normalizedParams.inserts,
                Position: normalizedParams.position,
              }),
            ...(normalizedParams.hardware && { "Exterior Hardware": normalizedParams.hardware }),
        }
      );
  }
  useEffect(()=>{/*Build door from URL Params if requested*/
    //alert("INSIDE EFFECT")
     if (selectedDoor.available==false){
      return
    }
    if (params?.size){
      createDoorFromParams()
    }
    else{
     // alert("PArams not found")
    }
  },[])

  useEffect(() => {/*Checks and handles options changes and updates for a new door combo that doesn't support current options*/
    if (selectedDoor.available==false){
      return//some effects break certain door pages that are not yet available so we have a check
    }
    if (doorCombination && !detectFirstLoad) {
      //alert("DOOR COMBINATION EFFECT TRIGGERED")
      let newColorType = colorType;
      let newColor = Color;
      let newGlass = Glass;
      let newGlassType = glassType;
      let newInserts = windowInserts;
      let newPosition = windowPosition;
      //alert("Inserts here:" + newInserts)
      
      console.log("DOOR COMBINATION CHANGED:", doorCombination)
      console.log("DOOR COMBINATION",selectedDoor.colors, selectedDoor.woods)
      if (doorCombination.includes("Narrow") && doorCombination.includes("Standard")){
        //alert("Replacing Narrow with Long Windows for door combination check")
        doorCombination = doorCombination.replace("Narrow","LongWindows");
      }
      if (colorType=="Solid Color"){
        //alert("Checking solid color options for current door combination:" + doorCombination)
        if (!(doorCombination in selectedDoor.colors)) {
          //alert("Door combination DOES NOT have ANY solid color options, setting to woodtone default:" + doorCombination)
          //console.log("Door combination DOES NOT have ANY solid color options:", doorCombination)
          if (selectedDoor.defaultColor in selectedDoor.commonWoods){
            handleColor(selectedDoor.defaultColor, "Accents Woodtones",false);
            newColorType = "Accents Woodtones"; newColor = selectedDoor.defaultColor
          }
          else{
            newColor = Object.keys(selectedDoor.commonWoodTones)[0]
            handleColor(newColor, "Accents Woodtones",false);
            newColorType = "Accents Woodtones";
          }
        }
        else if(selectedDoor.colors[doorCombination] != "common" && selectedDoor.colors[doorCombination][Color] == null){
          //alert("Door combination DOES NOT have this color option:" + doorCombination + " Color:" + Color)
          //console.log("Door combination DOES NOT have this accent color option:", doorCombination, Color)
          handleColor(selectedDoor.defaultColor, "Solid Color",false);
          newColorType = "Solid Color"; newColor = selectedDoor.defaultColor
        }
        else if (selectedDoor.colors[doorCombination] =="common" && !(Color in selectedDoor.commonSolidColors)){
          //alert("Door combination holds common colors but current color is not common:" + doorCombination + " Color:" + Color)
          //console.log("Door combination holds common colors but current color is not common:", doorCombination, Color)
          if (selectedDoor.defaultColor in selectedDoor.commonSolidColors){
            //alert("Selecting default color as the new solid color")
            handleColor(selectedDoor.defaultColor, "Solid Color", false);
            newColor = selectedDoor.defaultColor; newColorType = "Solid Color";
          }
          else{
            //alert("Selecting first available common solid color as new solid color")
            newColor = Object.keys(selectedDoor.commonSolidColors)[0]
            handleColor(newColor, "Solid Color", false);
            newColorType = "Solid Color";
          }
        } 
      }
      else if (colorType=="Accents Woodtones") {
        //alert("Checking woodtone options for door combination:" + doorCombination)
        if (!(doorCombination in selectedDoor.woods)){
          //alert("New Door combination DOES NOT have woodtone options")
          console.log("Door combination DOES NOT have any woodtone options:", doorCombination)
          if (selectedDoor.defaultColor in selectedDoor.commonSolidColors){
            //alert("Selecting common solid color as default")
            handleColor(selectedDoor.defaultColor, "Solid Color", false);
            //setColor(selectedDoor.defaultColor);setColorType("Solid Color");
            newColorType = "Solid Color";newColor = selectedDoor.defaultColor
          }
          else{
            //alert("No common solid colors found, selecting first available solid color")
            handleColor(Object.keys(selectedDoor.commonSolidColors)[2], "Solid Color", false);
            //setColor(Object.keys(selectedDoor.commonSolidColors)[2]);setColorType("Solid Color");
            newColorType = "Solid Color";newColor = Object.keys(selectedDoor.commonSolidColors)[2]
          }
        }
        else if (selectedDoor.woods[doorCombination] != "common" && selectedDoor.woods[doorCombination][Color] == null){
          console.log("Door combination DOES NOT have this woodtone option:", doorCombination, Color) 
          handleColor(selectedDoor.defaultColor, "Solid Color", false);
          //setColor(selectedDoor.defaultColor);setColorType("Solid Color");
          newColorType = "Solid Color";newColor = selectedDoor.defaultColor
        }
      }
      //console.log("DOOR COMBINATION:", selectedDoor.windows.glass)
      if (showWindows && doorCombination in selectedDoor.windows.glass){
        //alert("DOOR COMBINATION:" + doorCombination+ " combo in windows.glass")
        let code = selectedDoor.windows.glass[doorCombination]
        if (code!= "common" && (code[Glass] == null)){
          //alert("This doorcombo doesnt have this glass")
          handleWindow("Plain", "Glass", windowInserts,windowPosition, false)
          //setGlass("Plain");setGlassType("Glass");
          newGlass="Plain";newGlassType = "Glass";newInserts=windowInserts;newPosition= windowPosition
        }
        else{
          //alert("common")
        }
      }
      if (newColorType != colorType || newColor != Color || newGlass != Glass || newGlassType != glassType){
        //alert("FETCHING DOOR WITH UPDATED OPTIONS " +`${newColorType}:${newColor}, ${newGlassType}:${newGlass}`)
        fetchDoor(getPattern(Size, Design), 
        {[newColorType]: newColor,
        ...(showWindows && 
            {[newGlassType]: newGlass,
            "Window Inserts": newInserts,
            Position: newPosition,}) 
        } );
      }
      else{
        //alert("No changes needed for door fetch")
      }
    }
    console.log("\n\n\n\n\n")
  },[doorCombination])

  useEffect( ()=>{/*Returns Correct Prices*/
    if (selectedDoor.available==false){
      return
    }
    //console.log("Detected change, getting new price")
    let newPrice = 0
    function showPrices(){
      //console.log("BOI",Insulation,Design,Size,Glass,glassType,windowInserts,chosenHardwareSet,colorType)
      //alert("SHOW PRICES CALLED")
      let ins = InsulationType== "Standard" ? "Non-insulated" : "Insulated"
      let priceDesignName = Design
      if (Design=="Narrow"){
        // priceDesignName = "Long Windows"
      } else if (Design=="No Or Short Windows"){
        priceDesignName = "Short Windows"
      }
      if ("Any Design" in prices){
        priceDesignName = "Any Design"
      }
      console.log("ERROR ZONE:",priceDesignName,ins,Size)
      let baseKeys = prices[priceDesignName][ins][Size]
      console.log("BASE KEYS:",baseKeys)

      //alert(baseKeys["basePrice"].replace(/['",]/g, "").trim())
      let newPrice = Number(baseKeys["basePrice"].replace(/['",$]/g, "").trim());
      let basePrice = newPrice
      if (showAdditionalOptions){
        setInstallationPrice(Number(baseKeys["Installation"].replace(/['",$]/g, "").trim()))
        if (includeInstallation){
          //alert("Including installation price")
          setInstallationPrice(Number(baseKeys["Installation"].replace(/['",$]/g, "").trim()))
          newPrice += Number(baseKeys["Installation"].replace(/['",$]/g, "").trim())
        }
        setPerimeterPrice(Size=="Double" ? 150 : 100)
        if (includePerimeterSeal){
          //alert("Including perimeter seal price")
          newPrice += Size=="Double" ? 150 : 100
        }
      }
      //alert("BASE PRICE:" + newPrice + " "+ "Model " + Insulation)
      console.log("\nNEW BASE PRICE", Design,ins,Size,newPrice)
      console.log("CURRENT DOOR:",selectedDoor)
      console.log("OPTIONS FOR THIS DOOR:",baseKeys["options"])

      let glassPrice = 0
      let styleLitePrice = 0
      let insertPrice = 0;
      let colorPrice = 0;
      let hardwarePrice = 0
      let motorPrice = 0
      let colorValue = baseKeys?.options?.[colorType];//Checks for nulls/undefined
      if (colorValue && colorType=="Accents Woodtones" && baseKeys["options"]["Accents Woodtones"]){
          colorPrice += Number(baseKeys["options"]["Accents Woodtones"].replace(/['",$]/g, "").trim())
          newPrice += colorPrice
        //alert(Number(baseKeys["options"]["Accents Woodtones"].replace(/['",]/g, "").trim()))
      }//Only woodtones have extra prices right now
      if (Glass){
        //alert("GLASS SELECTED:" + glassType + " " + Glass)
        const currentGlass = baseKeys?.options?.["Glass"]?.[Glass];//Checks for nulls/undefined
        const currentStylite = baseKeys?.options?.["StyleLite"];//Checks for nulls/undefined
        if (glassType=="Glass" && currentGlass){
          //alert("adding standard glass price")
          glassPrice += Number(currentGlass.replace(/['",$]/g, "").trim())
          //alert("Old Price: " + newPrice + " Glass Price: " + glassPrice)
          newPrice += glassPrice
          //alert("new price after glass: " + newPrice)
        }
        else if (glassType=="StyleLite" && currentStylite){
          //alert("adding stylite price on top of glass price")
          let words = Glass.split(" ");
          let glassName = words[1];
          glassPrice = baseKeys?.options?.["Glass"]?.[glassName];
          if (!glassPrice){
            glassPrice = baseKeys?.options?.["Glass"]?.["Obscure"];
            //alert("Could not find stylite glass price for:" + glassName + " defaulting to Plain glass price")
          }
          else{
            //alert("Found stylite glass price for:" + glassName + " priced at " + glassPrice)
          }
          //currentStylite is just a price, not an object of glass types
          styleLitePrice += Number(currentStylite.replace(/['",$]/g, "").trim())
          glassPrice = Number(glassPrice.replace(/['",$]/g, "").trim())
          // alert("Glass price: " + glassPrice + " StyleLite Price: " + styleLitePrice)
          // alert("New price after stylite: " + (glassPrice + styleLitePrice) )
          newPrice +=  glassPrice+styleLitePrice
         
        }
        if (Size=="Single" && (windowPosition=="RIGHT EDGE"  || windowPosition=="LEFT EDGE") && (Design=="Long Windows" || Design=="Narrow")){
          //alert(`Doubling glass price from ${glassPrice} to ${glassPrice*2} for single doors with long edge windows`)
          newPrice+= glassPrice //Charge double for single doors with long edge windows
        }
        else if (Size=="Single" && (windowPosition=="RIGHT EDGE"  || windowPosition=="LEFT EDGE") && Design=="No Or Short Windows"){
          //alert(`halving price for small edge windows`)
        }
      } 
      if (windowInserts && windowInserts!= "No Inserts"){
        if (typeof baseKeys["options"]["Inserts"] === "object"){
          let insertKey = windowInserts
          //alert("inserts is an object")
          if (windowInserts.includes("Stockton")){
            insertKey = "Stockton"
            //alert("Stockton insert selected, adjusting name for price lookup")
          }
          else if (windowInserts.includes("Madison")){
            insertKey = "Madison"
            //alert("Madison insert selected, adjusting name for price lookup")
          }
          insertPrice += Number(baseKeys["options"]["Inserts"][insertKey].replace(/['",$]/g, "").trim())
          newPrice+= insertPrice
        }
        else if (typeof baseKeys["options"]["Inserts"] === "string"){
          insertPrice +=Number(baseKeys["options"]["Inserts"].replace(/['",$]/g, "").trim())
          newPrice += insertPrice
        }
      } 
      if (chosenHardwareSet){
        //alert("Adding hardware price for set: " + chosenHardwareSet)
        //alert( baseKeys?.options?.["Hardware"])
        const currentHardware = baseKeys?.options?.["Hardware"];//Checks for nulls/undefined
        if (currentHardware){
          //alert("Adding hardware price: " + currentHardware)
          hardwarePrice += Number(commonHardware[chosenHardwareSet])
          newPrice += hardwarePrice
        }
      }
      if (selectedMotor){
        //alert("Adding motor price for set: " + selectedMotor)
        const currentMotor = commonMotors[selectedMotor][2];//Checks for nulls/undefined
        if (currentMotor){
         // alert("Adding motor price: " + currentMotor)
          motorPrice += Number(currentMotor)
          newPrice += motorPrice
        }
      }
      //alert("Current glass price: " + glassPrice + " StyleLite Price: " + styleLitePrice + " Insert Price: " + insertPrice)
      console.log(
        `BUILD: ${Design}, ${InsulationType}:${Insulation}, ${Size}\n`,
        `BASE PRICE: ${basePrice}\n`,
        `${colorType} ${colorPrice}\n`,
        `${Glass} windows: ${glassPrice}\n`,
        `StyleLite: ${styleLitePrice}\n`, 
        `${windowInserts} Inserts: ${insertPrice}\n`, 
        `${`Hardware: ${hardwarePrice}\n`}`,  
        `${`Motor: ${motorPrice}\n`}`, 
        `PRICE WITH OPTIONS: ${newPrice}\n`
      )
      newPrice = Math.round(newPrice)
      let formattedPrice = String(newPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setPrice(formattedPrice);
    } 

    if (selectedDoor.id== "Planks" || selectedDoor.id=="SkylineFlush"){
      //alert("Here")
       setAllowWindows(true);   
      if (Design && selections["Size"] && InsulationType){ 
        showPrices();
        setShowColors(true); 
        // if (!showWindows){
        //   setShowWindows(true);
        //   handleShowWindows(true);
        // }
        let priceDesignName = Design=="No Or Short Windows" ? "Short Windows" : Design
        setDoorCombination(`${selectedDoor.name.replace(" ","")} ${priceDesignName .replace(" ","")} ${InsulationType} ${Size}`)
      }
      else{
        console.log("MISSING BASE PRICE CHECKS")
      }
    }
    else if (selections["Design"] && selections["Size"] && InsulationType) {
      //alert("Base price checks complete")
      showPrices();
      setShowColors(true);
      setAllowWindows(true)
      let designName = Design.replace(" ","");
      if (selectedDoor.collection=="Carriage"){
        designName = "AnyDesign"
      }
      setDoorCombination(`${selectedDoor.name.replace(" ","")} ${designName} ${InsulationType} ${Size}`)
    }
    else{
      //alert("Missing base price checks")
      setShowColors(false);setAllowWindows(false)
      console.log("MISSING BASE PRICE CHECKS")
    }
  }, [selections["Design"],Design,Size,selections["Size"],InsulationType,Insulation,colorType,Glass,windowInserts,windowPosition,chosenHardwareSet,selectedMotor,showAdditionalOptions,includeInstallation,includePerimeterSeal])

  useEffect(()=>{/*Effect for door validity(effectively obsolete now)*/
    //console.log(Glass,glassType,windowInserts,windowPosition)
    if (selectedDoor.available==false){
      return
    }
    let validity = false;
    if (selectedDoor.id == "Planks" || selectedDoor.id == "SkylineFlush"){/*Exception case doors*/
      //console.log(selections["Size"] , selections["Color"],Design,Insulation)
      if (selections["Size"] && selections["Color"] && Design !== "" && Insulation !== "") {/*Base case for these doors*/
        //alert("base cases for special doors")
        validity = true;
        if (showWindows){
          validity=false;
          if (selections["Design"]) {/*Design is optional, if long window is selected then windows must be selected*/
            validity = isWindowSelectionComplete(Glass, glassType, windowInserts);
          }
        }
        setDoorValid(validity);return;
      } 
      else {
        setDoorValid(validity)/*False, base cases failed*/
        //console.log("bases cases for planks and flush failed");return;
      }
    }
    else if (selections["Size"] && selections["Color"] && selections["Design"] && Insulation !== "") {/*Base Cases for most doors*/
      validity = true;/*Right now true*/
      //console.log("BASE CASES CHECKED")
      if (showWindows) {
        //console.log("Checking if windows are complete")
        validity = isWindowSelectionComplete(Glass, glassType, windowInserts);
      }
      setDoorValid(validity)
    } 
    else{ /*Most Doors fail*/
      setDoorValid(validity)
     // console.log("Base cases for most doors failed")
    }
  })

  useEffect(() => {/*Effect for ScrollBar removal*/ 
    document.body.classList.add('build-page');
    return () => {
      document.body.classList.remove('build-page');
    };
  }, []);

  useEffect(() => {/*Effect for dynamic button placement based on viewport changes*/
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect( ()=>{
    if (Size && Design && InsulationType){
      //alert("Showing additional options")
      !showAdditionalOptions ? setShowAdditionalOptions(true):null;
    }
    else{
      setShowAdditionalOptions(false);
    }
  })
  const handleShowImageDialog=(state)=>{
     setShowImageDialog(state);

  if (state) {
    const scrollY = window.scrollY;
    document.body.dataset.scrollY = scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("body-no-scroll");
  } else {
    const scrollY = parseInt(document.body.dataset.scrollY || "0");
    document.body.classList.remove("body-no-scroll");
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
  }

  }
  const handleSize = (e,size)=>{
    setSize(size);
    setLoading(true)

    // if (!selections["Size"]){markSelected("Size",true)}
   let correctDesignName = Design=="Narrow" ? "Long Windows" : Design
   console.log("line755")
    fetchDoor(getPattern(size,correctDesignName),{"Width":size})
  }
  function determineDefaultWindowPosition(design,collection, notCallingFromURL=true) {/*Only for overlay design combinations*/
    //alert("Determining default window position for design: " + design + " in collection: " + collection)
    let correctInsert = windowInserts
    if (collection=="Carriage"){
      //alert("State Design" +  Design + " Passed in Design" + design)
      if (singleRowDesigns.has(design) && windowPosition!="SINGLE ROW"){
        //alert("Setting window position to SINGLE ROW for this design")
        setWindowPosition("SINGLE ROW")
        if (nonArchedDesigns.has(design) && archedDesigns.has(Design)  && notCallingFromURL){
          //alert("Changing inserts from design")
          if (windowInserts=="2 piece Arched Stockton") correctInsert = "Stockton"
          else if (windowInserts=="2 piece Arched Madison") correctInsert = "Madison"
          else correctInsert = "No Inserts"
          setWindowInserts(correctInsert)
        }
        else if(archedDesigns.has(design) && nonArchedDesigns.has(Design) && notCallingFromURL){
          //alert("Changing inserts from design")
          if (windowInserts=="Stockton") correctInsert = "2 piece Arched Stockton"
          else if (windowInserts=="Madison") correctInsert = "2 piece Arched Madison"
          else correctInsert = "No Inserts"
          setWindowInserts(correctInsert)
        }
         return { windowPosition: "SINGLE ROW", correctInsert };
      }
      else if (!singleRowDesigns.has(design) && windowPosition!="DOUBLE ROW" ){
       /// alert("Setting window position to DOUBLE ROW for this design")
        setWindowPosition("DOUBLE ROW")
        if (nonArchedDesigns.has(design) && archedDesigns.has(Design) && notCallingFromURL){
         // alert("Changing inserts from arched to non arched design")
           if (windowInserts=="2 piece Arched Stockton") correctInsert = "Stockton"
          else if (windowInserts=="2 piece Arched Madison") correctInsert = "Madison"
          else correctInsert = "No Inserts"
          setWindowInserts(correctInsert)
        }
        else if(archedDesigns.has(design) && nonArchedDesigns.has(Design)&& notCallingFromURL){
          //alert("Changing inserts from non arched to arched design")
          if (windowInserts=="Stockton") correctInsert = "2 piece Arched Stockton"
          else if (windowInserts=="Madison") correctInsert = "2 piece Arched Madison"
          else correctInsert = "No Inserts"
          setWindowInserts(correctInsert)
        }
        return { windowPosition: "DOUBLE ROW", correctInsert };
      }

      if (nonArchedDesigns.has(design) && archedDesigns.has(Design)  && notCallingFromURL){
        //alert("Changing inserts from arched to non arched design")
        if (windowInserts=="2 piece Arched Stockton") correctInsert = "Stockton"
        else if (windowInserts=="2 piece Arched Madison") correctInsert = "Madison"
        else correctInsert = "No Inserts"
        setWindowInserts(correctInsert)
        return {windowPosition, correctInsert}
      }
      else if(archedDesigns.has(design) && nonArchedDesigns.has(Design) && notCallingFromURL){
        //alert("Changing inserts from non arched to arched design")
        if (windowInserts=="Stockton") correctInsert = "2 piece Arched Stockton"
        else if (windowInserts=="Madison") correctInsert = "2 piece Arched Madison"
        else correctInsert = "No Inserts"
        setWindowInserts(correctInsert)
        return {windowPosition, correctInsert}
      }
      else{
         return {windowPosition, correctInsert}
      }
    }
    else{
      return {windowPosition, correctInsert}
    }
  }
  const handleDesign= (design)=>{/*Handles contemporary window defaults as well*/
    //alert("handleShowWindows called with:" + showWindow)
    //alert("setting design " + design)
    setDesign(design)
    setLoading(true)
    setDesignStyle(design)
    let correctWindowPosition = windowPosition
    let correctInsert = windowInserts
    if (showWindows) {
      const result = determineDefaultWindowPosition(design, selectedDoor.collection)
      correctWindowPosition = result.windowPosition
      correctInsert = result.correctInsert
    }
   
    if (design!="Short Panel" && windowInserts=="8 piece Sunburst"){
      setWindowInserts("No Inserts")//Raised Panel only currently
    }
    if (design=="No Or Short Windows" && (windowInserts=="4 piece Arched Stockton" || windowInserts=="4 piece Arched Madison" || windowInserts=="4 piece Sunburst")){
      setWindowInserts("No Inserts")//Short window only currently
      //alert("The selected inserts are not available for the No or Short Windows design. Inserts have been reset to 'No Inserts'.")
    }
    let insertsDesignKey = design
    if (archedDesigns.has(design)){
      insertsDesignKey = "archedDesigns"
    }
    else if(nonArchedDesigns.has(design)){
      insertsDesignKey = "nonArchedDesigns"
    }
    else if("Any Design" in selectedDoor.windows?.inserts){
      insertsDesignKey = "Any Design"
    }
    if (selectedDoor.windows?.inserts?.[insertsDesignKey] == null) {
      //alert("Changing inserts from design")
      setWindowInserts("No Inserts")
    }
    else{
      //alert("Matched inserts for design")
    }

    if (Insulation!=""){
      //alert("Changing insulation from design")
      handleInsulation(InsulationType,design)
    }
    let correctDesignName = design=="Narrow" ? "Long Windows" : design
    //console.log("correctDesignName:", correctDesignName)
    // Transition INTO Narrow: clear all window state and force StyleLite context.
    if (design === "Narrow") {
      // Show the windows UI if you want to let user pick StyleLite now
      // setShowWindows(true); // optional UX choice

      // Clear any prior glass/inserts/position in the parent
      setGlass("StyleLite Tinted"); // default glass for StyleLite
      setGlassType("StyleLite"); // type switches to StyleLite, no selection yet
      setWindowInserts(null);
      // if (InsulationType != "Premium"){
      //   alert("Changing insulation from design to premium")
      //   setInsulationType("Premium")
      //   setInsulation(selectedDoor.Insulation.Premium[Design])
      // }
      // Single, authoritative fetch that also overrides prior "Glass"
      console.log("line779")
      fetchDoor(getPattern(Size, correctDesignName), {
        Design: correctDesignName,
        StyleLite: "StyleLite Tinted",            // overrides glass type in body construction
        "Window Inserts": null,
        Position: windowPosition || "RIGHT EDGE" // default position for StyleLite, can be overridden by URL params or user selection
      });
      return;
    }
    // Transition OUT OF Narrow: if we were in StyleLite, reset source-of-truth first.
    if (design!== "Narrow" && glassType === "StyleLite") {
      // If user has Windows turned on, restore a sensible default for glass designs
      if (showWindows) {
        setGlass("Tinted");
        setGlassType("Glass");
        setWindowInserts("No Inserts");
        // setWindowPosition("RIGHT EDGE");
         console.log("line796")
        fetchDoor(getPattern(Size, correctDesignName), {
          Design: correctDesignName,
          Glass: "Tinted",
          "Window Inserts": "No Inserts",
          Position: windowPosition || "RIGHT EDGE"
        });
        return;
      }
      // If Windows are turned off, clear out window state
      //alert("turning off window from narrow")
      setGlass(null);
      setGlassType(null);
      setWindowInserts(null);
      setWindowPosition(null);
      console.log("line811")
      fetchDoor(getPattern(Size, correctDesignName), { Design: correctDesignName });
      return;
    }
    console.log("line815")
    fetchDoor(getPattern(Size,correctDesignName), {Design:correctDesignName,Position:correctWindowPosition, "Window Inserts": correctInsert})/*Usual design change path*/
  }
  const handleInsulationType = (insulationType)=>{
     if (!selectedDoor.Insulation[insulationType]) {
      //alert("not present")
      return;
     }
     else{
      //alert("present")
     }
    setLoading(true)
    setInsulationType(insulationType)
    let correctDesignName = Design
    if ( selectedDoor.id=="SkylineFlush" && insulationType== "Standard" && Design=="Narrow"){
      //alert("Skyline Flush with Narrow design is not available with Standard Insulation. Switching to Long Windows design.")
      setDesign("Long Windows")
      setDesignStyle("Long Windows")
      let newColor = Color
      let newColorType = colorType
      if (colorType=="Accents Woodtones"){/*double check for correct colors*/
        newColorType = "Solid Color"
          if (selectedDoor.defaultColor in selectedDoor.commonSolidColors){
            //alert("Selecting common solid color as default")
            handleColor(selectedDoor.defaultColor, "Solid Color", false);
            newColor = selectedDoor.defaultColor
          }
          else{
            //alert("No common solid colors found, selecting first available solid color")
            handleColor(Object.keys(selectedDoor.commonSolidColors)[2], "Solid Color", false);
            newColor = Object.keys(selectedDoor.commonSolidColors)[2]
          }
       }
      handleWindow("Plain", "Glass", "No Inserts", windowPosition, false)
      //alert("FETCHING DOOR WITH UPDATED OPTIONS " +`${newColorType}:${newColor}`)
      fetchDoor(getPattern(Size, "Long Windows"), 
        {[newColorType]: newColor,
        ...(showWindows && 
            {"Glass": "Plain",
            "Window Inserts": "No Inserts",
            Position: windowPosition}) 
        } );
     
      correctDesignName = "Long Windows"
    }
    // console.log("Image URL:", selectedDoor.Insulation[insulationType]);
    // console.log("Insulation Model:", selectedDoor.Insulation[insulationType][Design])
    handleInsulation(insulationType,correctDesignName)
  }
  const handleInsulation = (insulationType, design)=>{
    let insulationModelNumber = 0;
    if ("Any Design" in selectedDoor.Insulation[insulationType]){
      //alert("Any design")
      console.log(insulationType)
      insulationModelNumber = selectedDoor.Insulation[insulationType]["Any Design"]
    } else{ insulationModelNumber = selectedDoor.Insulation[insulationType][design]}
    setTimeout(() =>setLoading(false), 500 )
    setInsulation(insulationModelNumber)
  }
  const handleColor= (userColor, type, callFetch = true)=>{
    //alert("handleColor called with:" + userColor + " type:" + type)
    console.log("handleColor called with color:", userColor, "and type:", type)
    setColor(userColor)
    setColorType(type)
    setIconColor(userColor)
    if (selectedDoor.id == "Sterling"){
      userColor += " (Standard)"
    }
    // if (!selections["Color"]){ markSelected("Color",true)}
    let correctDesignName = Design=="Narrow" ? "Long Windows" : Design
    console.log("line853")
    if (callFetch){
      //alert("calling color fetch")
      setLoading(true)
      fetchDoor(getPattern(Size,correctDesignName),{[type]:userColor})/*Inject actual value as the key, not literally "type"*/
    }
  }
  const handleShowWindows = (showWindow,callFetch = true)=>{
    //alert("handleShowWindows called with:" + showWindow)
    setShowWindows(showWindow);
    let paramsDesign = normalizedParams.design || null;
    let paramsGlassType = normalizedParams.glassType || null;
    let paramsGlass = normalizedParams.glass || null;
    let paramsInserts = normalizedParams.inserts || null;
    let paramsPosition = normalizedParams.position || null;
    if (params.glassType && paramsGlassType.toLowerCase()=="no glass"){
      //alert("No glass type found in URL, resetting window parameters")
      paramsGlassType = null
      paramsGlass = null;
      paramsInserts = null;
      paramsPosition = null;
        
    }
    //alert("handleShowWindows"+ showWindow)
    //alert("build from URL:" + paramsDesign + paramsGlass + " type:" + paramsGlassType + " inserts:" + paramsInserts + " position:" + paramsPosition)

    if (showWindow ){
      if (selectedDoor.collection=="Carriage"){
        //alert("Setting windows to default for carriage")
        let correctWindowPosition = windowPosition
        if (singleRowDesigns.has(Design) && windowPosition!="SINGLE ROW"){
          //alert("Setting window position to SINGLE ROW for this design")
          setWindowPosition("SINGLE ROW")
          correctWindowPosition = "SINGLE ROW"
        }
        else if (!singleRowDesigns.has(Design) && windowPosition!="DOUBLE ROW"){
          ////alert("Setting window position to DOUBLE ROW for this design")
          setWindowPosition("DOUBLE ROW")
          correctWindowPosition = "DOUBLE ROW"
        }
        handleWindow(paramsGlass || "Plain", paramsGlassType || "Glass", paramsInserts || "No Inserts", (windowPosition|| paramsPosition || correctWindowPosition ))
        return
      }

      if (selectedDoor.id == "Aluminum"){
        handleWindow(paramsGlass || "Plain", paramsGlassType || "Glass", paramsInserts || "No Inserts", (windowPosition|| paramsPosition || "FULL-VIEW"),callFetch)
      }
      else if (selectedDoor.id === "Planks" || selectedDoor.id === "SkylineFlush"){
        setDesign(paramsDesign || "Long Windows")
        setDesignStyle(paramsDesign || "Long Windows")
        if (paramsDesign == "Narrow" && InsulationType != "Premium"){
          //alert("Narrow design requires Premium Insulation. Setting Insulation to Premium.")
          //handleWindow("Tinted", "Glass", "No Inserts", "RIGHT EDGE")//original hard default
          setInsulationType("Premium")
          setInsulation(selectedDoor.Insulation.Premium["Long Windows"])
        }
        handleWindow(paramsGlass || "Tinted", paramsGlassType || "Glass", paramsInserts || "No Inserts", paramsPosition || "RIGHT EDGE");
        return;
      }
      else{//Usual doors
        //alert("Setting windows to URL or defaults for usual doors")
        handleWindow(paramsGlass || "Plain", paramsGlassType || "Glass", paramsInserts || "No Inserts", paramsPosition || "FIRST ROW");
      }
    }
    else if (!showWindow) {
      //alert("Resetting windows")
      // if (selectedDoor.collection=="carriage"){
      //   handleWindow(paramsGlass || "Plain", paramsGlassType || "Glass", paramsInserts || "No Inserts", (windowPosition|| paramsPosition || "DOUBLE ROW"))
      //   return
      // }
      handleWindow(null, null, null, null); 
      if (selectedDoor.id === "Planks" || selectedDoor.id === "SkylineFlush"){
          setDesign( (paramsDesign && (paramsDesign=="Narrow"? "Long Windows" : paramsDesign)) || "Long Windows")
          setDesignStyle((paramsDesign && (paramsDesign=="Narrow"? "Long Windows" : paramsDesign) ) || "Long Windows")
      }
    }
  
  }
  const handleWindow= (glass,glassType,insert,position, callFetch = true)=>{
    //alert("changing windows, with color: " + `${colorType}:${Color}`)
    //alert("boiGlass Name:" + glass + " Glass Type:" + glassType + " Insert:" + insert)
    let correctDesignName = Design=="Narrow" ? "Long Windows" : Design
    if (glassType== null){ glassType  = "Glass" }
    if (insert== null){ insert  = "No Inserts" }
    setGlass(glass)
    setGlassType(glassType)
    setWindowInserts(insert)
    setWindowPosition(position)
    console.log("line1679")
    if (callFetch){
      //alert("calling window fetch")
      setLoading(true)
      fetchDoor(getPattern(Size,correctDesignName),{[glassType]:glass,"Window Inserts":insert,Position:position})
    }
  }
  const isWindowSelectionComplete = (Glass, glassType, windowInserts, windowPosition) =>{
    //console.log("INSIDE WINDOWSELECTION:",Glass,glassType,windowInserts)
    if (glassType == "Glass"){/*Normal glass needs inserts*/
      return Glass != null && glassType != null && windowInserts != null;
    }
    else if (glassType!= null){/*Infinity windows and designer glass go here*/
      return Glass != null && glassType != null
    }
  }
  const handleShowHardware = (showHardware) => {
    setShowHardware(showHardware);
    if (!showHardware && chosenHardwareSet != null) {
      setLoading(true)
      setChosenHardwareSet(null);
      fetchDoor(getPattern(Size, Design),{"Exterior Hardware":null});
    }
  }
  const handleHardware= (chosenHardwareSet) => {
    if (window.innerWidth<5768){
      setLoading(true)
    }
    setChosenHardwareSet(chosenHardwareSet);
    fetchDoor(getPattern(Size, Design),{"Exterior Hardware":chosenHardwareSet});
  }
  const handleMotor = (chosenMotor) => {
    setLoading(true)
    setSelectedMotor(chosenMotor);
    setTimeout(() =>setLoading(false), 300 )
  }
  // const handleIncludeInstallation = (includeInstallation) => {
  //   setIncludeInstallation(includeInstallation);
  // }
  // const handleIncludePerimeterSeal = (includePerimeterSeal) => {
  // }
  const handleContinue = ()=>{
    console.log("Size:", Size);
    console.log("Design:", Design);
    console.log("InsulationType:", InsulationType);
    console.log("Insulation:", Insulation);
    console.log("Color:", Color);
    console.log("colorType:", colorType);
    console.log("showWindows:", showWindows);
    console.log("windowPosition:", windowPosition);
    console.log("Glass:", Glass);
    console.log("glassType:", glassType);
    console.log("windowInserts:", windowInserts);
    console.log("chosenHardwareSet:", chosenHardwareSet);
    console.log("selectedMotor:", selectedMotor);
    let userChoseMotor = "N/A"
    let userChoseInstall = "N/A"
    let userChosePerimeter = "N/A"
    let doorPrice = Price.replace(/['",]/g, "").trim();
    let totalPrice = doorPrice;
    if (selectedMotor!="Omit"){
      doorPrice -= commonMotors[selectedMotor][2]
      userChoseMotor = `${selectedMotor} ${commonMotors[selectedMotor][0]} ($${commonMotors[selectedMotor][2]})`
    }
    if (includeInstallation){
      doorPrice -= installationPrice
      userChoseInstall = `Yes ($${installationPrice})`
    }
    if (includePerimeterSeal){
      doorPrice -= perimeterPrice
      userChosePerimeter = `Yes ($${perimeterPrice})`
    }
    const currentSelection = {
      "DOOR PRICE":`$ ${doorPrice}`,
      "INCLUDED INSTALLATION": userChoseInstall,
      "INCLUDED PERIMETER SEAL": userChosePerimeter,
      "INCLUDED MOTOR": userChoseMotor,
      "TOTAL PRICE":`$ ${totalPrice}`,
      "URL LINK":createdURL,
      Collection: selectedDoor.collection.toUpperCase(),
      Name: selectedDoor.name,
      Size,
      Design,
      InsulationType,
      "Insulation Number": Insulation,
      "Color Type": colorType,
      Color,
      "Glass Type": Glass==null ? "N/A" : glassType,
      Glass,
      "Window Position": windowPosition,
      "Window Inserts": Glass==null ? "N/A" : windowInserts,
      "Exterior Hardware": chosenHardwareSet,
      // currentDoor: selectedDoor,
    };
    setUserDoorSelections(prev => ({
      ...prev,
      ...currentSelection
    }));
    setShowOrderDialog(true);
    //navigate(`/${selectedDoor.collection}/${selectedDoor.name}/order`);
  }
  function fetchDoor(pattern, parameter){
   //alert("Fetching for pattern:" + pattern + " with parameter:" + JSON.stringify(parameter))
    setDetectFirstLoad(false)
    if (selectedDoor.id=="Aluminum"){
      let newImage = ""
      //alert("URL PARAMS IN FETCH DOOR:" + parameter["Solid Color"])
      if (parameter?.["Solid Color"] && parameter?.Glass){
        //alert("Both Color and  glass detected to change")
        newImage = findAluminumImage(parameter["Width"]||Size, parameter["Solid Color"], parameter["Glass"]);
      }
      else if (parameter?.["Solid Color"] && !parameter?.Glass){
        //alert("Color detected, glass selection not detected")
        newImage = findAluminumImage(parameter["Width"]||Size, parameter["Solid Color"], Glass)
      }
      else if (!parameter?.["Solid Color"] && parameter?.Glass){
        //alert("Color not detected but glass detected")
        newImage = findAluminumImage(parameter["Width"] || Size, Color, parameter["Glass"])
      }
      else if (parameter?.["Width"] && !parameter?.["Solid Color"] && !parameter?.Glass){
        newImage = findAluminumImage(parameter["Width"], Color, Glass)
      }
      //alert("Final aluminum image URL:" + newImage)
      if (newImage){
        setTimeout(() =>setImage(newImage), 300 )
        setTimeout(() =>setLoading(false), 300 )
        return;
      }
      //return;
    }
    //alert("Fetch calling" + windowInserts)
    const rwd = selectedDoor.rwd
    const URL = "https://chi-api.renoworks.com/RenderGrid"
    const site ="CHI"
    const ppf= "80"
    const firstRun = 1
    const api_key= "5809bc44-3cf7-42c5-8395-a9558bb40647"
    const responsePath = "https://chi-api.renoworks.com/data/CHI/"
    console.log("URL PARAMS IN FETCH DOOR:",parameter)/*Parameter refers to the door option(Ex. Color:Blue) user has selected at this time*/
   // console.log(pattern)
    var solidColorOrWood = colorType
    var glassOrDesigner = glassType
    var width=0;
    if ("Width" in parameter) {
      width = parameter["Width"] === "Single" ? "640" : "1280";
    } else {
      width = Size === "Single" ? "640" : "1280";
    }
    for (let key in parameter){/*Handle color type, glass type,*/
      if (key == "Accents Woodtones" || key == "Solid Color") {solidColorOrWood = key}
      if (key == "Glass" || key=="Designer Glass" ||key=="Infinity Windows" || key== "StyleLite"){
        glassOrDesigner = key/*Holds key name of the window Type for API*/
      }
    }
    //console.log("Color Type:",solidColorOrWood)
    //console.log("Glass Or Designer:",glassOrDesigner)
    const incomingDesign = parameter?.Design ?? Design;
    const nextDesign = incomingDesign === "Narrow" ? "Long Windows" : incomingDesign;
    let gridSettings={/*Create the gridSettings based on current door and values*/
      Width:Size,
      Design:nextDesign,
      [solidColorOrWood]:Color,/*Use actual value inside variable, not its name*/
      [glassOrDesigner]:Glass,
      Position:windowPosition,
      "Window Inserts":windowInserts,
       ...(selectedDoor?.style && { Style: selectedDoor.style }),// ← only adds if truthy
       ...(selectedDoor?.hardware && { "Exterior Hardware": chosenHardwareSet }) // ← only adds if truthy
    }
    console.log("Initial Grid Settings:",gridSettings)
    for (let key in parameter){
      //console.log("Updating grid setting for key:",key,"with value:",parameter[key])
      gridSettings[key] = parameter[key]/*Updates correct function passed parameter inside gridSettings*/
      //console.log("Updated grid setting:", key, gridSettings[key])
    }
    console.log("Grid settings:",gridSettings)
    let gridSettingsParameter = ""
    for (let key in gridSettings) {
      if (gridSettings[key] != null){/*Stringifies GridSettings to inject into the API body*/
        gridSettingsParameter += (key + "=" + gridSettings[key] +"|")
      }
    }
    console.log("Final Grid Settings Parameter:",gridSettingsParameter)
    gridSettingsParameter = gridSettingsParameter.slice(0, -1);/*Remove last | character*/
    const formBody = new URLSearchParams();
    formBody.append("rwd", rwd);
    formBody.append("gridSettings", gridSettingsParameter);
    formBody.append("pattern", pattern);
    formBody.append("width", width); 
    formBody.append("height", "560");
    formBody.append("site", site);
    formBody.append("ppf", ppf);
    formBody.append("firstRun", firstRun);
    formBody.append("api_key", api_key);
    //console.log(formBody)

    const apiBase = import.meta.env.DEV
    ? '/api'//vite.config sets the path for /api in dev mode
    : 'https://chi-api.renoworks.com';

    fetch(`${apiBase}/RenderGrid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
      },
      body: formBody.toString()
    }).then((res) => {
       if (!res.ok) throw new Error("Network response was not ok " + res.statusText);
       const contentType = res.headers.get("content-type") || "";
       if (contentType.toLowerCase().includes("application/json")) {
        console.log("Detected JSON response")
        //setResponseType("json")
        return res.json();
       } 
      else if(contentType.toLowerCase().includes("text/plain")) {
        console.log("Detected TEXT response")
       // setResponseType("text")
        return res.text()
      }
     else {
        //setResponseType("Something else") 
      };
    }).then((url) => {
        // console.log("Success:", url)
        console.log("Return:",responsePath+url+"\n\n\n\n\n\n\n\n")
        // const finalUrl = normalizeApiImageUrl(payload, responsePath);
        // if (!finalUrl) {
        //   console.log("No usable image URL in payload")
        //   console.error("RenderGrid: no usable image URL in payload:", payload);
        //   throw new Error("API did not return an image URL");
        // }
        // setImage(finalUrl);
        setImage(responsePath+url)

        setLoading(false)
        // if (buildingFromURL){
        //   //setUrlLoad(false)
        //  setBuildingFromURL(false);
        // }
    })
    .catch((err) => {
      console.error("RenderGrid error:", err);
      alert("We are sorry, our servers are currently experiencing high traffic. Please try again in a few moments or at another time.");
      setLoading(false);
    });
  }
  
  const getPattern = (size, design)=>{
   //alert("Getting pattern for size:" + size + " design:" + design)
    let key = ""
    key = selectedDoor.id + size +design.replace(/ /g, '');
    if (selectedDoor.collection=="Carriage"){
      //alert("Carriage door pattern adjustment")
      key = selectedDoor.id + size + "AnyDesign"
    }
    //console.log("Pattern key: ",key)
    let pattern = patterns[key]
    //alert("found pattern:" + pattern)
    return pattern;
  }

  const [showClipboard, setShowClipboard] = useState(false);
  const shareDoor = async () => {
    if (isDesktopLike){
      navigator.clipboard.writeText(createdURL);
      //alert("Door configuration copied to clipboard!");
      setShowClipboard(true)
      setTimeout(()=>setShowClipboard(false), 1500)

    }
    else{
      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            text: 'Check out this garage door design',
            url: createdURL
          });
        } catch (err) {
          // user cancelled — ignore
        }
      } 
      else {
        await navigator.clipboard.writeText(createdURL);
        alert('Link copied');
      }
    }
  }
  let priceTag = (  (!buildingFromURL && !loading)? <h2 id="price-header" className="price-header">Estimated Price:<strong>${Price}</strong> </h2>
    :<h2 className="price-header wave">
      <span>L</span><span>o</span><span>a</span><span>d</span>
      <span>i</span><span>n</span><span>g</span>
      <span>.</span><span>.</span><span>.</span>
    </h2>/*For mobile/tablet < 1024px width only*/ 
  )
  let submitBtn =   /*For mobile/tablet < 1024px width only*/ 
  <div id="btns-panel" className="btns">
     <p id="discount-text">Final Price is 10% OFF if requested from this site. <a href="https://doorgi.com/specials" target="_blank">Click for more info</a></p>
    <button className={`continue-btn ${doorValid ? "" : "disabled-bt"}`} disabled={!doorValid} onClick={handleContinue}>Order</button><br/>
      
  </div> 
 
  let buttonPanel = /*For desktop only*/ <> 
    {!buildingFromURL && !loading ? <h2 className="price-header">{selectedDoor.name} Estimated Price: <strong>${Price}</strong> </h2>
    :<h2 className="price-header wave">
      <span>L</span><span>o</span><span>a</span><span>d</span>
      <span>i</span><span>n</span><span>g</span>
      <span>.</span><span>.</span><span>.</span>
    </h2>
    }
  
    <div id="btns-panel" className="btns">
      {/* <Link to={`/${props.doorType}`}>
        <button className="back-btn" >Back</button>
      </Link>*/}
      {/* <button className="reset-btn" onClick={handleReset}>Reset</button> */}
      <button className={`continue-btn ${doorValid ? "" : "disabled-bt"}`} disabled={!doorValid} onClick={handleContinue}>Order</button>
      <p id="discount-text">Final Price is 10% OFF if requested from this site. <a href="https://doorgi.com/specials" target="_blank">Click for more info</a></p>
    </div> 
 
  </>
 
  return (
  (selectedDoor.available ? <>
  {showOrderDialog && userDoorSelections!={} && <Order userDoorSelections={userDoorSelections} setShowOrderDialog={setShowOrderDialog} door={selectedDoor}/>}
  {showImageDialog && <ImageDialog handleShowImageDialog={handleShowImageDialog} image={Image} doorName={selectedDoor.name}/>}
  <div id="build-page-grid">
    <div id="door-section">
       {/* <h1>{responseType}</h1> */}
      <div id="img-div" onClick={()=> handleShowImageDialog(!showImageDialog)}>
        {!buildingFromURL &&
        <div id="share-icon-container"  class={isDesktopLike && 'isDesktop'} onClick={(e) => {e.stopPropagation();shareDoor();}}>
          <svg id="share-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 122.88 114.318" enable-background="new 0 0 122.88 114.318" xml:space="preserve">
          <g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M122.88,35.289L87.945,70.578v-17.58c-22.091-4.577-39.542,0.468-52.796,17.271 c2.301-34.558,25.907-51.235,52.795-52.339L87.945,0L122.88,35.289L122.88,35.289z"/>
            <path d="M6.908,23.746h35.626c-4.587,3.96-8.71,8.563-12.264,13.815H13.815v62.943h80.603V85.831l13.814-13.579v35.159 c0,3.814-3.093,6.907-6.907,6.907H6.908c-3.815,0-6.908-3.093-6.908-6.907V30.653C0,26.838,3.093,23.746,6.908,23.746L6.908,23.746 z"/>
          </g>
          </svg>
          {isDesktopLike && <p id="share-text">Share</p>}
        </div>}
        
        {!buildingFromURL && <ZoomIn id ="zoom-in-icon" /> }
        <img id="loading-img" style={{display: loading? "block":"none"}} src={doorgiLogo} className="loading-style"/>
        <img id="door-img" style={{display: !buildingFromURL ? "block" : "none",  transition: "opacity 0.3s ease-in-out"}} src={Image} 
        onLoad={() => {
                console.log("New door image loaded successfully");
                if (buildingFromURL){
                  //alert("Image loaded from URL parameters")
                  setBuildingFromURL(false); // Only switch after the actual image loads
                }
                //setLoading(false);
        }}/>
        {<img id="first-load-img" style={{display: buildingFromURL ? "block" : "none"}}className="page-loading-style" src={doorgiLogo} />}
      </div> 
       {/* <h1>{selectedDoor.name}</h1> */}
      {isDesktopLike ? buttonPanel:
      (viewportWidth >= 1024 && viewportHeight!=1366)? buttonPanel:priceTag}
    </div>
    <div id="options-section">
      { (viewportWidth < 1024 || (viewportWidth>= 1024 && !isDesktopLike) )&& <h2 id="door-name-header">{selectedDoor.name}</h2>}
      <div id="size-container"> 
        <h2>Size</h2>
        <div className='size-box'>
           <h3 onClick={(e) => handleSize(e,"Single")} >Single Car</h3>
          <img src={shortSize} className={`img-fluid ${Size === "Single" ? "selected-size" : ""}`}  onClick={(e) => handleSize(e,"Single")}/>
         
        </div>
        <div className='size-box'>
           <h3 onClick={(e) => handleSize(e,"Double")}> Double Car</h3>
           <img src={doubleSize} className={`img-fluid ${Size === "Double" ? "selected-size" : ""}`}  onClick={(e) => handleSize(e,"Double")}/>
        </div>
      </div>

      {selectedDoor.id != "Planks" && selectedDoor.id!= "SkylineFlush" &&/*Some doors require designs in other places*/
      (Object.keys(selectedDoor.designs).length > 1) &&/*Dont show designs if its only one design*/
      <Designs door={selectedDoor.id} handleDesign={handleDesign} designs={selectedDoor.designs} designStyle={DesignStyle}   selectedInsulation={InsulationType}/>}
      
      {selectedDoor.collection!="Carriage" && selectedDoor.id!="Recessed" && selectedDoor.id!="Aluminum" &&
      <Insulations door={selectedDoor} handleInsulationType={handleInsulationType} insulations={selectedDoor.Insulation} selectedInsulation={InsulationType}/>}

      {showColors && <Colors door={selectedDoor.id} doorCombination={doorCombination} handleColor={handleColor} colors={selectedDoor.colors} woods={selectedDoor.woods} 
      commonSolidColors ={selectedDoor.commonSolidColors} commonWoodTones={selectedDoor.commonWoodTones}colorType ={colorType} IconColor={IconColor}/>}

      {selectedDoor.windows!=null && selectedDoor.id!="Aluminum" && allowWindows && 
      <div id="size-container"> 
        <h2>Windows</h2>
        <div className='size-box'>
          <h3 >No Windows</h3>
          <img src={no_window_img} className={`img-fluid ${showWindows == false ? "selected" : ""}`}  onClick={() =>handleShowWindows(false)}/>
         
        </div>
        <div className='size-box'>
           <h3>With Windows</h3>
           <img src={window_img} className={`img-fluid ${showWindows == true ? "selected" : ""}`}  onClick={() =>handleShowWindows(true)}/>
        </div>
      </div>
      }

      {showWindows && (<>
        {(selectedDoor.id === "Planks" || selectedDoor.id === "SkylineFlush") && (
          <Designs
            door={selectedDoor.id}
            handleDesign={handleDesign}
            designs={selectedDoor.designs}
            designStyle={DesignStyle}
            selectedInsulation={InsulationType}
          />
        )}
        
        <Windows
          doorCombination={doorCombination}
          door={selectedDoor.id}
          handleWindow={handleWindow}
          showWindows={showWindows}
          windows={selectedDoor.windows}
          design={Design}
          glass={Glass}
          insert={windowInserts}
          glassType={glassType}
          position={windowPosition}
        />
      </>
      )}
      {selectedDoor.hardware  && <Hardware showHardware={showHardware} handleShowHardware={handleShowHardware} door={selectedDoor.id} handleHardware={handleHardware} hardware={selectedDoor.hardware} chosenHardwareSet={chosenHardwareSet}/>}
      
      <Motors selectedMotor={selectedMotor} handleMotor={handleMotor} />
      
      {showAdditionalOptions &&
      <div id="additional-estimates-section">
        <h2>Additional Options</h2>
          <div className="flex-row">
            <div className="input-div">
              <input type="checkbox"id="installation-checkbox" checked={includeInstallation} onChange={(e) => setIncludeInstallation(e.target.checked)}/>
              <label htmlFor="installation-checkbox" id="installation-label">Include Installation</label>
            </div>
            <p className="additional-option-price"><strong>${installationPrice}</strong></p>
        </div>
          <div className="flex-row">
            <div className="input-div">
              <input type="checkbox" id="perimeter-seal-checkbox" checked={includePerimeterSeal} onChange={(e) => setIncludePerimeterSeal(e.target.checked)}/>
              <label htmlFor="perimeter-seal-checkbox" id="perimeter-seal-label">Include Perimeter Seal</label>
            </div>
            <p className="additional-option-price"><strong>${perimeterPrice}</strong></p>
          </div>
      </div>
      }
      {!isDesktopLike && viewportWidth < 1024 && submitBtn}
      {viewportWidth >= 1024 && viewportHeight==1366 && submitBtn}
      
    </div>
  </div>
  {isDesktopLike && 
  <div id="clipboard-copy" class={`clipboard-copy ${showClipboard ? "make-visible" : ""}` }>
    <img src={doorgiWithTools} alt="Clipboard Icon"></img>
    Door configuration copied to clipboard!
  </div>
  }
  </>
  ://Ternary for non-available doors
  <Order userDoorSelections={userDoorSelections} setShowOrderDialog={setShowOrderDialog}  door={selectedDoor}/>
  // <DoorUnavailable doorName={selectedDoor.name} email="help@doorgi.com" phone="408-256-2727" 
  //                  location="177 Mayhew Way, Concord"/>
  )
  );
}

// function DoorUnavailable({doorName,email,phone,location}) {
//   const navigate = useNavigate();

//   return (
//      <div className="message-container">
//       <div className="message-box">
//         <h1 className="message-title">
//           {doorName} is currently unavailable
//         </h1>

//         <p className="message">
//           We’re sorry, but this door model is not available at the moment.<br />
//           Please contact us for more information.
//         </p>

//         <div className="contact-info">
//           {email && <p>Email: <span><a href={`mailto:${email}`}>{email}</a></span></p>}
//           {phone && <p>Phone: <span><a href={`tel:${phone}`}>{phone}</a></span></p>}
//           {location && <p>Location: <span><a href={`https://www.google.com/maps/search/?api=1&query=${location}`}  target="_blank"
//                                              rel="noopener noreferrer">{location}</a></span></p>}
//         </div>

//         <button className="back-btn" onClick={() => navigate(-1)}>
//            Back
//         </button>
//          <button className="home-btn unavailable" onClick={() => navigate('/')}>
//            Home
//         </button>
//       </div>
//     </div>
//   );
// }

function ImageDialog({handleShowImageDialog, image, doorName}) {
  return (
    <div id="img-dialog-overlay" className="dialog-overlay" onClick={() => handleShowImageDialog(false)}>
        <img id="img-dialog"src={image} alt={doorName} />
    </div>
  );
}

const patterns = {
  /*NameSizeDesign*/
  /*Traditional*/
  RaisedSingleShortPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",             
  RaisedSingleLongPanel: "21|-|-;21|-|-;21|-|-;21|-|-;",
  RaisedDoubleShortPanel: "21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",             
  RaisedDoubleLongPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  RecessedSingleShortPanel:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  RecessedSingleLongPanel:"21|-|-;21|-|-;21|-|-;21|-|-;",
  RecessedSingleFlush:"21|-|-;21|-|-;21|-|-;21|-|-;",
  RecessedDoubleShortPanel:"21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",
  RecessedDoubleLongPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  RecessedDoubleFlush:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  StampedCarriageSingleShortPanel: "21|-|-;21|-|-;21|-|-;21|-|-;",/*Short/Long have same pattern*/
  StampedCarriageSingleLongPanel:"21|-|-;21|-|-;21|-|-;21|-|-;",
  StampedCarriageDoubleShortPanel:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  StampedCarriageDoubleLongPanel:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",/*Short/Long have same pattern*/
  StampedShakerSingleShaker: "21|-|-;21|-|-;21|-|-;21|-|-;",
  StampedShakerDoubleShaker: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  /*Contemporary*/
  SterlingDoubleFlush:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  SterlingSingleFlush:"21|-|-;21|-|-;21|-|-;21|-|-;",

  PlanksSingleNoOrShortWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  PlanksSingleLongWindows:"21|-|-;21|-|-;21|-|-;21|-|-;",
  PlanksSingleNarrow:"21|-|-;21|-|-;21|-|-;21|-|-;",
  PlanksSingleOversizedWindows:"21|-|-;21|-|-;21|-|-;21|-|-;",
  PlanksDoubleNoOrShortWindows:"21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",
  PlanksDoubleLongWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  PlanksDoubleNarrow:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  PlanksDoubleOversizedWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",

  SkylineFlushSingleNoOrShortWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  SkylineFlushSingleLongWindows:"21|-|-;21|-|-;21|-|-;21|-|-;",
  SkylineFlushSingleNarrow:"21|-|-;21|-|-;21|-|-;21|-|-;",
  SkylineFlushSingleOversizedWindows:"21|-|-;21|-|-;21|-|-;21|-|-;",
  SkylineFlushDoubleNoOrShortWindows:"21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",
  SkylineFlushDoubleLongWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  SkylineFlushDoubleNarrow:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
  SkylineFlushDoubleOversizedWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",

  "AluminumSingleFull-View":"21|-|-;21|-|-;21|-|-;21|-|-;",
  "AluminumDoubleFull-View":"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",

  SteelOverlaySingleAnyDesign:"24|-|-;24|-|-;18|-|-;18|-|-;",
  SteelOverlayDoubleAnyDesign:"24|-|-|-|-;24|-|-|-|-;18|-|-|-|-;18|-|-|-|-;",

  FiberGlassOverlaySingleAnyDesign:"24|-|-;24|-|-;18|-|-;18|-|-;",
  FiberGlassOverlayDoubleAnyDesign:"24|-|-|-|-;24|-|-|-|-;18|-|-|-|-;18|-|-|-|-;",

  ShorelineSingleAnyDesign:"24|-|-;24|-|-;18|-|-;18|-|-;",
  ShorelineDoubleAnyDesign:"24|-|-|-|-;24|-|-|-|-;18|-|-|-|-;18|-|-|-|-;",

  WoodOverlaySingleAnyDesign:"24|-|-;24|-|-;18|-|-;18|-|-;",
  WoodOverlayDoubleAnyDesign:"24|-|-|-|-;24|-|-|-|-;18|-|-|-|-;18|-|-|-|-;",
}