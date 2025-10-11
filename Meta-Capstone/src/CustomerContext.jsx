import React, { createContext, useState } from 'react';

export const CustomerContext = createContext();
export function CustomerProvider({ children }) {
  const [customerDetails, setCustomerDetails] = useState({
    table: {
      date: '',
      time: '',
      guests: 1,
      occasion: '',
      seatingPreference: '',
    },
    details: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      requests: '',
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      confirmationPreference: '',
    },
  });

function updateTable(newTableData) {
  setCustomerDetails(prev => ({
    ...prev,
    table: {
      ...prev.table,
      ...newTableData,
    }
  }));
}

  const updateDetails = (newDetailsData) => {
    setCustomerDetails(prev => ({
      ...prev,
      details: {
        ...prev.details,
        ...newDetailsData,
      }
    }));
  };

  const updatePayment = (newPaymentData) => {
    setCustomerDetails(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        ...newPaymentData,
      }
    }));
  };
  const value = {
    customerDetails,
    updateTable,
    updateDetails,
    updatePayment,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}
