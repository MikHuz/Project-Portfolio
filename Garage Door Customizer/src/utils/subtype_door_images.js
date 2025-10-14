// Import all images for subtypes
/// Traditional
const traditionalImages = {
  desktop: {
    "Raised Panel": import.meta.glob("/src/assets/door_imgs/carousel/traditional/Desktop/1 - Raised Panel/*.jpg"),
    "Stamped Carriage House": import.meta.glob("/src/assets/door_imgs/carousel/traditional/Desktop/2 - Stamped Carriage House/*.jpg"),
    "Stamped Shaker": import.meta.glob("/src/assets/door_imgs/carousel/traditional/Desktop/3 - Stamped Shaker/*.jpg"),
    "Recessed Panel": import.meta.glob("/src/assets/door_imgs/carousel/traditional/Desktop/4 - Recessed Panel/*.jpg"),
  },
  mobile: {
    "Raised Panel": import.meta.glob("/src/assets/door_imgs/carousel/traditional/Mobile/1 - Raised Panel/*.jpg"),
    "Stamped Carriage House": import.meta.glob("/src/assets/door_imgs/carousel/traditional/Mobile/2 - Stamped Carriage House/*.jpg"),
    "Stamped Shaker": import.meta.glob("/src/assets/door_imgs/carousel/traditional/Mobile/3 - Stamped Shaker/*.jpg"),
    "Recessed Panel": import.meta.glob("/src/assets/door_imgs/carousel/traditional/Mobile/4 - Recessed Panel/*.jpg"),
  },
};

// Contemporary
const contemporaryImages = {
  desktop: {
    "Planks": import.meta.glob("/src/assets/door_imgs/carousel/contemporary/Desktop/1 - Planks/*.jpg"),
    "Skyline Flush": import.meta.glob("/src/assets/door_imgs/carousel/contemporary/Desktop/2 - Skyline Flush/*.jpg"),
    "Aluminum": import.meta.glob("/src/assets/door_imgs/carousel/contemporary/Desktop/3 - Full-view/*.jpg"),
    "Sterling": import.meta.glob("/src/assets/door_imgs/carousel/contemporary/Desktop/4 - Sterling/*.jpg"),
  },
  mobile: {
    "Planks": import.meta.glob("/src/assets/door_imgs/carousel/contemporary/Mobile/1 - Planks/*.jpg"),
    "Skyline Flush": import.meta.glob("/src/assets/door_imgs/carousel/contemporary/Mobile/2 - Skyline Flush/*.jpg"),
    "Aluminum": import.meta.glob("/src/assets/door_imgs/carousel/contemporary/Mobile/3 - Full-view/*.jpg"),
    "Sterling": import.meta.glob("/src/assets/door_imgs/carousel/contemporary/Mobile/4 - Sterling/*.jpg"),
  },
};

// Carriage
const carriageImages = {
  desktop: {
    "Steel Overlay": import.meta.glob("/src/assets/door_imgs/carousel/carriage/Desktop/1 - Steel Overlay Carriage House/*.jpg"),
    "Fiber Glass Overlay": import.meta.glob("/src/assets/door_imgs/carousel/carriage/Desktop/2 - Fiberglass Overlay Carriage House/*.jpg"),
    "Shoreline": import.meta.glob("/src/assets/door_imgs/carousel/carriage/Desktop/3 - Shoreline/*.jpg"),
    "Wood Overlay": import.meta.glob("/src/assets/door_imgs/carousel/carriage/Desktop/4 - Wood Overlay Carriage House/*.jpg"),
  },
  mobile: {
    "Steel Overlay": import.meta.glob("/src/assets/door_imgs/carousel/carriage/Mobile/1 - Steel Overlay Carriage House/*.jpg"),
    "Fiber Glass Overlay": import.meta.glob("/src/assets/door_imgs/carousel/carriage/Mobile/2 - Fiberglass Overlay Carriage House/*.jpg"),
    "Shoreline": import.meta.glob("/src/assets/door_imgs/carousel/carriage/Mobile/3 - Shoreline/*.jpg"),
    "Wood Overlay": import.meta.glob("/src/assets/door_imgs/carousel/carriage/Mobile/4 - Wood Overlay Carriage House/*.jpg"),
  },
};

// Function to return object of subtype -> array of URLs
export async function getSubTypeImages(type="traditional", viewport="desktop") {
//console.log("inside subtype glob")
  let source;
  if (type === "traditional") source = traditionalImages;
  else if (type === "contemporary") source = contemporaryImages;
  else if (type === "carriage") source = carriageImages;
  else return {};

  const modules = {};

  const subtypes = Object.keys(source[viewport]);
  //console.log("SUBTYPES:", subtypes)
  for (const subtype of subtypes) {
    //console.log("SUBTYPE:", subtype)
    const globImport = source[viewport][subtype];
    const imported = await Promise.all(
      Object.values(globImport).map(fn => fn())
    );
    //console.log("IMPORTED:",imported)
    modules[subtype] = imported.map(mod => mod.default || mod);
  }

  return modules;
}