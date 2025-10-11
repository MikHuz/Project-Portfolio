import { useDrawerContext } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day); 
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default function Confirmation(props){
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("formData"));
  const firstName = userData.firstName
  const lastName = userData.lastName
  const guests = userData.guests
  const date = formatDate(userData.date)
  const time = userData.time
  const seating = userData.seatingPreference
  return (<>
  <div id="confirmation-page">
    <h2>Reservation Confirmed!</h2>
    <span>Thank you for choosing Little Lemon. We look forward to serving you!</span>
    <span ><strong>Name: {firstName} {lastName}</strong></span>
    <span><strong>Date: {date}</strong></span>
    <span><strong>Time: {time}</strong></span>
    <span><strong>Guests: {guests}</strong></span>
    <span><strong>Seating Placement: {seating}</strong></span>
    <button id="home-btn"onClick={() => navigate('/reserve')}>Home</button>
  </div>
  </>)
}