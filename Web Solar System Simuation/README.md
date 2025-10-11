# Web Solar System

## Overview

This project is an interactive 3D simulation of the solar system, built using **JavaScript** and **GLSL shaders**. Users can explore the system with mouse controls (zoom and click) and **WASD keys** for movement. Each planet orbits at unique speeds and angles while rotating on its own axis, providing a realistic simulation of celestial mechanics.  

The Sun is rendered with **Phong lighting shaders**, creating realistic illumination and surface reflections. The Earth includes a moon and a **dynamic day-night cycle**, further enhancing the visual realism. Rendering is performed using **rasterization**, not ray tracing.

---

## Features / Highlights

- Interactive 3D navigation with mouse and keyboard  
- Unique orbital paths and rotational speeds for each planet  
- Earth-Moon system with dynamic day-night cycle  
- Realistic lighting using **Phong shaders**  
- Uses **rasterization** for efficient rendering over **raytracing**
- All planetary motion powered by **JavaScript matrix and vector math**  
- Modular design, allowing easy addition of more celestial bodies  

---

## Technologies Used

- **JavaScript** – Core logic for orbital mechanics and simulation  
- **GLSL Shaders** – Phong lighting and surface rendering  
- **HTML / CSS / Canvas API** – Rendering context for WebGL  
- **Matrix and Vector Math** – Transformations for rotations, orbits, and positioning  

---
Note: For best experience, view the project on a screen with 1980x1080 resolution. Smaller screens may not display the simulation correctly.
