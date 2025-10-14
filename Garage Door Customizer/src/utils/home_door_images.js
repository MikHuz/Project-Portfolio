const traditionalDoors = import.meta.glob(
  "/src/assets/home_imgs/traditional/door*.webp",
  { eager: true }
);

const contemporaryDoors = import.meta.glob(
  "/src/assets/home_imgs/contemporary/door*.webp",
  { eager: true }
);
const carriageDoors = import.meta.glob(
  "/src/assets/home_imgs/carriage/door*.webp",
  { eager: true }
);
export function getHomeImages(type) {
  let modules;

  if (type === "traditional") {
    modules = traditionalDoors;
  } else if (type === "contemporary") {
    modules = contemporaryDoors;
  } else if(type === "carriage"){
    modules = carriageDoors
  }
  else {
    modules = {};
  }
  return Object.values(modules).map((mod) => mod.default || mod);
}