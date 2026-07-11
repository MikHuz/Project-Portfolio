# 🚪 Garage Door Customizer App

## 🧭 Overview  

The **Garage Door Customizer** is a **user-focused, responsive web app** designed to help customers **easily explore, configure, and request quotes for garage doors**. Built directly from **real customer feedback and business requirements**, the app streamlines the purchasing process and removes friction from traditional quote requests.  

The workflow is tailored to make the user experience simple and intuitive:  
1. **Browse Categories:** Customers can explore garage door styles and types through an interactive carousel, making discovery easy and visual.  
2. **Compare Models:** Users can see and compare options within each category, ensuring informed choices without endless back-and-forth.  
3. **Configure Your Door:** A guided, dynamic configuration tool lets users select size, style, finish, windows, and other features — updating pricing instantly and only showing valid options.  

By letting customers **self-configure doors and instantly receive accurate quotes**, the app reduces manual workload for the business, speeds up response time, and increases the likelihood of conversion from interest to purchase.

---

## 🌟 User & Business Impact  

- 💡 **Built from Real Customer Needs:**  
  Each feature was designed to address specific pain points expressed by actual clients — from confusing options to slow quote delivery. This meant the business could address what their customers wanted most, maximizing their experience and boosting

- ⏱️ **Faster, Frictionless Quotes:**  
  Users can complete their configuration in minutes, generating actionable quote requests automatically, freeing up staff time for higher-value tasks and boosting user engagement (also contributed to google site domain engagement staistics for site SEO) 

- 📲 **Shareable & Persistent Configurations:**  
  Customers can save and share their configurations via a simple link, improving collaboration between homeowners, contractors, and the business team. This feature was embedded within the companies main site, allowing users to browse real photos and instantly see its configuration and price and make a request.

  - 📈 **Data-Driven Flexibility:**  
  Staff can upload new datasets to immediately reflect updated products, prices, or availability — empowering the business to adapt quickly without development delays.

- 🧩 **Error-Free Selections:**  
  Dynamic option dependencies prevent invalid configurations, ensuring quotes are always accurate to the unique configuration and reducing errors in order processing.  

- 🌐 **Accessible Anywhere:**  
  Fully responsive design ensures users on phones, tablets, or desktops have the same seamless experience, expanding reach and accessibility. Mobile design first was the approach in order to best address customer needs.

- 🖼️ **Viewport-Aware Image Loading:**  
  Uses dynamic imports to load only the necessary image variants (webp/jpg) for the user’s device size, reducing bandwidth and improving load times.  

  🧱 **Componentized Architecture:**  
  Each step (Category, Model, Build) is an isolated React component communicating through controlled props and context, taking advantage of React's state and component based architecture, leading to predictability and optimized performance. 

---

## 🛠️ How It Works  

While technical underpinnings exist, the real value comes from how the app **supports decision-making and improves operations**:  

- Users follow a **guided workflow** that takes them from browsing to final configuration without confusion.  
- **Real-time pricing and validation** make the process accurate and trustworthy.  
- **Database-driven data** enables staff to update offerings without touching code, keeping information current and reliable.  

---

## 🧰 Technologies  

| Technology | Business/User Benefit |
|------------|---------------------|
| **React & React Router** | Smooth, interactive user experience with persistent, shareable state |
| **Dynamic Data Handling (CSV)** | Quick updates to products and pricing without developer intervention |
| **Responsive HTML/CSS** | Access from any device, ensuring consistent customer experience |
| **Local Storage & URL Parameters** | Save and share configurations easily, improving collaboration and repeat visits |

---

### 🎬 Demo  
A short walkthrough video demonstrates the guided experience and dynamic configuration:  
`Garage-door-demo.mp4`  

> **NOTE:** This video and repo files does not fully reflect the updated production app state, it is meant to provide the snapshot of what was built, this repo is not the one used for production development. Live app performance is also smoother than the recorder software allowed; some app extended options were omitted for brevity.
