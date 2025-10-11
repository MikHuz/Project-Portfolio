import { useState,useContext,useEffect,useRef,useReducer} from 'react'
import { Routes, Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CustomerContext } from './CustomerContext';
import { CustomerProvider } from './CustomerContext'; 
import {fetchAPI,submitAPI} from './apis/timeAPI.js'

import  ReserveATable from './components/ReserveATable.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import Payment from './components/Payment.jsx'
import Confirmation from './components/Confirmation.jsx'
import './css/index.css'
import './css/App.css'
import menu from '/src/assets/hamburger_menu.png'
import logo from '/src/assets/Logo.png'
import smallLogo from '/src/assets/small_logo.png'
import basket from '/src/assets/Basket.png'

function Header(props){
  return (<>
  <header>
    <nav id="header-nav" role="navigation" aria-label="Primary navigation">
    <ul>
      <li><a href="" area-label="Open Main Menu"><img src={menu} alt="Hamburger Icon"/></a></li>
      <li><a href="/reserve" area-label="Go To Home Page"><img src={logo} alt="Little Lemon Logo"/></a></li>
      <li><a href="" aria-label="Your Current Menu Cart"><img src={basket} alt="Basket Icon"/></a></li>
    </ul>
    </nav>
    <div className="header-text">
      <h1>Little Lemon</h1>
      <h2>Chicago</h2>
    </div>
  </header>
  </>)
}
function convertToAmPm(time24) {
  const [hourStr, minute] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}
function updateTimes(state, action){
  let timesAMPM = []
  switch(action.type){
    case("initializeTimes"):
      timesAMPM = action.payload.map( timeSlot =>{
        return convertToAmPm(timeSlot)
      })
      return timesAMPM
      break;
    case('updatingTimes'):
      timesAMPM = action.payload.map( timeSlot =>{
        return convertToAmPm(timeSlot)
      }) 
      return timesAMPM
      break;
    default:
      return []
      break;
  }
}
function BookingPage(){
  const [availableTimes, dispatch] = useReducer(updateTimes, []);

  useEffect(() => {
    async function initializeTimes() {
      const currentDate = new Date();
      const currentTimes = await fetchAPI(currentDate);
      dispatch({ type: 'initializeTimes', payload: currentTimes });
    }
    initializeTimes();
  }, []);
  const submitBooking = (data)=>{
    //alert("submitting reservation")
    console.log("Customer Form data:",data)
    if (submitAPI(data)){
      localStorage.setItem("formData", JSON.stringify(data));
      const savedData = JSON.parse(localStorage.getItem("formData"));
      console.log("LOCALSTORAGE:" ,savedData)
      return true;
    }
    return false;
  }
 // console.log("AvaibleTimes:", availableTimes);
  return(
 <Routes>
  <Route path="/" element={<Navigate to="/reserve" />} />
  <Route path="/reserve" element={<ReserveATable availableTimes={availableTimes} updateTimes={dispatch}/>} />
  <Route path="/reserve/customerdetails" element={<CustomerDetails />} />
  <Route path="/reserve/payment" element={<Payment submitBooking={submitBooking}/>} />
  <Route path="/reserve/confirmation" element={<Confirmation />} />
 </Routes>
  )
}
function Footer(props){
  return (<>
  <footer id="footer-content">
    <img src={smallLogo} alt="Little Lemon Logo" className="footer-logo"/>
    <div className="footer-links">
      <ul>
        <li><a href="/reserve">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </div>
    <div className="footer-contact">
      <div><p>Contact Us:</p></div>
      <p>Email: littlelemon@email.com</p>
      <p>Phone: (123) 456-7890</p>
      <p>Address: 123 Main St, Chicago, IL</p>
    </div>
  </footer>
  </>)
}
function App() {
return (<>
<CustomerProvider>
  <div className="layout">
      <Header />
      <main className="content">
        <BookingPage/>
      </main>
      <Footer />
    </div>
</CustomerProvider>
</>)
}

export default App
