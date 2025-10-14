# 🚪 Garage Door Customizer Web App

## 🧭 Overview

The **Garage Door Customizer** is a **responsive, single-page React web application** that enables users to browse, customize, and request quotes for garage doors.  

The app guides users through a structured workflow:  
1. **Category Carousel:** Browse door categories via an interactive image carousel.  
2. **Door Type Selection:** Explore specific door models within each category using dynamic carousels.  
3. **Dynamic Build Section:** Configure a selected door with options that dynamically update based on prior selections, reflecting accurate pricing and available features.  

The app leverages **React state management**, **routing**, and **dynamic API calls** to handle all possible door option combinations efficiently. Images are dynamically loaded and scaled based on viewport dimensions for optimal performance.  

Rather than relying on a backend database, the app uses a **CSV dataset** containing all door combinations and prices. This enables:  
- Dynamic availability of options depending on prior selections  
- Real-time pricing calculations  
- URL-based preselection for shareable configurations  

Local storage ensures user selections persist across sessions, and URL parameters allow users to share or return to specific door configurations.

> **Note:** This project was developed as a volunteer contribution for **Reliable Garage Door** and demonstrates scalable, dynamic frontend engineering.

---

## 🌟 Features

- 💾 **Data-Driven Design:** Door and price combinations dynamically loaded and reflected in the app.  
- 🌐 **Responsive Layout:** Adjusts seamlessly to viewport size changes.  
- 🏷️ **Interactive Carousels:** Smooth navigation for door categories and specific models.  
- 🔄 **Dynamic Build Section:** Options unlock based on prior selections, with real-time pricing updates.  
- ⚡ **Optimized State Management:** Efficient React state and routing to minimize unnecessary re-renders.  
- 🔗 **Shareable URLs:** Preconfigured builds can be shared or bookmarked.  
- 🛠️ **Local Storage Persistence:** Retains user selections across page reloads.  
- 📈 **Dynamic API Call Simulation:** Simulates backend interactions for each unique configuration.

---

## 🛠️ Technical Highlights

- **CSV-Driven Configuration:** Parses a CSV dataset to control option availability, pricing, and build logic.  
- **Dynamic Option Dependency:** Certain selections unlock or restrict features in real-time.  
- **Viewport-Based Image Delivery:** Dynamically loads images at optimal resolutions based on screen size to reduce load time.  
- **URL Parameter Handling:** Enables preselection and sharing of specific door builds.  
- **React Optimizations:** Efficient state updates and component rendering to support a smooth SPA experience.  

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React** | Component-based frontend UI library |
| **React Router** | SPA routing for seamless navigation |
| **JavaScript** | Core logic, CSV parsing, and user interactions |
| **CSS / HTML** | Responsive layout and styling |
| **Fetch / Dynamic API Calls** | Simulates backend interactions for configurations |
| **Local Storage & URL Parameters** | Persist user selections and preselect shared configurations |

---

## 📹 Demo

### 🏠 Door Selection & Build Flow
![Category Carousel](./demo_images/category_carousel.gif)  
![Door Type Carousel](./demo_images/door_type_carousel.gif)  
![Dynamic Build Section](./demo_images/build_section.gif)  

### 🎬 Full Demo Video
A longer walkthrough of the **Garage Door Customizer** workflow is included in the repository:  
`Garage_Demo.mp4`  

---
