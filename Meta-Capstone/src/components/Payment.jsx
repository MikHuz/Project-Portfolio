import { memo } from "react";
import { useState,useContext,useEffect,useRef} from 'react'
import { Routes, Route,Navigate,Link,useNavigate,useLocation} from 'react-router-dom';
import { CustomerContext,CustomerProvider} from '../CustomerContext';
import credit_card from '/src/assets/creditcard.png'
function Payment({submitBooking}) {
  const navigate = useNavigate();
  const { customerDetails, updatePayment,updateDetails,updateTable} = useContext(CustomerContext);
  console.log("INSIDE CUSTOMER DETAILS:", customerDetails)
  const [paymentDetails, setPaymentDetails] = useState(customerDetails.payment);
  //console.log(paymentDetails)
  const [touched,setTouched]=useState({
    cardNumber: false,
    cardName: false,
    expiryDate: false,
    cvv: false,
    confirmationPreference: false
  })
  const isFormFilled = () => {
  return (
    paymentDetails.cardNumber.trim() !== '' &&
    paymentDetails.cardName.trim() !== '' &&
    paymentDetails.expiryDate.trim() !== '' &&
    paymentDetails.cvv.trim() !== '' &&
    paymentDetails.confirmationPreference.trim() !== ''
  );
};
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name,value)
    setPaymentDetails(prev => ({
      ...prev,
      [name]:value
    }));
    setTouched({...touched,[name]:true})
    updatePayment(paymentDetails)
  };
  const handleSubmit = (e) => {
  e.preventDefault();
    if (e.target.checkValidity()){
      console.log("Payment Confirmed", paymentDetails);
      if (submitBooking({...customerDetails.table,...customerDetails.details,...customerDetails.payment})){
        updatePayment({cardNumber: '', cardName: '', expiryDate: '', cvv: '', confirmationPreference: ''});
        updateDetails({firstName: '',lastName: '',email: '',phone: '',requests: ''});
        updateTable({date: '',time: '',guests: 1, occasion: '',seatingPreference: ''});
        navigate("/reserve/confirmation");
      }
    }
  };

  return (
<div id="payment-page">
  <form id="payment-form" onSubmit={handleSubmit} aria-labelledby="payment-header">
    <div className='form-header'>
      <h2 id="payment-header">Payment Details</h2>
      <p id="payment-desc">Please add your payment method.</p>
    </div>

    <div className="payment-input">
      <label htmlFor="card-number"><sup>*</sup>Card Number</label>
      <input
        type="text"
        id="card-number"
        name="cardNumber"
        placeholder="xxxx-xxxx-xxxx-xxxx"
        required
        pattern="\d{4}([\s\-_]?\d{4}){3}"
        title="Enter a 16-digit card number"
        aria-describedby="card-error"
        value={paymentDetails.cardNumber}
        onChange={handleChange}
        onBlur={e => setTouched({ ...touched, [e.target.name]: true })}
      />
      <div className="payment-error" id="card-error" aria-live="polite">
        {touched.cardNumber && paymentDetails.cardNumber.length === 0 && (
          <span className="error">Please enter a valid card number</span>
        )}
      </div>
    </div>

    <div className="payment-input">
      <label htmlFor="card-name"><sup>*</sup>Name on Card</label>
      <input
        type="text"
        id="card-name"
        name="cardName"
        placeholder="Name on Card"
        required
        title="Enter the name as it appears on your card"
        aria-describedby="name-error"
        value={paymentDetails.cardName}
        onChange={handleChange}
        onBlur={e => setTouched({ ...touched, [e.target.name]: true })}
      />
      <div className="payment-error" id="name-error" aria-live="polite">
        {touched.cardName && paymentDetails.cardName.length === 0 && (
          <span className="error">Please enter the name on your card</span>
        )}
      </div>
    </div>

    <div className="payment-input-row">
      <div className="payment-input">
        <label htmlFor="expiry-date"><sup>*</sup>Exp. Date</label>
        <input
          type="text"
          id="expiry-date"
          name="expiryDate"
          placeholder="MM/YY"
          required
          pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
          title="Enter the card expiry date in MM/YY format"
          aria-describedby="expiry-error"
          value={paymentDetails.expiryDate}
          onChange={handleChange}
          onBlur={e => setTouched({ ...touched, [e.target.name]: true })}
        />
        <div className="payment-error" id="expiry-error" aria-live="polite">
          {touched.expiryDate && paymentDetails.expiryDate.length === 0 && (
            <span className="error">Please enter a valid expiry date</span>)}
        </div>
      </div>

      <div className="payment-input">
        <label htmlFor="cvv"><sup>*</sup>CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          placeholder="xxx"
          required
          pattern="\d{3}"
          title="Enter the 3-digit CVV code"
          aria-describedby="cvv-error"
          value={paymentDetails.cvv}
          onChange={handleChange}
          onBlur={e => setTouched({ ...touched, [e.target.name]: true })}
        />
        <div className="payment-error" id="cvv-error" aria-live="polite">
          {touched.cvv && paymentDetails.cvv.length === 0 && (
            <span className="error">Please enter a valid CVV</span>
          )}
        </div>
      </div>

      <div className="payment-input">
        <label style={{ visibility: "hidden" }}>Hidden Text</label>
        <img
          src={credit_card}
          id="credit-logo"
          alt="Credit card icon representing secure payment"
        />
      </div>
    </div>
    <div className="payment-confirmation">
          <label htmlFor="email">Send me a Confirmation Via Email</label>
          <input type="radio" id="email" name="confirmationPreference" value="email"
            onChange={handleChange}
            required
          />
    </div>
    <div className="payment-confirmation">
        <label htmlFor="phone">Send me a Confirmation Via Text</label>
        <input type="radio" id="phone" name="confirmationPreference" value="text"
          onChange={handleChange}
          required
        />
      </div>
      <div className='buttons'>
          <button id="back-btn" type="button" onClick={() => navigate("/reserve/customerdetails")}>
            Back
          </button>
        <button id="payment-btn" type="submit" disabled={!isFormFilled()} aria-disabled={!isFormFilled()}>
          Make Reservation
        </button>
        </div>
      </form>
    </div>
  );
}

export default memo(Payment);