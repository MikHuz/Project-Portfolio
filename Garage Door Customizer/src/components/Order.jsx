import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useLocation,useNavigate,useParams} from 'react-router-dom';
import doorgiLogo from '/logo.png'

function Order({ userDoorSelections,setShowOrderDialog,door}) {
  console.log("USER SELECTIONS INSIDE ORDER.JSX",userDoorSelections)
  const[loading,setLoading]=useState(false);
  const[closing,setClosing]=useState(false);
	const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    //address: '',
    street: '',
    city: '',
    zip: '',
    notes: '',
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    //address:false,
    street:false,
    city: false,
    zip: false,
    requests: false,
  });
  const containerRef = useRef(null);
  const lastScrollRef = useRef(0);

  // Prevent iOS Safari from jumping scroll position on viewport resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      lastScrollRef.current = window.scrollY || window.pageYOffset;
    };

    const handleTouchMove = (e) => {
      // Preserve scroll during momentum scrolling
      lastScrollRef.current = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('scroll', handleScroll, false);
    window.addEventListener('touchmove', handleTouchMove, false);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  useEffect(()=>{
    if(door.id=="WoodOverlay" || door.id=="Sterling"){
     form.notes += `I am interested in ${door?.name } doors, and would like more information about their options, availability and pricing.`
     setForm({...form});
    }
  },[])
  useEffect(() => {
    if (!closing) return;
    setTimeout(() => setShowOrderDialog(false), 300);
  }, [closing]);
	// Map standardized autofill names back to your state keys
	const nameMap = {
		'given-name': 'firstName',
		'family-name': 'lastName',
		'email': 'email',
		'tel': 'phone',
		'address-level2': 'city',
		'postal-code': 'zip',
		'notes': 'notes',
    'street':'street'
	};
  // Replace handleChange to use the name map and fix phone '+' handling
	const handleChange = (e) => {
		let { name, value } = e.target;
		const field = nameMap[name] || name;
    if (field === "phone") {
      let digits = value.replace(/\D/g, '');
      //alert(digits + " " + digits.length)
    // Remove all non-numeric characters
      if (value.startsWith('+1')){
        //alert("Detected country code +1, removing it. Please enter a 10-digit phone number without country code.");
        value = value.replace("+1","");digits = digits.slice(1,digits.length);
        //alert("New valuew:"+value + " Length:"+digits.length)
      }
      if (value.startsWith('1') && digits.length === 11){
        //alert("Detected leading '1', removing it. Please enter a 10-digit phone number without country code.");
        value = value.slice(1);digits = digits.slice(1,digits.length);
        //alert("New valuew:"+value + " Length:"+digits.length)
      }
      if (value.startsWith('+') && digits.length == 11){
        //alert("Detected a 1 digit country code in phone number, removing it. Please enter a 10-digit phone number without country code.");
          value = value.slice(2)// 1 digit code
          digits =digits.slice(2,digits.length);
      }
      else if (value.startsWith('+') && digits.length > 11){
          //alert("Detected a 2 digit country code in phone number, removing it. Please enter a 10-digit phone number without country code.");
          value = value.slice(3)// 2digit code
          digits =digits.slice(3,digits.length);
      }
    //value = value.replace(/\D/g, '');
  }
		setForm((prev) => ({ ...prev, [field]: value }));
	};
  // Keep touched state in sync with mapped field names
	const handleBlur = (e) => {
		const field = nameMap[e.target.name] || e.target.name;
		setTouched((prev) => ({ ...prev, [field]: true }));
	};
  const isFormFilled = () => {
    return (
      form.firstName.trim() !== '' &&
      form.lastName.trim() !== '' &&
      form.email.trim() !== '' &&
      form.phone.trim() !== '' &&
      //form.address.trim() !== ''
      form.street.trim() !== '' &&
      form.city.trim() !== '' &&
      form.zip.trim() !== ''
    );
  };
  const isFormValid = () => {
    if (isFormFilled()){
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(form.email)) {
           // alert("Please enter a valid email address Ex: user@example.com");
            return;
        }
        return true;
    }
  };
  const handleClose = () => {
  if (window.history.length <= 1) {
    window.close();
    navigate(-1);
  }
  else if (door.id=="WoodOverlay" || door.id=="Sterling"){
    //alert("The selected door model may not be available in your area. Please contact us for more information.");
    navigate(-1)
  }
  else{
    setClosing(true);
    //setShowOrderDialog(false);
  }
  }
  const handleSubmit = (e) => {
	//alert("Inside sumit handler");
  e.preventDefault();

  if (!isFormFilled()) return;
	if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(form.email.trim())) {
		//alert("Please enter a valid email address (e.g. user@example.com)");
		return;
	}
	else{
		//alert("valid email")
	}
  setLoading(true);
  let cleanPhone = form.phone.replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    //alert("Formatting phone number as (XXX) XXX-XXXX");
    cleanPhone = cleanPhone.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
  }
 // console.log("Formatted Selections:", formattedSelections);
  const formData = new FormData();
  //alert(cleanPhone)
	formData.append("_wpcf7", "4724");
	formData.append("_wpcf7_version", "5.9.5");
	formData.append("_wpcf7_locale", "en_US");
	formData.append("_wpcf7_unit_tag", "wpcf7-f4724-p4726-o1");
	formData.append("_wpcf7_container_post", "0");
	formData.append("form-name", form.firstName + " " + form.lastName);
	formData.append("form-phone", cleanPhone);
	formData.append("form-email", form.email);
  formData.append("form-street", form.street);
  formData.append("form-city", form.city);
  formData.append("form-zip", form.zip);
  //formData.append("form-address", form.address);
  if (form.notes.trim() === ''){
    formData.append("form-message", "No special instructions or requests.");
  }
  else{
    formData.append("form-message", form.notes);
  }
