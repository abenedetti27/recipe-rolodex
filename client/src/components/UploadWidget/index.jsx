import { useEffect, useRef } from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";


const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'defuryakl',
            uploadPreset: 'reciperolodex',
        }, function(error, result) {
            console.log(error, result);
        })
    }, []);
    // Create a Cloudinary instance and set your cloud name.
        const cld = new Cloudinary({
            cloud: {
            cloudName: 'demo'
            }
        });
    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
        const myImage = cld.image({/*insert url*/});  // Need to update this URL to make sure it is whichever file was uploaded to this form
    // Resize to 250 x 250 pixels using the 'fill' crop mode.
        myImage.resize(fill().width(250).height(250));

    return (
        <section>
        <div>
            <AdvancedImage cldImg={myImage} />
        </div>
        <div>
            <button onClick={() => widgetRef.current.open()}>Upload Image</button>
        </div>
        </section>
    )

  };
  
  export default UploadWidget;