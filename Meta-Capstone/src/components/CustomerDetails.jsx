import { memo } from "react";
import { useState,useContext,useEffect,useRef} from 'react'
import { Routes, Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CustomerProvider,CustomerContext } from '../CustomerContext';

function CustomerDetails(props) {
  const location = useLocation();
  const {customerDetails,updateDetails} = useContext(CustomerContext)
  console.log("INSIDE CUSTOMER DETAILS:", customerDetails)
  const userDetails = customerDetails.details;
  const [details, setDetails] = useState(userDetails !== '' ? userDetails:
    {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requests: ''
  });
  const { date, time, guests } = customerDetails.table;
  //console.log("This IS FROM CONTEXT OR NOT: ",details)

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    requests: false
  });

  const navigate = useNavigate();

  const isFormFilled = () => {
    return (
      details.firstName.length > 0 &&
      details.lastName.length > 0 &&
      details.email.length > 0 &&
      details.phone.length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled() && e.target.checkValidity()) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(details.email)) {
        alert("Please enter a valid email address Ex: user@example.com");
        return;
      }
      updateDetails(details)
      console.log("Customer Details submitted:", details);
      navigate("/reserve/payment");
    }
  };

  return (
    <>
      <form
        className="customer-details-form"
        onSubmit={handleSubmit}
        aria-labelledby="form-heading"
        aria-describedby="reserve-reminder-message"
      >
        <div className="form-header">
          <h2 id="form-heading">Customer Details</h2>
          <p id="reserve-reminder-message">
            Please provide your details to confirm the reservation at <span>{date}</span>, <span>{time}</span>, for <span>{guests}</span> guests.
          </p>
        </div>

        <div className="form-box">
          <label htmlFor="firstName" className="call-to-attention">
            <sup>*</sup>First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            value={details.firstName}
            required
            aria-describedby={touched.firstName && details.firstName.length === 0 ? "firstNameError" : undefined}
            onChange={(e) =>setDetails({ ...details, [e.target.name]: e.target.value })}
            onBlur={(e) =>setTouched({ ...touched, [e.target.name]: true })}
          />
          {touched.firstName && details.firstName.length === 0 && ( <span className="error" id="firstNameError">First Name is required</span>)}
        </div>

        <div className="form-box">
          <label htmlFor="lastName" className="call-to-attention">
            <sup>*</sup>Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Smith"
            value={details.lastName}
            required
            aria-describedby={touched.lastName && details.lastName.length === 0 ? "lastNameError" : undefined}
            onChange={(e) =>setDetails({ ...details, [e.target.name]: e.target.value })}
            onBlur={(e) =>setTouched({ ...touched, [e.target.name]: true })}
          />
          {touched.lastName && details.lastName.length === 0 && (
            <span className="error" id="lastNameError">
              Last Name is required
            </span>
          )}
        </div>

        <div className="form-box">
          <label htmlFor="email" className="call-to-attention">
          <sup>*</sup>Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={details.email}
            placeholder="email@example.com"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$"
            required
            aria-describedby={touched.email && details.email.length === 0 ? "emailError" : undefined}
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
            onBlur={(e) =>
              setTouched({ ...touched, [e.target.name]: true })
            }
          />
          {touched.email && details.email.length === 0 && (
            <span className="error" id="emailError">
              Email is Required
            </span>
          )}
        </div>

        <div className="form-box">
          <label htmlFor="phone" className="call-to-attention">
            <sup>*</sup>Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={details.phone}
            placeholder="123-456-7890"
            pattern="\d{3}-?\d{3}-?\d{4}"
            required
            aria-describedby={touched.phone && details.phone.length === 0 ? "phoneError" : undefined}
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
            onBlur={(e) =>
              setTouched({ ...touched, [e.target.name]: true })
            }
          />
          {touched.phone && details.phone.length === 0 && (
            <span className="error" id="phoneError">
              Phone is Required
            </span>
          )}
        </div>

        <div className="form-box">
          <label htmlFor="requests">Special Requests</label>
          <textarea
            id="requests"
            name="requests"
            value={details.requests}
            placeholder="(Optional)"
            aria-label="Special requests or additional notes"
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className='buttons'>
          <button id="back-btn" type="button" aria-label="Back Button" onClick={() => navigate("/reserve")}>
            Back
          </button>
          <button id="details-btn" type="submit" disabled={!isFormFilled()} aria-label="Continue to payment">
            Continue To Payment
          </button>
        </div>
      </form>
    </>
  );
}

export default memo(CustomerDetails)