// Traditional
const traditionalDoors = {
  ...import.meta.glob("/src/assets/home_imgs/traditional/*.webp", { eager: true }),
  ...import.meta.glob("/src/assets/home_imgs/traditional/*.jpg", { eager: true }),
};

// Contemporary
const contemporaryDoors = {
  ...import.meta.glob("/src/assets/home_imgs/contemporary/*.webp", { eager: true }),
  ...import.meta.glob("/src/assets/home_imgs/contemporary/*.jpg", { eager: true }),
};

// Carriage
const carriageDoors = {
  ...import.meta.glob("/src/assets/home_imgs/carriage/*.webp", { eager: true }),
  ...import.meta.glob("/src/assets/home_imgs/carriage/*.jpg", { eager: true }),
};

// Getter function
export function getHomeImages(type) {
  let modules;

  if (type === "traditional") {
    modules = traditionalDoors;
  } else if (type === "contemporary") {
    modules = contemporaryDoors;
  } else if (type === "carriage") {
    modules = carriageDoors;
  } else {
  }

  // Return an array of image URLs
  return Object.values(modules).map((mod) => mod.default || mod);
}