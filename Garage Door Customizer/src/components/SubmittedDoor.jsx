import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useLocation,useNavigate} from 'react-router-dom';
import '../css/index.css'

export default function SubmittedDoor({doorName,email,phone,location}) {
  const navigate = useNavigate();

  return (
    <div className="message-container">
      <div className="message-box">
        <h1 className="message-title">
          Thank You for Choosing Doorgi!
        </h1>

        <p className="message">
            We will reach out back to you with your door.<br/>
            Please contact us for more information if you have any questions.
        </p>

        <div className="contact-info">
          {email && <p>Email: <span>Omitted</span></p>}
          {phone && <p>Phone: <span>Omitted</span></p>}
          {location && <p>Location: <span>Omitted</span></p>}
        </div>
      </div>
    </div>
  );
}