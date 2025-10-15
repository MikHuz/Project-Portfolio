# 🚪 Garage Door Customizer App

## 🧭 Overview  

The **Garage Door Customizer** is a **fully responsive, single-page React web app** designed to let users **browse, customize, and request quotes for garage doors** — all in one smooth, dynamic interface.  

The workflow is structured around a guided experience:  
1. **Category Carousel:** Explore garage door categories through an interactive, swipeable carousel.  
2. **Model Selection:** View and compare doors within each category, using dynamic carousels that update as new data is parsed.  
3. **Dynamic Build Section:** Configure a door’s attributes — style, size, windows, finish, and more — with each selection filtering the next available options and updating pricing in real time.  

The app operates without a traditional backend. Instead, it loads a **CSV dataset** containing all valid combinations of door options, which are dynamically parsed and transformed into React state on the fly.  

Users can even **drag and drop a new CSV file**, instantly reloading the app’s dataset to reflect different pricing or availability scenarios — no code changes required.  

Selections are **persistent** via local storage and **shareable** through **URL parameters** — meaning users can directly open or share preconfigured builds or be given their desired doors already created for them. 

> **Note:** This project was developed as a volunteer contribution for **Reliable Garage Door** and demonstrates scalable, dynamic frontend engineering which reflects real world needs. 

---

## 🌟 Features  

- 💾 **CSV-Driven Dynamic Data:**  
  Drop in a CSV file, and the app instantly parses it into usable configuration data. Door options, dependencies, and prices are all dynamically updated — enabling flexible, data-driven behavior.  

- 🔗 **URL-Parameterized Builds:**  
  Combination of door options can be partially or fully preselected via the URL. These links can be shared or bookmarked to reopen a specific configuration instantly.  

- 🔄 **Interactive Guided Workflow:**  
  A clear step-by-step UI takes users from general categories to detailed configurations without losing context or state.  

- 🧩 **Dynamic Option Dependencies:**  
  Each selection filters subsequent available choices in real time, ensuring only valid combinations are selectable.  

- 🏷️ **Responsive and Adaptive Layout:**  
  Automatically scales images and layout elements for different viewport sizes, from mobile to desktop.  

- 🧠 **Persistent State and Smooth Transitions:**  
  User progress is saved locally, so returning to the page restores selections. React Router and controlled state minimize re-renders and ensure smooth page transitions.  

- 📈 **API Calls:**  
  Backend interactions are simulated with dynamic fetch behavior, providing a realistic data flow without an actual server.  

---

## 🛠️ Technical Highlights  

- ⚙️ **CSV Parsing and Data Normalization:**  
  On startup or CSV upload, the app parses structured data to generate configuration trees. This eliminates hardcoding and allows rapid updates.  

- 🌐 **URL-Based Preselection System:**  
  URL parameters are dynamically mapped to internal React state, enabling quick restoration of complex configurations.  

- 🧮 **Real-Time Pricing Engine:**  
  The app computes pricing dynamically based on the selected combination of attributes — pulling directly from parsed CSV values.  

- 🧱 **Componentized Architecture:**  
  Each step (Category, Model, Build) is an isolated React component communicating through controlled props and context, keeping state predictable and performance optimized.  

- 🖼️ **Viewport-Aware Image Loading:**  
  Uses dynamic imports to load only the necessary image variants (webp/jpg) for the user’s device size, reducing bandwidth and improving load times.  

- 💡 **Error-Resilient State Handling:**  
  Includes graceful fallbacks for incomplete URL states or missing data, ensuring the app doesn't break under partial configurations.  
---

## 🧰 Technologies Used  

| Technology | Purpose |
|-------------|----------|
| **React** | Component-based UI and state management |
| **React Router** | SPA navigation and URL preselection logic |
| **JavaScript (ES6)** | Core logic for CSV parsing, dynamic rendering, and data binding |
| **HTML / CSS** | Responsive design and custom layout styling |
| **Local Storage** | Persistence of user selections |
| **Dynamic Imports** | On-demand image and data loading for performance |
| **Fetch API** | Simulated backend data retrieval |

---

### 🎬 Full Demo Video  
A detailed walkthrough is included in the repository:  
`Garage-door-demo.mp4`  

> **Note:** The video may show minor lag due to recording software — the live app runs significantly smoother. Some features in door options were omitted in the demo and the repo for brevity.  
