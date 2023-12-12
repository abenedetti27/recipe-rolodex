import { useEffect, useRef, useState } from 'react';


const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [myImage, setMyImage] = useState();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'defuryakl',
            uploadPreset: 'reciperolodex',
        }, function(error, result) {
            console.log("error:", error);
            console.log("result:", result);
            console.log("result.info.secure_url:", result.info.secure_url);
            if (result && result.info && result.info.secure_url) {
                setMyImage(result.info.secure_url);
            }
        });
    }, []);
        

    return (
        <section>
        <div>
            <img className="uploaded-image-cloudinary" src={myImage}/>
        </div>
        <div>
            <button onClick={() => widgetRef.current.open()}>Upload Image</button>
        </div>
        </section>
    )

  };
  
  export default UploadWidget;