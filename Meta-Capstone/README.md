# Restaurant Reservation Project

## Overview

This is a multi-page React project simulating a restaurant reservation workflow, built as part of a course assignment. The app includes the following pages:

- **Reserve a Table:** Select date, time, guests, and preferences  
- **Customer Details:** Collect user contact information  
- **Payment:** Capture payment information securely (simulated)  
- **Confirmation:** Show reservation confirmation and summary  

> **Note:** This project is for learning and demonstration purposes only and is **not intended for production use**.

---

## Features

- Multi-step form navigation across pages  
- Basic client-side validation with accessible error messaging  
- State management to preserve data between steps  
- Simulated submission process and confirmation display
- Unit test coverage using Jest
- Accessibility best practices including labels, ARIA attributes, and live regions  

---

## Technical Highlights

### Built with Vite

This project uses [Vite](https://vitejs.dev/) for fast development and optimized builds. Vite provides a modern, lightning-fast development experience with hot module replacement.

### React Context for State Management

The project uses **React Context** to manage and share state across multiple pages in the reservation flow. This allows form data to persist as users navigate between steps without relying on external state management libraries.

### API Call Simulation

While this project does not connect to a real backend, it simulates API calls for submitting reservation data. This demonstrates handling asynchronous operations and how you might integrate with a server in a full application.

### Jest Test Coverage

Unit tests are implemented using **Jest** to validate critical functionality such as form validation, state updates, and component rendering. Test coverage helps ensure that changes do not break existing features and supports maintainable code quality.

---

## Installation

1. Clone the repo

   git clone https://github.com/MikHuz/Meta-Capstone.git

3. cd into the project directory
   
   Open a terminal and type "cd *directory path*"

4. Install dependencies from the terminal

   Type "npm install"

5. Run the project

   Type in "npm run dev". Open your browser to http://localhost:5173 (default Vite port) to explore the app.