if (Object.keys(userDoorSelections).length > 0){
    //alert("Adding door selections to order form.");
    const formattedOptions = Object.entries(userDoorSelections)
    .map(([key, value]) => `${key}: ${value ?? 'N/A'}`)
    .join('\n\n')
    .trimStart();
    formData.append("form-doorOptions", formattedOptions);
  }
  else{
    //alert("No door selections found to add to order form.");
    formData.append("form-doorOptions", "No options selected, customer is inquiring about a door.");
  }
	console.log(formData.get("form-name"), formData.get("form-email"), formData.get("form-message"),
              formData.get("form-doorOptions") );
              
  console.log("URL IN SELECTIONS:" , formData.get("form-doorOptions"))
  fetch("https://doorgi.com/wp-json/contact-form-7/v1/contact-forms/4724/feedback", {
			method: "POST",
			body: formData,
			headers: {
					"Accept": "application/json, */*;q=0.1",
					"Origin": "https://doorgi.com"
			}
		})
		.then(res => {
				if (res.status === 200) {
						//("Your order has been submitted successfully!");
				} else {
						alert("There was an error submitting your order. Please try again later.");
				}
				return res.json();
		})
		.then(data => {
				console.log(data);
        setLoading(false);
        setShowOrderDialog(false);
				navigate("/submittedDoor")
		})
		.catch(err => console.error(err));
	};

  return (<>
    <div id="order-container"  ref={containerRef}>
      <form id="order-form" onSubmit={handleSubmit} autoComplete="on" className={`${closing? 'closing' : ''}`}>
        <img id="submit-form-logo" style={{display:loading? "block":"none"}} src={doorgiLogo} className="loading-style"/>
      <div className="order-header">
        <button type="button" className="close-btn" onClick={() => handleClose()} aria-label="Close Order Form">
          &times;
        </button>
          {/* <h3>Details</h3> */}
      </div>
      <div className="row-container">
        <div className="form-row">
            <label> <sup>*</sup>First Name</label>
            <input
            type="text"
            name="given-name"
            value={form.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder='John'
            autoComplete='given-name'
            />
            <span className="error" id="firstNameError">
                {touched.firstName && !form.firstName.trim() ? "First Name is required" : ""}
            </span>
        </div>
        <div className="form-row">
          <label> <sup>*</sup>Last Name</label>
          <input
          type="text"
          name="family-name"
          value={form.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder='Smith'
          autoCapitalize='family-name'
          autoComplete="family-name"
          />
          <span className="error" id="lastNameError">
              {touched.lastName && !form.lastName.trim() ? "Last Name is required" : ""}
          </span>
        </div>
      </div>
      <div className="row-container">
        <div className="form-row">
          <label> <sup>*</sup>Email</label>
          <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder='John@example.com'
          autoComplete='email'
          />
          <span className="error" id="emailError">
              {touched.email && !form.email.trim() ? "Email is required" : ""}
          </span>
        </div>
        <div className="form-row">
            <label> <sup>*</sup>Phone</label>
            <input
            type="tel"
            name="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            // Require 10 digits; allow (555) 555-5555, 555-555-5555, 555 555 5555, or 5555555555
            pattern={"(?:\\D*\\d){10}\\D*$"}
            title="Enter a raw 10-digit phone (e.g. 123-456-7890)"
            onInvalid={(e) =>
              e.target.setCustomValidity(
                'Please enter a valid 10-digit phone number (e.g. 123-456-7890, 1234567890)'
              )
            }
            onInput={(e) => e.target.setCustomValidity('')}
            inputMode="tel"
            autoComplete="tel"
            placeholder="123-456-7890"
            />
          <span className="error" id="phoneError">
              {touched.phone && !form.phone.trim() ? "Phone number is required" : ""}
          </span>
        </div>
      </div>
        <div className="form-row">
        <label>
          <sup>*</sup>Street Address
        </label>
        <input
          type="text"
          name="street"
          value={form.street}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="123 Main St"
          autoComplete="street-address"
        />
        <span className="error" id="streetError">
          {touched.street && !form.street.trim() ? "Street address is required" : ""}
        </span>
      </div>
      <div className="row-container">
        <div className="form-row">
          <label> <sup>*</sup>City</label>
          <input
            type="text"
            name="address-level2"
            value={form.city}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="San Jose"
            autoComplete="address-level2"
          />
          <span className="error" id="cityError">
            {touched.city && !form.city.trim() ? "City is required" : ""}
          </span>
        </div>

        <div className="form-row">
          <label> <sup>*</sup>ZIP Code</label>
          <input
            type="text"
            name="postal-code"
            value={form.zip}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="94567"
            pattern="^\d{5}(-\d{4})?$"  
            title="Enter a valid ZIP code (e.g. 90001 or 90001-1234)"
            autoComplete="postal-code"  
          />
          <span className="error" id="zipError">
            {touched.zip && !form.zip.trim() ? "ZIP code is required" : ""}
          </span>
        </div>
      </div>
      <div className="form-row">
          <label>Notes</label>
          <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={window.innerWidth < 768 ? 4 : 3}
          placeholder='Any Special Instructions Or Requests?'
          />
      </div>
      <button type="submit" disabled={!isFormFilled()} className="submit-btn">Submit Order</button>
      </form>
    </div>
  </>
  );
}
export default Order;
      {/*<div className="form-row">
          <label> <sup>*</sup>Address</label>
          <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          onBlur={(e) => setTouched({ ...touched, [e.target.name]: true })}
          required
          placeholder='123 Main St, Anytown, USA'
          autoComplete="street-address"
          />
          <span className="error" id="addressError">
              {touched.address && !form.address.trim() ? "Address is required" : ""}
          </span>
      </div> */}