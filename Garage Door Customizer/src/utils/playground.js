const textCSV = `
Collection,ID,Name,Design,Build,Size,Model,Base Price,Solid Color,Woodtone,Glass,Plain,Obscure,Tinted,Frosted,Inserts,Madison,Stockton,StyleLite,D.Glass,Hardware
Traditional,1,Raised Panel,Short Panel,Non-insulated,Single,2250,"1,381.52",Yes,NA,Yes,246.1,299.64,NA,NA,110.94,NA,NA,NA,NA,NA
Traditional,2,Raised Panel,Short Panel,Non-insulated,Double,2250,"2,079",Yes,NA,Yes,492.26,599.26,NA,NA,221.84,NA,NA,NA,NA,NA
Traditional,3,Raised Panel,Short Panel,Insulated,Single,2283,"1,828.12",Yes,647.06,Yes,317.98,358.66,395.64,599.00,110.94,,,NA,NA,NA
Traditional,4,Raised Panel,Short Panel,Insulated,Double,2283,"2,865.44",Yes,"1,294.12",Yes,635.98,717.32,791.26,"1,198.00",221.84,,,NA,NA,NA
Traditional,5,Raised Panel,Long Panel,Non-insulated,Single,4250,"1,381.52",Yes,NA,Yes,246.1,299.64,NA,NA,110.94,NA,NA,NA,NA,NA
Traditional,6,Raised Panel,Long Panel,Non-insulated,Double,4250,"2,079",Yes,NA,Yes,492.26,599.26,NA,NA,221.84,NA,NA,NA,NA,NA
Traditional,7,Raised Panel,Long Panel,Insulated,Single,4283,"1,828.12",Yes,647.06,Yes,317.98,358.66,395.64,599.00,110.94,,,NA,NA,NA
Traditional,8,Raised Panel,Long Panel,Insulated,Double,4283,"2,865.44",Yes,"1,294.12",Yes,635.98,717.32,791.26,"1,198.00",221.84,,,NA,NA,NA
,,,,,,,,,,,,,,,,NA,NA,,,
Traditional,9,Stamped Carriage,Short Panel,Non-insulated,Single,5250,"1,468.92",Yes,NA,Yes,255.04,310.32,NA,NA,117.72,NA,NA,NA,NA,100
Traditional,10,Stamped Carriage,Short Panel,Non-insulated,Double,5250,"2,264.48",Yes,NA,Yes,510.08,620.66,NA,NA,235.42,NA,NA,NA,NA,100
Traditional,11,Stamped Carriage,Short Panel,Insulated,Single,5283,"1,955.68",Yes,647.06,Yes,353.12,399.34,454.8,602.7,122,NA,NA,NA,NA,100
Traditional,12,Stamped Carriage,Short Panel,Insulated,Double,5283,"3,068.80",Yes,"1,294.12",Yes,706.22,798.66,909.58,"1,205.38",244.04,NA,NA,NA,NA,100
Traditional,13,Stamped Carriage,Long Panel,Non-insulated,Single,5950,"1,468.92",Yes,NA,Yes,255.04,310.32,NA,NA,117.72,NA,NA,NA,NA,100
Traditional,14,Stamped Carriage,Long Panel,Non-insulated,Double,5950,"2,264.48",Yes,NA,Yes,510.08,620.66,NA,NA,235.42,NA,NA,NA,NA,100
Traditional,15,Stamped Carriage,Long Panel,Insulated,Single,5983,"1,955.68",Yes,647.06,Yes,353.12,399.34,454.8,602.7,122,NA,NA,NA,NA,100
Traditional,16,Stamped Carriage,Long Panel,Insulated,Double,5983,"3,068.80",Yes,"1,294.12",Yes,706.22,798.66,909.58,"1,205.38",244.04,NA,NA,NA,NA,100
,,,,,,,,,,,,,,,,NA,NA,,,
Traditional,17,Stamped Shaker,Shaker,Non-insulated,Single,2550,"1,381.52",Yes,NA,Yes,255.04,299.64,NA,NA,117.72,NA,NA,NA,NA,100
Traditional,18,Stamped Shaker,Shaker,Non-insulated,Double,2550,"2,079",Yes,NA,Yes,510.08,620.66,NA,NA,235.42,NA,NA,NA,NA,100
Traditional,19,Stamped Shaker,Shaker,Insulated,Single,2583,"1,828.12",Yes,647.06,Yes,353.12,399.34,454.8,602.7,122,NA,NA,NA,NA,100
Traditional,20,Stamped Shaker,Shaker,Insulated,Double,2583,"2,865.44",Yes,"1,294.12",Yes,706.22,798.66,909.58,"1,205.38",244.04,NA,NA,NA,NA,100
,,,,,,,,,,,,,,,,NA,NA,,,
Traditional,21,Recessed Panel,Short Panel,Insulated,Single,2298,3573.98,Yes,NA,Yes,200,250,350,400,100,NA,NA,NA,NA,NA
Traditional,22,Recessed Panel,Short Panel,Insulated,Double,2298,4473.98,Yes,NA,Yes,400,500,700,800,200,NA,NA,NA,NA,NA
Traditional,23,Recessed Panel,Long Panel,Insulated,Single,2294,3236.84,Yes,NA,Yes,250,300,350,400,100,NA,NA,NA,NA,NA
Traditional,24,Recessed Panel,Long Panel,Insulated,Double,2248,4136.84,Yes,NA,Yes,500,600,700,800,200,NA,NA,NA,NA,NA
Traditional,25,Recessed Panel,Flush,Insulated,Single,2291,2299,Yes,NA,Yes,200,250,350,400,100,NA,NA,NA,NA,NA
Traditional,26,Recessed Panel,Flush,Insulated,Double,2291,2002,Yes,NA,Yes,400,500,700,800,200,NA,NA,NA,NA,NA
,,,,,,,,,,,,,,,,NA,NA,,,
Contemporary,27,Planks,Short Windows,Insulated,Single,2327,"1,828.12",Yes,647.06,Yes,317.98,358.66,395.64,599.00,110.94,NA,NA,NA,NA,NA
Contemporary,,Planks,Short Windows,Insulated,Double,2327,"2,865.44",Yes,"1,294.12",Yes,635.98,717.32,791.26,"1,198.00",221.84,NA,NA,NA,NA,NA
Contemporary,,Planks,Long Windows,Insulated,Single,2347,"1,828.12",Yes,647.06,Yes,317.98,358.66,395.64,599.00,110.94,NA,NA,NA,NA,NA
Contemporary,,Planks,Long Windows,Insulated,Double,2347,"2,865.44",Yes,"1,294.12",Yes,635.98,717.32,791.26,"1,198.00",221.84,NA,NA,NA,NA,NA
Contemporary,,Planks,Narrow,Insulated,Single,2347,1828.12,Yes,647.06,Yes,317.98,358.66,395.64,599.00,NA,NA,NA,44.36,NA,NA
Contemporary,,Planks,Narrow,Insulated,Double,2347,2865.44,Yes,1294.12,Yes,635.98,717.32,791.26,"1,198.00",NA,NA,NA,88.72,NA,NA
,,,,,,,,,,,,,,,,NA,NA,,,
Contemporary,,Skyline Flush,Short Windows,Non-insulated,Single,2150,"1,381.52",Yes,NA,Yes,246.1,299.64,NA,NA,110.94,NA,NA,NA,NA,NA
Contemporary,,Skyline Flush,Short Windows,Non-insulated,Double,2150,"2,079",Yes,NA,Yes,492.26,599.26,NA,NA,221.84,NA,NA,NA,NA,NA
Contemporary,,Skyline Flush,Short Windows,Insulated,Single,2127,"1,828.12",Yes,647.06,Yes,317.98,358.66,395.64,599.00,110.94,NA,NA,NA,NA,NA
Contemporary,,Skyline Flush,Short Windows,Insulated,Double,2127,"2,865.44",Yes,"1,294.12",Yes,635.98,717.32,791.26,"1,198.00",221.84,NA,NA,NA,NA,NA
Contemporary,,Skyline Flush,Long Windows,Non-insulated,Single,4150,"1,381.52",Yes,NA,Yes,246.1,299.64,NA,NA,110.94,NA,NA,NA,NA,NA
Contemporary,,Skyline Flush,Long Windows,Non-insulated,Double,4150,"2,079",Yes,NA,Yes,492.26,599.26,NA,NA,221.84,NA,NA,NA,NA,NA
Contemporary,,Skyline Flush,Long Windows,Insulated,Single,2147,"1,828.12",Yes,647.06,Yes,317.98,358.66,395.64,599.00,110.94,NA,NA,NA,NA,NA
Contemporary,,Skyline Flush,Long Windows,Insulated,Double,2147,"2,865.44",Yes,"1,294.12",Yes,635.98,717.32,791.26,"1,198.00",221.84,NA,NA,NA,NA,NA
Contemporary,,Skyline Flush,Narrow,Insulated,Single,2147,1828.12,Yes,647.06,Yes,317.98,358.66,395.64,599.00,110.94,NA,NA,44.36,NA,NA
Contemporary,,Skyline Flush,Narrow,Insulated,Double,2147,2865.44,Yes,1294.12,Yes,635.98,717.32,791.26,"1,198.00",221.84,NA,NA,88.72,NA,NA
,,,,,,,,,,,,,,,,NA,NA,,,
Contemporary,,Aluminum,Full-View,Non-insulated,Single,3295R,"1,381.52",Yes,NA,Yes,246.1,NA,NA,NA,NA,NA,NA,NA,NA,NA
Contemporary,,Aluminum,Full-View,Non-insulated,Double,3295R,"2,079",Yes,NA,Yes,492.26,NA,NA,NA,NA,NA,NA,NA,NA,NA
Contemporary,,Aluminum,Full-View,Insulated,Single,3297R,"1,828.12",Yes,NA,Yes,317.98,NA,NA,NA,NA,NA,NA,NA,NA,NA
Contemporary,,Aluminum,Full-View,Insulated,Double,3297R,"2,865.44",Yes,NA,Yes,635.98,NA,NA,NA,NA,NA,NA,NA,NA,NA
,,,,,,,,,,,,,,,,NA,NA,,,
Contemporary,,Sterling,Flush,Insulated,Single,2783,???,Yes,NA,$???,200,250,NA,NA,100,NA,NA,NA,NA,NA
Contemporary,,Sterling,Flush,Insulated,Double,2783,???,Yes,NA,$???,400,500,NA,NA,200,NA,NA,NA,NA,NA
,,,,,,,,,,,,,,,,,,,,
Carriage,,Steel Overlay,Any Design,Insulated,Single,5300,"3,135.56",Yes,NA,Yes,719.06,756.24,793.46,1128.18,Mixed,120,202.3,NA,NA,100
Carriage,,Steel Overlay,Any Design,Insulated,Double,5300,"4,992.71",Yes,NA,Yes,1217.25,1279.22,1341.22,1675.94,Mixed,120,202.3,NA,NA,100
,,,,,,,,,,,,,,,,,,,,
Carriage,,Fiber Glass Overlay,Any Design,Insulated,Single,5500,"4,929.43",Yes,NA,Yes,719.06,756.24,793.46,1128.18,Mixed,120,202.3,NA,NA,100
Carriage,,Fiber Glass Overlay,Any Design,Insulated,Double,5500,"8,138.20",Yes,NA,Yes,1217.25,1279.22,1341.22,1675.94,Mixed,120,202.3,NA,NA,100
,,,,,,,,,,,,,,,,,,,,
Carriage,,Shoreline,Any Design,Insulated,Single,5602,"3,135.56",NA,647.06,Yes,719.06,756.24,793.46,1128.18,Mixed,120,202.3,NA,NA,100
Carriage,,Shoreline,Any Design,Insulated,Double,5602,"4,992.71",NA,1294.12,Yes,1217.25,1279.22,1341.22,1675.94,Mixed,120,202.3,NA,NA,100
,,,,,,,,,,,,,,,,,,,,
Carriage,,Wood Overlay,Any Design,Insulated,Single,5400,3000,NA,647.06,Yes,250,300,350,400,Mixed,120,202.3,NA,NA,100
Carriage,,Wood Overlay,Any Design,Insulated,Double,5400,6000,NA,1294.12,Yes,500,600,700,800,Mixed,120,202.3,NA,NA,100`

  //const res = await fetch('/test-deployment/dist/doorPrices.csv');
  //const text = await res.text();
