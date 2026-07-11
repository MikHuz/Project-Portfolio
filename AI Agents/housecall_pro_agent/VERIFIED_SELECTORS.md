# VERIFIED_SELECTORS.md - Verified UI Element Selectors

This file contains a library of robust, verified selectors for frequently interacted-with UI elements across various platforms. These selectors are used as a  priority to search up first when doing a tasks with headed browser automation (Priority 1 from BROWER_AUTOMATION.md"). When no selectors exist or they return wrong information or errors, you resort to priority=2, using ARIA refs from live snapshot with no selectors.

All electors must  return one element, if multiple are returned thats an issue with playwright setup not a bug, and you resort to aria refs

## Structure:
Selectors are organized by platform/context. Each entry should generally include:
- `selector`: The CSS selector string.
- `description`: A human-readable description of the element.
- `notes`: Any important usage notes or conditions.

Date or verified by doesn't matter to, description however should give ai agent clues on when to possibly use this if it isn't given

## Guidelines for Adding/Updating:
- **Uniqueness:** Ensure the selector matches only one element on the intended page/component.
- **Stability:** Prefer selectors that are likely to survive UI updates (`id`, `data-testid`, `aria-label`, `role + aria-label`). Avoid brittle, auto-generated classes if possible.
- **Semantic:** Describe the element's purpose or identity, not just its styling.
- **Verification:** Only add selectors that have been explicitly tested and confirmed to work.
-- **For almost all cases you simply use this as file library, since you DO NOT attempt to play around with new selectors not written down when doing actual work, they are usually given to you or you are specifically instructed to find new ones as part for a discovery phase **

## Example of correct command call uis usingselector:
print(default_api.browser(
    action="act",
    profile="hcp",
    request={
        "kind": "click",
        "selector": ".linked-card:has(.card-footer:has-text('Single Door'))"
    }
))

There is no full browser snapshot or aria ref labeling. IF unconfident in taking an action, you can simply return that one element and then attempt to see what it is to interact with it. 

# Customer Image Task Selectors:
This workflow is for creating C.H.I doors and adding them onto provided customer images and downloading the final image
The workflow takes place in "https://doorvisions.chiohd.com/"

## Important structural information
"https://doorvisions.chiohd.com/" is structued like this:
1. Size
2. Product( OR actual door model by name)
3. Style (ONLY for shoreline or overlay carriage house doors)
4. Door Design (After product or after Style)
5. Thermal Insulation
6. Color/AccentsWoodtones
7. Windows (Includes the Position, Glass and Inserts all in one section)
8. That's it move onto to the uploading/download/summary buttons

The way this is structured, you follow each main section sequentially. You don't click on windows when color hasn't been clicked. It is created such that you simply follow the selector for each each main section and continue on. If you use a selector with an action liek click and it returns good, assume that it worked and you move on to next action. 

### Important Guideline
IF one selector fails and returns an error, try another if the verified selectors for that section ah sother options. For example some color option might not exist for that particular door, very likely another one does. 

## Size Selectors
Custom dimensions dont matter here, use the appropriate size button as the final image is either single or double anyway. Make sure to finalize with the "confirm size button" before moving to next section
 
- `selector`: `.linked-card:has(.card-footer:has-text('Single Door'))`
  `description`: Button to select a single garage door configuration.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select door size.

- `selector`: `.linked-card:has(.card-footer:has-text('Double Door'))`
  `description`: Button to select a double garage door configuration.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select door size.

- `selector`: `.btn.btn-primary:has-text('Confirm Size')`
  `description`: Button to confirm the selected door dimensions.

## DoorVisions Door Model Selectors
These are not "Designs" but "Products"
- `selector`: `.linked-card:has(.card-link[title='Raised Panel'])`
  `description`: Button to select the 'Raised Panel' door design.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select door design.

- `selector`: `.linked-card:has(.card-link[title='Stamped Carriage House'])`
  `description`: Button to select the 'Stamped Carriage House' door design.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select door design.

- `selector`: `.linked-card:has(.card-link[title='Stamped Shaker'])`
  `description`: Button to select the 'Stamped Shaker' door design.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select door design.

- `selector`: `.linked-card:has(.card-link[title='Overlay Carriage House'])`
  `description`: Button to select the 'Overlay Carriage House' door design.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select door design.

## Style
### FOR SHORELINE AND OVERLAY CARRIAGE HOUSE DOORS ONLY
These doors have an additional precursor layer called "Style", which you must choose the appropriate selector for the style(accents overlay, wood overlay steel overlay etc.) before choosing designs. Otherwise move onto designs

#### Shoreline doors styles:
Simply use the selector ".linked-card:has(.card-link[title='Accents Overlay'])

#### Overlay Carriage House styles:
Use one of the following for the style with the title in all caps:
".linked-card:has(.card-link[title='Steel Overlay'])"
".linked-card:has(.card-link[title='Fiberglass Overlay'])"
".linked-card:has(.card-link[title='Wood Overlay'])"


## Door model design selectors
The name has to be in all caps for this one. After having chosen the door model (Raised Panel,Planks, Slyline flush etc.) 
it appears that every single design or style can be directly clicked with this selector:
#### ".linked-card:has(.card-link[title='{exact C.H.I design name'])"
Try to use this selector for any door design to use with an action rather than taking an entire screenshot

###  Raised Panel and Stamped Carriage house designs
".linked-card:has(.card-link[title='Long Panel'])"
".linked-card:has(.card-link[title='Short Panel'])"

### Stamped Shaker Designs
".linked-card:has(.card-link[title='SHAKER])"

### Planks and flush
#### IMPORTANT. If the customer selected stylite windows, always choose Long window design
".linked-card:has(.card-link[title='No Or Short Window'])"
".linked-card:has(.card-link[title='Long Windows'])"
".linked-card:has(.card-link[title='Oversized Windows'])"


### Overlay shoreline plus carriage design selectors:
Match the one to the customer request or simply choose the first one if unknown
".linked-card:has(.card-link[title='10 (Short Single Vertical)'])"
".linked-card:has(.card-link[title='10A (Arch - Short Single Vertical)'])"
".linked-card:has(.card-link[title='11 (Short No Design)'])"
".linked-card:has(.card-link[title='11A (Arch - Short No Design)'])"
".linked-card:has(.card-link[title='12 (Short Double Vertical)'])"
".linked-card:has(.card-link[title='12A (Arch - Short Double Vertical)'])"
".linked-card:has(.card-link[title='33 (A Buck)'])"
".linked-card:has(.card-link[title='33A (Arch - A Buck)'])"
".linked-card:has(.card-link[title='34 (X Buck)'])"
".linked-card:has(.card-link[title='34A (Arch - X Buck)'])"
".linked-card:has(.card-link[title='35 (V Buck)'])"
".linked-card:has(.card-link[title='35A (Arch - V Buck)'])"
".linked-card:has(.card-link[title='30 (Single Vertical)'])"
".linked-card:has(.card-link[title='30A (Arch - Single Vertical)'])"
".linked-card:has(.card-link[title='31 (No Design)'])"
".linked-card:has(.card-link[title='31A (Arch - No Design)'])"
".linked-card:has(.card-link[title='32 (Double Vertical)'])"
".linked-card:has(.card-link[title='32A (Arch - Double Vertical)'])"
".linked-card:has(.card-link[title='13 (Short A Buck)'])"
".linked-card:has(.card-link[title='13A (Arch - Short A Buck)'])"
".linked-card:has(.card-link[title='14 (Short X Buck)'])"
".linked-card:has(.card-link[title='14A (Arch - Short X Buck)'])"
".linked-card:has(.card-link[title='15 (Short V Buck)'])"
".linked-card:has(.card-link[title='15A (Arch - Short V Buck)'])"

### Sterling Designs
".linked-card:has(.card-link[title='Flush'])"

### Aluminum Designs
".linked-card:has(.card-link[title='Full-View])"

### Recessed Panel Designs
".linked-card:has(.card-link[title='Short Panel'])"
".linked-card:has(.card-link[title='Long Panel'])"
".linked-card:has(.card-link[title='Flush'])"


## Thermal and insulation Selectors
These selectors simply match the most premium option by model number since this doesn't alter the image but opens up customization options. Don't ened to match actual insulation to whatever customer requested, the highest thermal rating gurantees all color and window options are present. 
NOTE: Designs may change the available insulation model number
### Raised Panel with SHORT PANEL design
".linked-card:has(.card-link[title='2216])"
### Raised Panel with LONG PANEL design
".linked-card:has(.card-link[title='4216])"

### Stamped Carriage House with SHORT PANEL design
".linked-card:has(.card-link[title='5216'])"
### Stamped Carriage House with LONG PANEL design
".linked-card:has(.card-link[title='5916'])"

### Stamped Shaker
".linked-card:has(.card-link[title='2516'])"

### Sterling
".linked-card:has(.card-link[title='2717'])"

### Planks with No Or Short Windows design
".linked-card:has(.card-link[title='2328'])"
### Planks with LONG Windows design
".linked-card:has(.card-link[title='2348'])"
### Planks with Oversized windows design
".linked-card:has(.card-link[title='2358'])"

### Skyline Flush with no or short windows
".linked-card:has(.card-link[title='2128'])"
### Skyline Flush with long windows
".linked-card:has(.card-link[title='2148'])"

### Shoreline
".linked-card:has(.card-link[title='5602'])"

### Carriage house overlay with STEEL OVERLAY STYLE
".linked-card:has(.card-link[title='5600'])"
### Carriage house overlay with WOOD OVERLAY STYLE
".linked-card:has(.card-link[title='5700'])"
### Carriage house overlay with FIBERGLASS OVERLAY STYLE
".linked-card:has(.card-link[title='5800'])"

### Aluminum 
".linked-card:has(.card-link[title='3297R'])"

### Recessed Panel with SHORT PANEL
".linked-card:has(.card-link[title='2298'])"
### Recessed Panel with LONG PANEL
".linked-card:has(.card-link[title='2294'])"
### Recessed Panel with flush
".linked-card:has(.card-link[title='2291'])"


-- END OF INUSLATION SELECTORS --


## Color Selectors
Use these after you have chosen the thermal insulation. First you must make sure you are on correct color section
"#section-color .nav-link:has-text('Solid Color')"
"#section-color .nav-link:has-text('Accents Woodtones')"

After you have chosen the correct tab, then you simply use the selector with the name of the color with the first letters capitalized:
`.linked-card:has(.card-link[title='{name of the color}'])`
Examples:
`.linked-card:has(.card-link[title='Dark Oak'])`

###  Multiple Color Selectors
Some color use multiple color names but are actually one option as they combine two colors. These are mostly on steel carriage overlay doors
Examples:
"Sandstone with Black",
"White with Black"
Bronze with White
Black with White
White with Black
Almond with Black
Sandstone with Black
Bronze with Black etc.

#### IMPORTANT quirk: the word "with" must be lowercase when using these

### Aluminum
This one simple contains two colors:
"Anodized"
"White

### Shoreline door colors
These only belong to shoreline doors:
"Cedar Black Two Tone"
"Walnut Black Two Tone"
"Dark Oak Black Two Tone"
"Driftwood Black Two Tone"



## Window Positions
All of these need to be in caps


### For planks and skyline flush doors additions 
- `selector`: `.linked-card:has(.card-link[title='LEFT EDGE'])`
  `description`: Button to select the 'LEFT EDGE' window position ONLY for planks and flush.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select the window position.

- `selector`: `.linked-card:has(.card-link[title='RIGHT EDGE'])`
  `description`: Button to select the 'RIGHT EDGE' window position ONLY for planks and flush.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select the window position.


### For Shoreline and overlay carriage house ONLY
NOTE that if one fails, try the other selector, some designs only allow single, while others double rows
- `selector`: `.linked-card:has(.card-link[title='DOUBLE ROW'])`
  `description`: Button to select the 'DOUBLE ROW' window position FOR carriage overlay doors only and shorline.
- `selector`: `.linked-card:has(.card-link[title='SINGLE ROW'])`
  `description`: Button to select the 'DOUBLE ROW' window position FOR carriage overlay doors only and shorline.


### Full view Aluminum Door only
- `selector`: `.linked-card:has(.card-link[title='FULL-VIEW'])`
  `description`: Button to select the 'FULL-VIEW' window position FOR aluminum door only.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select the window position.

### Sterling door only
- `selector`: `.linked-card:has(.card-link[title='TOP ROW'])`
  `description`: Button to select the 'TOP ROW' window position
.linked-card:has(.card-link[title='SECOND ROW'])
.linked-card:has(.card-link[title='TOP 2 ROWS'])
.linked-card:has(.card-link[title='ALL GLASS'])


### Universal window selectors EXCEPT full view aluminum, sterling and shoreline/overlay carriage doors
- `selector`: `.linked-card:has(.card-link[title='NO WINDOWS'])`
  `description`: Button to select the 'NO WINDOWS' window position. This one is universal for all doors
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select the window position.

- `selector`: `.linked-card:has(.card-link[title='FIRST ROW'])`
  `description`: Button to select the 'FIRST ROW' window position.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to select the window position.


## Glass Selectors color and window position
Select these after you selected a color and window position

### Normal "Glass" section"
These are applicable for all doors, but not designer or stylite windows
".linked-card:has(.card-link[title='Plain'])"
".linked-card:has(.card-link[title='Plain Stockton'])"
".linked-card:has(.card-link[title='Plain Madison'])"

".linked-card:has(.card-link[title='Obscure'])"
".linked-card:has(.card-link[title='Obscure Stockton'])"
".linked-card:has(.card-link[title='Obscure Madison'])"

".linked-card:has(.card-link[title='Tinted'])"
".linked-card:has(.card-link[title='Tinted Stockton'])"
".linked-card:has(.card-link[title='Tinted Madison'])"

".linked-card:has(.card-link[title='Frosted'])"
".linked-card:has(.card-link[title='Frosted Stockton'])"
".linked-card:has(.card-link[title='Frosted Madison'])"

".linked-card:has(.card-link[title='Seeded'])"
".linked-card:has(.card-link[title='Seeded Stockton'])"
".linked-card:has(.card-link[title='Seeded Madison'])"

".linked-card:has(.card-link[title='Rain'])"

".linked-card:has(.card-link[title='Faux'])"
".linked-card:has(.card-link[title='Faux Stockton'])"
".linked-card:has(.card-link[title='Faux Madison'])"


## Window Inserts
### Selectors for two sections
"a[aria-controls="section-inserts__BV_tab_container_"]:has-text("Window Inserts")"
"a[aria-controls="section-inserts__BV_tab_container_"]:has-text("Black Inserts")"


Once on a section, there is one selector for an actual insert on this section:
".linked-card:has(.card-link[title='{name_of_insert'])"
Exmaples:
.linked-card:has(.card-link[title='Cascade'])
.linked-card:has(.card-link[title='Madison'])

### Important to understand:
Don't be clever simply match what customer wanted with the door, if it doesn't work, see if there is another close match. For example "Madison" for steel carriage overlay could be 2 piece, 4 piece, arched or not, play around with the other madison, resort to automation only when exhausted the possible matches to manually see and select.

NOTE: "No inserts" is selected by default if windows are chosen, no need to select

### Exhaustive list:
Cascade, Prairie, Sherwood, Waterton, Stockton, 2 piece Arched Stockton, 4 piece Arched Stockton, Madison, 2 piece Arched Madison, 4 piece Arched Madison, 2 piece Sunburst, 4 piece Sunburst, Cathedral, 8 piece Sunburst, 4 piece Arched Plain

## Customer Image overlay
You use these selectors to overlay the created door ontot he provided customer image
### Place on Project Button (Important button for placing customer image on final door)
"footer button.btn-secondary:has-text('Place on Project')"  

### Place on door button
- `selector`: `.btn.btn-primary:has-text('Place Door')`
  `description`: Button to place the configured door onto the project after having uploaded the image first.
  `notes`: Used on https://doorvisions.chiohd.com/ to finalize the current door configuration and place it on the project.

### Summarries
- `selector`: `.btn.btn-primary:has-text('Summary')`
  `description`: After uploaded image and placed the door onto it, click the summary button.
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to open the summary page and proceed with requesting a quote.

- `selector`: `.btn.btn-primary:has-text('Download/Print Summary')`
  `description`: Button to download or print the completed door configuration summary. This is the last button to click
  `verified_by`: HCP Agent
  `date_verified`: 2026-07-06
  `notes`: Used on https://doorvisions.chiohd.com/ to generate a downloadable or printable summary of the configured door.


# Customer Add Door Visualization Task Workflow Selectors
This workflow is used when attempting to add an image as part of the `add_customer_image_task`. Follow sequentially.  

## Step 1. Find the Correct Option
First make sure you are actually on an open estimate page for that customer.
IF there is just one option, or the estimate only had one garage door, skip entirely as you are already located on the 
Run this for act with kind: 'evaluate'

```js
Array.from(document.querySelectorAll('.MuiTabs-flexContainer[role="tablist"] > button[role="tab"]')).map(el => el.textContent.trim())
```

Example output:

```text
[
  "This estimate",              // Ignore
  "Customer",                   // Ignore
  "Option #1Draft",
  "Service item playgroundDraft",
  "Material item playgroundDraft"
]
```

Ignore everything before **Customer**. Match the desired option from the remaining entries, then click it using:

```css
button[role="tab"]:has-text("{option name}")
```

Example:

```css
button[role="tab"]:has-text("Service item playground")
This is now on the correct option tab. IF there is just one option, skip entirely

## Step 2. Uploading

Once on the correct Housecall Pro estimate option, upload the customer door visualization image.

### Locate Image

The image to upload is:

```text
/home/doorgi/.openclaw/media/hcp/customer_house_photos/{customer_name}/door_visualization.jpg
```

This is the final customer-facing image showing the new garage door overlaid onto the customer's house.

### Prepare Upload File

Before uploading:

1. Copy the image into the inbound media directory:

```text
/home/doorgi/.openclaw/media/inbound/door_visualization.jpg
```

2. Use the copied file from the inbound directory as the upload source.

Do **not** modify, re-encode, or recreate the image.

---

## Upload Method (Required)

Housecall Pro's upload widget is a React component. The browser upload action is **not** reliable because it does not consistently trigger the internal React events required for the upload workflow.

**Do NOT use:**

* browser upload action
* browser.act upload
* browser.act evaluate
* JavaScript executed inside the browser attempting to call `page.locator(...)`
* Any browser tool that claims to be equivalent to Playwright's `setInputFiles()`

If these methods appear to succeed but the crop dialog immediately closes or the image never uploads, **they have failed**.

### Required Script

The upload **must** be performed by executing the dedicated Playwright script through the **exec tool**, **not** through browser automation tools.

The script connects to the already-running HCP browser via the CDP port and performs the upload using Playwright itself.

### Run:

node scripts/upload_customer_door.js

This script uploads
/home/doorgi/.openclaw/media/inbound/door_visualization.jpg
to the currently open HCP estimate that was opened through the prior selectors.

Do not implement your own upload logic.
Do not use browser.upload.
Do not use browser.act.
Do not modify the script.
Treat the script as the canonical upload implementation.

**Never attempt to reproduce this workflow using browser.evaluate or browser.upload.** Those tools do not expose Playwright's `page` object and are **not** interchangeable with the dedicated Playwright script.

If any of these steps fail, do **not** switch to browser upload actions. Instead, rerun or debug the Playwright script.

### Cleanup

After the upload has been confirmed successful:

Delete the temporary copy:

```text
/home/doorgi/.openclaw/media/inbound/door_visualization.jpg
```

The permanent source image remains stored at:

```text
/home/doorgi/.openclaw/media/hcp/customer_house_photos/{customer_name}/door_visualization.jpg
```






