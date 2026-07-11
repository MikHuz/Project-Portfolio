import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useLocation,useNavigate} from 'react-router-dom';
import '../css/message_container.css'

export default function SubmittedDoor({doorName,email,phone,location}) {
  const navigate = useNavigate();

  return (
    <div className="message-container">
      <div className="message-box">
        <h1 className="message-title">
          Thank You for Choosing Doorgi!
        </h1>

        <p className="message">
            We will reach out back to you with a quote for your door.
            Please <a style={{color:"purple"}} href="https://doorgi.com/contact-us/">contact us</a> for more information if you have any questions or wish to make changes.
        </p>

        <div className="contact-info">
          {email && <p>Email: <span><a href={`mailto:${email}`}>{email}</a></span></p>}
          {phone && <p>Phone: <span><a href={`tel:${phone}`}>{phone}</a></span></p>}
          {location && <p>Location: <span><a href={`https://www.google.com/maps/search/?api=1&query=${location}`} target="_blank"
                                              rel="noopener noreferrer">{location}</a></span></p>}
        </div>
      </div>
    </div>
  );
}