let commonSolidColors = {White:"#EAEEED",Sandstone:"#9E9188",Almond:"#D5CBBF",Brown:"#4D3B37",Bronze:"#6E6D69",Gray:"#9C9DA1","Desert Tan":"#CBC4B1","Black":"#242625","Graphite":"#46494E"}
let commonInserts = {
  "No Inserts": "noInserts",
  Prairie: "prairie",
  Sherwood: "sherwood",
  Stockton: "stockton",
  Sunburst: "sunburst",
  Waterton: "waterton",
  Cathedral: "cathedral",
  Cascade: "cascade"
};

let commonGlass = {
  Plain: "plain",
  Obscure: "obscure",
  Frosted: "frosted",
  Tinted: "tinted",
  "Glue Chips": "glueChips",
  Seeded: "seeded"
};

let commonDesignerGlass = {
  Temple: "raisedTemple",
  Newport: "raisedNewPort",
  "Somerset Brass": "raisedSomsertSetBrass",
  "Somerset Platinum": "raisedSomsertSetPlat",
  "Hawthorne Brass": "raisedHawthorneBrass",
  "Hawthorne Platinum": "raisedHawthornePlat"
};

let commonWoodTones = {  
  "Carbon Oak": "carbon",
  "Natural Oak": "natural",
  "Dark Oak": "darkOak",
  Mahogany: "mahogany",
  Driftwood: "driftwood",
  Walnut: "walnut"
};
let Doors = {
  traditional: {
    "Raised Panel": {
      name: "Raised Panel",
      defaultImg: "RaisedPanel",
      id: "Raised",
      defaultDesign: "Short Panel",
      defaultColor: "Almond",
      rwd: "CHI_Raised.rwd",
      designs: {
        "Short Panel": "shortPanelRaised",
        "Long Panel": "longPanelRaised"
      },
      Insulation: {
        StandardImg: "standardRaisedPanel",
        Standard: {},
        PremiumImg: "premiumRaisedPanel",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: {
        position: {},
        glass: {},
        designerGlass: null,
        inserts: {
          "Any Design": { ...commonInserts }
        }
      },
      hardware: null,
      prices: {}
    },
    "Stamped Carriage House": {
      name: "Stamped Carriage House",
      defaultImg: "StampedCarriage",
      id: "StampedCarriage",
      defaultDesign: "Short Panel",
      defaultColor: "Brown",
      rwd: "CHI_StampedCarriageHouse.rwd",
      designs: {
        "Short Panel": "shortPanelStamped",
        "Long Panel": "longPanelStamped"
      },
      Insulation: {
        StandardImg: "standardStampedCarriage",
        Standard: {},
        PremiumImg: "premiumStampedCarriage",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: {
        position: {},
        glass: {},
        designerGlass: null,
        inserts: {
          "Any Design": { ...commonInserts }
        }
      },
      hardware: null,
      prices: {}
    },
    "Stamped Shaker": {
      name: "Stamped Shaker",
      defaultImg: "StampedShaker",
      id: "StampedShaker",
      defaultDesign: "Shaker",
      defaultColor: "Bronze",
      rwd: "CHI_StampedShaker.rwd",
      designs: {
        Shaker: "stampedShakerDesign"
      },
      Insulation: {
        StandardImg: "standardStampedShaker",
        Standard: {},
        PremiumImg: "premiumStampedShaker",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: {
        position: {},
        glass: {},
        designerGlass: null,
        inserts: {
          "Any Design": { ...commonInserts }
        }
      },
      hardware: {},
      prices: {}
    },
    "Recessed Panel": {
      name: "Recessed Panel",
      defaultImg: "RecessedPanel",
      id: "Recessed",
      defaultDesign: "Short Panel",
      defaultColor: "Sandstone",
      rwd: "CHI_Recessed.rwd",
      designs: {
        "Short Panel": "shortPanelRaised",
        "Long Panel": "longPanelRaised",
        Flush: "flush"
      },
      Insulation: {
        StandardImg: "standardRaisedPanel",
        Standard: {},
        PremiumImg: "premiumRecessed",
        Premium: {}
      },
      commonSolidColors: {
        White: "#EAEEED",
        Sandstone: "#9E9188",
        Almond: "#D5CBBF"
      },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: {
        position: {},
        glass: {},
        designerGlass: null,
        inserts: {
          "Any Design": {
            "No Inserts": "noInserts",
            Stockton: "stockton",
            Madison: "madison"
          }
        }
      },
      hardware: null,
      prices: {}
    }
  },

  contemporary: {
    Planks: {
      defaultImg: "Planks",
      id: "Planks",
      defaultDesign: "No Or Short Windows",
      defaultColor: "Cedar",
      rwd: "CHI_Planks.rwd",
      designs: {
        "No Or Short Windows": "shortWindows",
        "Long Windows": "longWindows"
      },
      Insulation: {
        StandardImg: "standardPlank",
        Standard: {},
        PremiumImg: "premiumPlank",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: {
        position: { "First Row": "top", "Right Edge": "right", "Left Edge": "left" },
        glass: {},
        styleLite: {
          "StyleLite Plain": "litePlain",
          "StyleLite Tinted": "liteTinted",
          "StyleLite Frosted": "liteFrosted",
          "StyleLite Rain": "liteRain"
        },
        designerGlass: null,
        inserts: {
          "No Or Short Windows": { ...commonInserts },
          "Long Windows": { ...commonInserts, Cathedral: null }
        }
      }
    },
    "Skyline Flush": {
      defaultImg: "SkylineFlush",
      id: "SkylineFlush",
      defaultDesign: "No Or Short Windows",
      defaultColor: "Natural Oak",
      rwd: "CHI_SkylineFlush.rwd",
      designs: {
        "No Or Short Windows": "shortWindows",
        "Long Windows": "longWindows"
      },
      Insulation: {
        StandardImg: "standardInsulation",
        Standard: {},
        PremiumImg: "premiumInsulation",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: {
        position: { "First Row": "top", "Right Edge": "right", "Left Edge": "left" },
        glass: {},
        styleLite: {
          "StyleLite Plain": "litePlain",
          "StyleLite Tinted": "liteTinted",
          "StyleLite Frosted": "liteFrosted",
          "StyleLite Rain": "liteRain"
        },
        designerGlass: null,
        inserts: {
          "No Or Short Windows": { ...commonInserts },
          "Long Windows": { ...commonInserts, Cathedral: null }
        }
      },
      hardware: {}
    },
    Aluminum: {
      defaultImg: "Aluminum",
      id: "Aluminum",
      defaultDesign: "Full View",
      defaultColor: "Anodized",
      rwd: "CHI_AluminumFullview.rwd",
      designs: { "Full View": "fullView" },
      Insulation: {
        StandardImg: "aluminumStandard",
        Standard: {},
        PremiumImg: "aluminumPremium",
        Premium: {}
      },
      windows: {
        glass: {},
        designerGlass: null,
        inserts: null
      },
      commonSolidColors: { Anodized: "#a0a4ac", White: "#EAEEED" },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      hardware: null
    },
    Sterling: {
      defaultImg: "Sterling",
      id: "Sterling",
      defaultDesign: "Flush",
      defaultColor: "Sandstone",
      rwd: "CHI_Sterling.rwd",
      woods: null,
      designs: { Flush: "flush" },
      Insulation: {
        StandardImg: "standardStampedShaker",
        Standard: {},
        PremiumImg: "premiumSterling",
        Premium: {}
      },
      commonSolidColors: {
        "Bone White": "#F8F4EC",
        Sandstone: "#E8E4d4",
        Almond: "#E8dCC4",
        "Medium Bronze": "#584C3C",
        Charcoal: "#404444",
        "Slate Gray": "#807c74",
        "Deep Black": "#281c24",
        "Hartford Green": "#283c3c"
      },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: {
        position: { "Top Row": "top", "All Glass": "full" },
        glass: {},
        designerGlass: null,
        inserts: null
      },
      hardware: null
    }
  },

  carriage: {
    "Steel Overlay": {
      defaultImg: "carriageSteel",
      id: "Steel Overlay",
      defaultDesign: "11",
      defaultColor: "Bronze with Black",
      rwd: "CHI_OverlayCarriageHouse.rwd",
      style: "Steel Overlay",
      designs: {
        "10": "ten",
        "10A": "tenA",
        "11": "eleven",
        "11A": "elevenA",
        "12": "twelve",
        "12A": "twelveA",
        "33": "thirtyThree",
        "33A": "thirtyThreeA"
      },
      Insulation: {
        StandardImg: "carriageSteelStandard",
        Standard: {},
        PremiumImg: "aluminumPremium",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: null,
      hardware: null
    },
    "Fiber Glass Overlay": {
      defaultImg: "carriageSteel",
      id: "Steel Overlay",
      defaultDesign: "11",
      defaultColor: "Bronze with Black",
      rwd: "CHI_OverlayCarriageHouse.rwd",
      style: "Steel Overlay",
      designs: {
        "10": "ten",
        "10A": "tenA",
        "11": "eleven",
        "11A": "elevenA",
        "12": "twelve",
        "12A": "twelveA",
        "33": "thirtyThree",
        "33A": "thirtyThreeA"
      },
      Insulation: {
        StandardImg: "carriageSteelStandard",
        Standard: {},
        PremiumImg: "aluminumPremium",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: null,
      hardware: null
    },
    Shoreline: {
      defaultImg: "Shoreline",
      id: "Shoreline",
      defaultDesign: "10",
      defaultColor: "Driftwood",
      rwd: "CHI_Shoreline.rwd",
      style: "Accents Overlay",
      designs: {
        "10": "ten",
        "10A": "tenA",
        "11": "eleven",
        "11A": "elevenA",
        "12": "twelve",
        "12A": "twelveA",
        "33": "thirtyThree",
        "33A": "thirtyThreeA"
      },
      Insulation: {
        StandardImg: "carriageSteelStandard",
        Standard: {},
        PremiumImg: "premiumShoreline",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: {
        Cedar: "cedar",
        "Dark Oak": "darkOak",
        Driftwood: "driftwood",
        Walnut: "walnut"
      },
      woods: {},
      windows: null,
      hardware: null
    },
    "Wood Overlay": {
      defaultImg: "carriageSteel",
      id: "Steel Overlay",
      defaultDesign: "11",
      defaultColor: "Bronze with Black",
      rwd: "CHI_OverlayCarriageHouse.rwd",
      style: "Steel Overlay",
      woods: null,
      designs: {
        "10": "ten",
        "10A": "tenA",
        "11": "eleven",
        "11A": "elevenA",
        "12": "twelve",
        "12A": "twelveA",
        "33": "thirtyThree",
        "33A": "thirtyThreeA"
      },
      Insulation: {
        StandardImg: "carriageSteelStandard",
        Standard: {},
        PremiumImg: "aluminumPremium",
        Premium: {}
      },
      commonSolidColors: { ...commonSolidColors },
      colors: {},
      commonWoodTones: { ...commonWoodTones },
      woods: {},
      windows: null,
      hardware: null
    }
  }
}//These doors and common items are a mock, do not contain images or urls//

function splitCSVLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'; // escaped quote
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

// Optional: normalize numeric-looking fields to plain strings without commas/quotes
// function normalizeField(val) {
//   if (val == null) return val;
//   // Treat NA/???/$??? below; just strip quotes/commas here
//   return String(val).replace(/^"(.*)"$/, '$1').replace(/,/g, '');
// }
 const rows = textCSV.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n');

  // Use the robust splitter
  const rawHeaders = splitCSVLine(rows[0]).map(h => h.trim());
  const headers = rawHeaders;
  let prices = {};
  rows.slice(1).forEach((row) => {
    const values = splitCSVLine(row);
    if (values.every(v => v.trim() === "")){
      return; // Skip rows where all values are empty
    }
    const entries = {};
    headers.forEach((header, idx) => entries[header] = values[idx]);
      for (let key in entries){
      if (entries[key]=="NA" || entries[key]=="???" || entries[key]==="$???") entries[key] = null;
    }
    let { /*Extact every possible option even if they dont exist in the CSV file*/
    Collection, Name, Design, Build, Size, Model, "Base Price": basePrice, "Solid Color":solidColor, Woodtone, 
    Glass,Tinted, Plain, Obscure, Frosted, Seeded, glueChips,Inserts,StyleLite,"D.Glass": designerGlass,Hardware
    } = entries;
    
    Name = (Name =="Stamped Carriage") ? "Stamped Carriage House" : Name
    if (Name=="Steel Overlay" || Name=="Fiber Glass Overlay" || Name=="Shoreline" || Name=="Wood Overlay"){
      console.log("Carriage Here")
    }
    if (Collection=="Contemporary"){
      console.log("Contemporary Here")
    }
    if (Collection=="Carriage"){
      console.log("Carriage Here")
    }

    prices[Collection] ||= {};
    prices[Collection][Name] ||= {};
    prices[Collection][Name][Design] ||= {};
    prices[Collection][Name][Design][Build] ||= {};
    prices[Collection][Name][Design][Build][Size] ||= { basePrice, options: {} };

    const opts = prices[Collection][Name][Design][Build][Size].options;
    opts["Solid Color"] ||= solidColor;
    opts["Accents Woodtones"] ||= Woodtone;

    let glassTracker = []
    if (Glass!= null){/*Removes all glasses not inputted into the csv file*/
      opts["Glass"] = {}
      if (Plain !== undefined) { 
        opts["Glass"]["Plain"] ||= Plain; 
        glassTracker.push({"Plain":Plain});/*Push only what actually exists in the csv*/
      }
      if (Obscure !== undefined) {
        opts["Glass"]["Obscure"] ||= Obscure;
        glassTracker.push({"Obscure":Obscure});
      }
      if (Tinted !== undefined) {
        opts["Glass"]["Tinted"] ||= Tinted;
        glassTracker.push({"Tinted":Tinted});
      }
      if (Frosted !== undefined) {
        opts["Glass"]["Frosted"] ||= Frosted;
        glassTracker.push({"Frosted":Frosted});
      }
      if (Seeded !== undefined) {
        opts["Glass"]["Seeded"] ||= Seeded;
         glassTracker.push({"Seeded":Seeded});
      }
      if (glueChips !== undefined) {
        opts["Glass"]["glueChips"] ||= glueChips;
        glassTracker.push({"glueChips":glueChips});
      }
    }
    else{
      opts["Glass"] = null
    }

    if (designerGlass!= null){

    }
    else{
      opts["Designer Glass"] = {}
    }
    if (Name=="Aluminum"){
      console.log("here")
    }
    opts["Inserts"] ||= Inserts;
    opts["StyleLite"] ||= StyleLite;
    opts["Hardware"] ||= Hardware;

    const Ins = (Build=="Non-insulated" ? "Standard": "Premium")
    const doorID = Name.replace(" ", "")+ " " + Design.replace(" ", "") + " "  + Ins + " "+ Size
    const doorType = Collection.charAt(0).toLowerCase() + Collection.slice(1)

    if (opts["Accents Woodtones"]){Doors[doorType][Name].woods[doorID] = "common"}
    if (opts["Solid Color"]){  Doors[doorType][Name].colors[doorID] ="common"}
    if (!opts["Accents Woodtones"] && opts["Solid Color"]){
      let colorPtr =  Doors[doorType][Name].colors
      if (Collection=="Traditional" && Name!="Recessed Panel"){
        colorPtr[doorID] = { ...Doors[doorType][Name].commonSolidColors, "Modern Woodgrain":"url","Classic Woodgrain":"url"}
      }
      else if (Collection=="Contemporary" && Name=="Skyline Flush"){
        colorPtr[doorID] = { ...Doors[doorType][Name].commonSolidColors, "Modern Woodgrain":"url","Classic Woodgrain":"url"}
      }
      else if(Collection=="Contemporary" && Name=="Aluminum"){
        colorPtr[doorID] = { ...Doors[doorType][Name].commonSolidColors}
      }
    }
    else if(opts["Accents Woodtones"]  && !opts["Solid Color"]){
      let colorPtr =  Doors[doorType][Name].woods
      colorPtr[doorID] = { ...Doors[doorType][Name].commonWoodTones}
    }
    
    if (opts["Glass"]){ 
      Doors[doorType][Name].windows.glass[doorID] = {}
      let doesNotHaveNull = true

      glassTracker.forEach(glass =>{/*Build glass combinations*/
        for (const glassName in glass){
          if (glass[glassName] != null) {
            Doors[doorType][Name].windows.glass[doorID][glassName] = commonGlass[glassName]
          } else{
            Doors[doorType][Name].windows.glass[doorID][glassName]  = null;
            doesNotHaveNull = false
          }
        }
      })

      if (doesNotHaveNull) {
        Doors[doorType][Name].windows.glass[doorID] = "common"
      }
    }

    if (Ins=="Standard" && !(Design in Doors[doorType][Name].Insulation["Standard"]) ){
      Doors[doorType][Name].Insulation["Standard"][Design] = Model
    }
    else if (Ins=="Premium" && !(Design in Doors[doorType][Name].Insulation["Premium"]) ){
      Doors[doorType][Name].Insulation["Premium"][Design] = Model
    }

    if(opts["Inserts"]){
      //Doors[doorType][Name].windows.inserts = {"Any Design": {...commonInserts}}
      //Add dynamic options like with glass if needed later. Hardcoded inserts for now
    }

  });

  console.log(Doors["traditional"])
  console.log(Doors["contemporary"])
  console.log()



  