import { memo } from "react";
import {fetchAPI,submitAPI} from '../apis/timeAPI.js'
import { useState,useContext,useEffect,useRef} from 'react'
import { Routes, Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CustomerContext } from '../CustomerContext';
import { CustomerProvider } from '../CustomerContext'; 
import restaurant from '/src/assets/restaurant.jpg'
import restaurant_food from '/src/assets/restaurant_food.jpg'
import mario_adrian_A from '/src/assets/Mario and Adrian A.jpg'

function formatDate(date) {
    return date.toISOString().split('T')[0];
  }
function ReserveATable({availableTimes, updateTimes}){
  const { customerDetails, updateTable} = useContext(CustomerContext);
  const { table } = customerDetails;
  const [date, setDate] = useState(table.date !== '' ? table.date : '');
  const [time, setTime] = useState(table.time !== '' ? table.time : '');
  const [guests, setGuests] = useState(table.guests !== '' ? table.guests : 1);
  const [occasion, setOccasion] = useState(table.occasion !== '' ? table.occasion : '');
  const [seatingPreference, setSeatingPreference] = useState(table.seatingPreference !== '' ? table.seatingPreference : '');
  const today = new Date()
  const minDate = formatDate(today);
  const maxDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 365));
  const navigate = useNavigate();
  console.log("TABLE:", table);
  console.log(date,time,guests,occasion,seatingPreference)
  const isFormValid = ()=>{
    if(date && time && guests && occasion && seatingPreference){
      return true
    }
    return false
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(isFormValid() &  e.target.checkValidity()){
      console.log("Reservation submitted:", { date, time, guests, occasion });
      updateTable({date,time,guests,occasion,seatingPreference})
      navigate("/reserve/customerdetails", {state:{date:date,time:time,guests:guests}});
    }
  }
  const isTableAvailable = () => {
    // Placeholder logic for real table availability, is called upon every form entry like isFormValid
    return true;
  }
  useEffect(()=>{
    async function fetchTimes(date){
      const userSelectedDateTimes = await fetchAPI(new Date(date))
      updateTimes({type:"updatingTimes",payload:userSelectedDateTimes} )
    }
    if (date!== ''){
      fetchTimes(date)
    }
  },[date])
  const timeOptions = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"]
  return (<>
      <form className="table-selection-form" onSubmit={handleSubmit} method="GET" aria-labelledby="table-header">
        <h2 id="table-header">Reserve-A-Table</h2>
        <img id="img1" src={restaurant} alt="Interior of Little Lemon restaurant" />
        <img id="img2" src={mario_adrian_A} alt="Mario and Adrian, owners of Little Lemon" />

        <div className='form-box date-box'>
          <label htmlFor="date">Select Date</label>
          <input type="date" id="date" name="date" value={date} min={minDate} max={maxDate}
           onChange={(e) => {
              setDate(e.target.value); 
              setTime(''); }}
           required />
        </div>
   
        <div className='form-box time-box'>
          <label htmlFor="time">Select Time(9AM-8PM)</label>
          <select value={time} id="time" name="time" onChange={(e) => setTime(e.target.value)} required>
            <option value="">Select A Time</option>
            {timeOptions.map((time)=>{
              if (availableTimes.includes(time)){
                return <option key={time} value={time}>{time}</option>
              }
              else{
                return <option key={time} value={time} disabled>{time}</option>
              }
            })}
          </select>
        </div>

        <div className='form-box guest-box'>
          <label htmlFor="guests">Number of Guests(Max 10)</label>
          <input type="number" id="guests" name="guests" min="1" max="10" value={guests} onChange={(e) => setGuests(e.target.value)} required />
        </div>

        <div className='form-box occasion-box'>
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} required>
            <option value="">Select an occasion</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>

        <fieldset className='form-box preference-box' style={{borderRadius:"16pt",border:"2px solid black", borderColor:"black"}}>
          <legend className="call-to-attention" style={{color:"#EDEFEE"}}>Seating Preference</legend>
          <label htmlFor="indoor">
            <input
              type="radio"
              id="indoor"
              name="seating-preference"
              value="Indoor"
              checked={seatingPreference === 'Indoor'}
              onChange={(e) => setSeatingPreference(e.target.value)}
              required
            />
            Indoor
          </label>
          <label htmlFor="outdoor">
            <input
              type="radio"
              id="outdoor"
              name="seating-preference"
              value="Outdoor"
              checked={seatingPreference === 'Outdoor'}
              onChange={(e) => setSeatingPreference(e.target.value)}
              required
            />
            Outdoor
          </label>
        </fieldset>

        <div className='table-availability-box'  aria-atomic="true" aria-live="Assertive" role="status">
          {(isFormValid() && isTableAvailable()) ? <h3>Available!</h3>:<h3>No Tables Available</h3>}
        </div>
        <button id="reservation-btn" type="submit" disabled={!isFormValid()}>Select Table</button>
      </form>
  </>)
}
export default memo(ReserveATable);