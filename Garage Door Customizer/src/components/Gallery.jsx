import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useNavigate,useParams} from 'react-router-dom';
import '../css/Gallery.css'

function Gallery(props){
    const [openDialog, setOpenDialog] = useState(null);
    const [focusedImage, setFocusedImage] = useState(null);
    const galleryType = useParams().type;
    const gallerySubTypeParams = useParams().doorName;
    //console.log("BEFORE MODS:",galleryType, gallerySubTypeParams);

    const gallerySubType = gallerySubTypeParams.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    console.log(galleryType,gallerySubType)
    console.log(props.galleryImages[galleryType][gallerySubType]);
    const galleryImages = props.galleryImages[galleryType][gallerySubType];
    const navigate = useNavigate();
    const focusImage = (image) => {
        // Implement the logic to focus on the clicked image
        console.log("Focused image:", image);
        setOpenDialog(true);
        setFocusedImage(image);
    };
    const handleBuildClick = () => {
       navigate(`/${galleryType}/${gallerySubTypeParams}/build`)
    };

    return(<>
    <button id="back-button-gallery" onClick={() => navigate(-1)}>Back</button>
    <h1 id="gallery-header">{`${gallerySubType} Doors`}</h1>
    {openDialog && focusedImage && (
    <div className="image-dialog" onClick={() => setOpenDialog(false)}>
        <img src={focusedImage} alt="Focused" />
        <div id="image-dialog-buttons">
            <button onClick={() => setOpenDialog(false)}>Close</button>
            <button onClick={handleBuildClick}>Build</button>
        </div>
    </div>
    )}
    <div id="gallery-div">
        {galleryImages && galleryImages.map((image, index) => (
            <img key={index} src={image} alt={`Gallery image ${index + 1}`} onClick={() => {focusImage(image)}} />
        ))}
    </div>
    </>
    );
}

export default Gallery;