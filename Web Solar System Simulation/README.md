# 🌌 Web Solar System Simulation

## Overview

This project is an interactive **3D simulation of the solar system**, built using **JavaScript**, **WebGL**, and **GLSL shaders**.  
Users can explore the system with mouse controls (zoom and click) and **WASD keys** for movement.  

Each planet orbits at unique speeds and angles while rotating on its own axis, providing a realistic simulation of celestial mechanics.  

The **Sun** is rendered with **Phong lighting shaders**, creating realistic illumination and surface reflections.  
The **Earth** includes a moon and a **dynamic day-night cycle**, further enhancing the visual realism.  

Rendering is performed using **rasterization** rather than ray tracing for efficient real-time performance.

---

## 🛰️ Features / Highlights

- Interactive 3D navigation with mouse and keyboard  
- Unique orbital paths and rotational speeds for each planet  
- Earth-Moon system with dynamic day-night cycle  
- Realistic lighting using **Phong shaders**  
- Rendering powered by **WebGL rasterization**  
- All planetary motion driven by **JavaScript matrix and vector math**  
- Modular design — easily extendable with new celestial bodies  

---

## 🧠 Technologies Used

- **JavaScript** – Core logic for orbital mechanics and simulation  
- **WebGL** – Low-level graphics API for rendering 3D objects  
- **GLSL Shaders** – Phong lighting and surface rendering  
- **HTML / CSS / Canvas API** – Rendering context and layout  
- **Matrix & Vector Math** – Transformations for rotations, orbits, and positioning  

---

## 🎬 Demo

### 🌍 System in Orbit
![System in Orbit](./System%20Orbit%20in%20Action.gif)

### 🕹️ Solar System Overview
![Solar System Overview](./Controls%20in%20Action.gif)

### 📹 Full Simulation Video
A longer walkthrough of the **solar system simulation** is available in the repository:  
  `Solar System Demo.mp4`

---

## ⚙️ Notes

> For the best experience, run the project on a screen with **1920×1080 resolution**.  
> Smaller screens may not display the simulation correctly due canvas dimensions.
