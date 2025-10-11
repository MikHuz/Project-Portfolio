import '@testing-library/jest-dom';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ReserveATable from './components/ReserveATable.jsx';
import CustomerDetails from './components/CustomerDetails.jsx'
import Payment from './components/Payment.jsx'
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CustomerProvider } from './CustomerContext';
function renderComponent(path,props){
 const componentMap = {
  "reserve": ReserveATable,
  "reserve/customerdetails": CustomerDetails,
  "reserve/payment": Payment,
  /*"reserve/confirmation": Confirmation,*/
};
  const ComponentToRender = componentMap[path]
    return render(
      <MemoryRouter initialEntries={[`/${path}`]}>
        <CustomerProvider>
          <Routes>
            <Route path={path} element={<ComponentToRender {...props}/>}/>
          </Routes>
        </CustomerProvider>
      </MemoryRouter>
    );

}
describe("Reserve Table Form", () => {
   const timeOptions = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"]
 test("All form elements are present", () => {
    const props={availableTimes:timeOptions, updateTimes:jest.fn()}
    renderComponent("reserve", props);

    expect(screen.getByLabelText(/select date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/indoor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/outdoor/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /select table/i })).toBeInTheDocument();
  });

  test("Input Interaction for all fields", () => {
    const props= {availableTimes:timeOptions, updateTimes:jest.fn()}
    renderComponent("reserve", props);

    const dateInput = screen.getByLabelText(/select date/i);
    fireEvent.change(dateInput, { target: { value: "2025-08-06" } });
    expect(dateInput.value).toBe("2025-08-06");

    const timeSelect = screen.getByLabelText(/select time/i);
    fireEvent.change(timeSelect, { target: { value: "10:30 AM" } });
    expect(timeSelect.value).toBe("10:30 AM");

    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "5" } });
    expect(guestsInput.value).toBe("5");

    const occasionSelect = screen.getByLabelText(/occasion/i);
    fireEvent.change(occasionSelect, { target: { value: "birthday" } });
    expect(occasionSelect.value).toBe("birthday");

    const indoorRadio = screen.getByLabelText(/indoor/i);
    const outdoorRadio = screen.getByLabelText(/outdoor/i);

    fireEvent.click(indoorRadio);
    expect(indoorRadio.checked).toBe(true);
    expect(outdoorRadio.checked).toBe(false);

    fireEvent.click(outdoorRadio);
    expect(outdoorRadio.checked).toBe(true);
    expect(indoorRadio.checked).toBe(false);

    const submitButton = screen.getByRole('button', { name: /select table/i });
    // no toBeInTheDocument here per your request
  });

  test("Submit Button disabled functionality", () => {
    const props= {availableTimes:timeOptions, updateTimes:jest.fn()}
    renderComponent("reserve", props);

    const submitButton = screen.getByRole('button', { name: /select table/i });
    expect(submitButton).toBeDisabled();

    const dateInput = screen.getByLabelText(/select date/i);
    fireEvent.change(dateInput, { target: { value: "2025-08-06" } });
    expect(submitButton).toBeDisabled();

    const timeSelect = screen.getByLabelText(/select time/i);
    fireEvent.change(timeSelect, { target: { value: "10:30 AM" } });
    expect(submitButton).toBeDisabled();

    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "5" } });
    expect(submitButton).toBeDisabled();

    const occasionSelect = screen.getByLabelText(/occasion/i);
    fireEvent.change(occasionSelect, { target: { value: "birthday" } });
    expect(submitButton).toBeDisabled();

    const indoorRadio = screen.getByLabelText(/indoor/i);

    fireEvent.click(indoorRadio);
    expect(submitButton).not.toBeDisabled();

    const outdoorRadio = screen.getByLabelText(/outdoor/i);

    fireEvent.click(outdoorRadio)
    expect(submitButton).not.toBeDisabled();

  });
  test("Invalidation check on all inputs(INCORRECT inputs)", ()=>{
    const props= {availableTimes:timeOptions, updateTimes:jest.fn()}
    renderComponent("reserve", props);

    const submitButton = screen.getByRole('button', { name: /select table/i });
    expect(submitButton).toBeDisabled();
    const form = screen.getByRole("form", { name: /table/i });
    expect(form).toBeInvalid()
    // Date inputs
    const dateInput = screen.getByLabelText(/select date/i);
    expect(dateInput).toBeInvalid()
    fireEvent.change(dateInput, { target: { value: "2025-13-04" } });
    expect(dateInput).toBeInvalid()
    fireEvent.change(dateInput, { target: { value: "2025-01-44" } });
    expect(dateInput).toBeInvalid()
    //Time inputs
    const timeSelect = screen.getByLabelText(/select time/i);
    expect(timeSelect).toBeInvalid()//*Default Select values should be invalid(no selection)
    fireEvent.change(timeSelect, { target: { value: "10:00 PM" } });
    expect(timeSelect).toBeInvalid()
    fireEvent.change(timeSelect, { target: { value: "8:00 AM" } });
    expect(timeSelect).toBeInvalid()
    fireEvent.change(timeSelect, { target: { value: "5:15 PM" } });
    expect(timeSelect).toBeInvalid()
    // guests
    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "0" } });
    expect(guestsInput).toBeInvalid()
    fireEvent.change(guestsInput, { target: { value: "21" } });
    expect(guestsInput).toBeInvalid()
    fireEvent.change(guestsInput, { target: { value: "-1" } });
    expect(guestsInput).toBeInvalid()
    fireEvent.change(guestsInput, { target: { value: "String" } });
    expect(guestsInput).toBeInvalid()

    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toBeInvalid()

    const indoorRadio = screen.getByLabelText(/indoor/i);
    const outdoorRadio = screen.getByLabelText(/outdoor/i);
    expect(indoorRadio).not.toBeChecked()
    expect(outdoorRadio).not.toBeChecked()

    expect(submitButton).toBeDisabled();
    expect(form).toBeInvalid()
  })
   test("Validation check on all inputs(CORRECT inputs)", ()=>{
    const props= {availableTimes:timeOptions, updateTimes:jest.fn()}
    renderComponent("reserve", props);

    const submitButton = screen.getByRole('button', { name: /select table/i });
    expect(submitButton).toBeDisabled();
    const form = screen.getByRole("form", { name: /table/i });
    expect(form).toBeInvalid()

    // Date inputs
    const dateInput = screen.getByLabelText(/select date/i);
    expect(dateInput).toBeInvalid()
    fireEvent.change(dateInput, { target: { value: "2025-12-04" } });
    expect(dateInput).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()
  
    //Time inputs
    const timeSelect = screen.getByLabelText(/select time/i);
    expect(timeSelect).toBeInvalid()//*Default Select values should be invalid(no selection)
    fireEvent.change(timeSelect, { target: { value: "8:00 PM" } });
    expect(timeSelect).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()
    fireEvent.change(timeSelect, { target: { value: "9:00 AM" } });
    expect(timeSelect).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()
    fireEvent.change(timeSelect, { target: { value: "10:30 AM" } });
    expect(timeSelect).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()
    // guests
    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "1" } });
    expect(timeSelect).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()
    fireEvent.change(guestsInput, { target: { value: "5" } });
    expect(timeSelect).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()
    fireEvent.change(guestsInput, { target: { value: "10" } });
    expect(timeSelect).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()

    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toBeInvalid()
    fireEvent.change(occasionSelect, {target:{value:"birthday"}})
    expect(occasionSelect).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()
    fireEvent.change(occasionSelect, {target:{value:"anniversary"}})
    expect(occasionSelect).toBeValid();expect(submitButton).toBeDisabled();expect(form).toBeInvalid()
    
    const indoorRadio = screen.getByLabelText(/indoor/i);
    const outdoorRadio = screen.getByLabelText(/outdoor/i);
    fireEvent.click(indoorRadio)
    expect(indoorRadio).toBeChecked();
    expect(outdoorRadio).not.toBeChecked();
    fireEvent.click(outdoorRadio)
    expect(outdoorRadio).toBeChecked();
    expect(indoorRadio).not.toBeChecked();

    expect(submitButton).not.toBeDisabled();expect(form).toBeValid()
  })
});
describe ("Customer Details Form,", ()=>{
  test("All form elements are present", ()=>{
    renderComponent("reserve/customerdetails",{})

    const firstNameInput = screen.getByLabelText(/First Name/i)
    expect(firstNameInput).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/special requests or additional notes/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue to payment/i })).toBeInTheDocument();


  })
  test("Input Interaction for all fields",()=>{
    renderComponent("reserve/customerdetails",{})

   // First Name
  const firstNameInput = screen.getByLabelText(/First Name/i);
  expect(firstNameInput).toBeInTheDocument();
  fireEvent.change(firstNameInput, { target: { value: "George" } });
  expect(firstNameInput.value).toBe("George");

  // Last Name
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  expect(lastNameInput).toBeInTheDocument();
  fireEvent.change(lastNameInput, { target: { value: "Washington" } });
  expect(lastNameInput.value).toBe("Washington");

  // Email
  const emailInput = screen.getByLabelText(/Email/i);
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "firstPresident@whitehouse.com" } });
  expect(emailInput.value).toBe("firstPresident@whitehouse.com");

  // Phone
  const phoneInput = screen.getByLabelText(/Phone Number/i);
  expect(phoneInput).toBeInTheDocument();
  fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
  expect(phoneInput.value).toBe("123-456-7890");

  // Special Requests (textarea)
  const requestsInput = screen.getByLabelText(/special requests or additional notes/i);
  expect(requestsInput).toBeInTheDocument();
  fireEvent.change(requestsInput, { target: { value: "Ensure a side of the Declaration of Independence is Provided" } });
  expect(requestsInput.value).toBe("Ensure a side of the Declaration of Independence is Provided");

  // Buttons
  expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /continue to payment/i })).toBeInTheDocument();

  })
  test("Validity/Invalidity", () => {
  renderComponent("reserve/customerdetails", {});

  // Grab all inputs
  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const phoneInput = screen.getByLabelText(/Phone Number/i);
  const requestsInput = screen.getByLabelText(/special requests or additional notes/i);
  const submitButton = screen.getByRole("button", { name: /continue to payment/i });
  const form = document.querySelector('.customer-details-form')

  expect(firstNameInput).toBeInvalid();
  expect(lastNameInput).toBeInvalid();
  expect(emailInput).toBeInvalid();
  expect(phoneInput).toBeInvalid();

  // Optional textarea is always valid (not required)
  expect(requestsInput).toBeValid();

  // Enter invalid email and phone
  fireEvent.change(emailInput, { target: { value: "invalidemail" } });
  expect(emailInput).toBeInvalid();

  fireEvent.change(phoneInput, { target: { value: "12345" } });
  expect(phoneInput).toBeInvalid();

  // Fill required fields with valid data to check validity updates
  fireEvent.change(firstNameInput, { target: { value: "George" } });
  fireEvent.change(lastNameInput, { target: { value: "Washington" } });
  fireEvent.change(emailInput, { target: { value: "george@example.com" } });
  fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });

  expect(firstNameInput).toBeValid();
  expect(lastNameInput).toBeValid();
  expect(emailInput).toBeValid();
  expect(phoneInput).toBeValid();

  expect(form.checkValidity()).toBe(true);

  expect(submitButton).not.toBeDisabled();
});
})
describe("Payment Form", () =>{
  const props = {
    updatePayment: jest.fn(),
    updateDetails: jest.fn(),
    updateTable: jest.fn()}
  test("All Form elements are present", ()=>{
    renderComponent("reserve/payment", props)
    const form = screen.getByRole("form", {name:/payment details/i})
    expect(form).toBeInTheDocument()
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    // Name on Card
    expect(screen.getByLabelText(/name on card/i)).toBeInTheDocument();
    // Exp. Date
    expect(screen.getByLabelText(/exp\. date/i)).toBeInTheDocument();
    // CVV
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    // Confirmation radio buttons
    expect(screen.getByLabelText(/send me a confirmation via email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/send me a confirmation via text/i)).toBeInTheDocument();
    // Submit button
    expect(screen.getByRole("button", { name: /make reservation/i })).toBeInTheDocument();
  })
  test("Test for input Interaction", ()=>{
    renderComponent("reserve/payment", props)
    const cardNumberInput = screen.getByLabelText(/card number/i);
    const cardNameInput = screen.getByLabelText(/name on card/i);
    const expiryDateInput = screen.getByLabelText(/exp\. date/i);
    const cvvInput = screen.getByLabelText(/cvv/i);
    const emailRadio = screen.getByLabelText(/confirmation via email/i);
    const submitButton = screen.getByRole("button", { name: /make reservation/i });

    fireEvent.change(cardNumberInput, { target: { value: "1234-5678-9012-3456" } });
    fireEvent.change(cardNameInput, { target: { value: "John Doe" } });
    fireEvent.change(expiryDateInput, { target: { value: "12/30" } });
    fireEvent.change(cvvInput, { target: { value: "123" } });
    fireEvent.click(emailRadio);

    expect(cardNumberInput.value).toBe("1234-5678-9012-3456");
    expect(cardNameInput.value).toBe("John Doe");
    expect(expiryDateInput.value).toBe("12/30");
    expect(cvvInput.value).toBe("123");
    expect(emailRadio.checked).toBe(true);

    expect(submitButton).toBeEnabled();
  })
  test("Test for Validation", ()=>{
     renderComponent("reserve/payment", props)
    const form = screen.getByRole("form", {name:/payment details/i})
    const submitButton = screen.getByRole("button", { name: /make reservation/i });
    expect(form).toBeInvalid(); expect(submitButton).toBeDisabled()
    const cardNumberInput = screen.getByLabelText(/card number/i);
    const cardNameInput = screen.getByLabelText(/name on card/i);
    const expiryDateInput = screen.getByLabelText(/exp\. date/i);
    const cvvInput = screen.getByLabelText(/cvv/i);
    const emailRadio = screen.getByLabelText(/confirmation via email/i);

    fireEvent.change(cardNumberInput, { target: { value: "1234-5678-9012-3456" } });
    fireEvent.change(cardNameInput, { target: { value: "John Doe" } });
    fireEvent.change(expiryDateInput, { target: { value: "12/30" } });
    fireEvent.change(cvvInput, { target: { value: "123" } });
    fireEvent.click(emailRadio); 

    expect(cardNumberInput).toBeValid();
    expect(cardNameInput).toBeValid();
    expect(expiryDateInput).toBeValid();
    expect(cvvInput).toBeValid();

    expect(submitButton).toBeEnabled(); expect(form).toBeValid()
  })
})