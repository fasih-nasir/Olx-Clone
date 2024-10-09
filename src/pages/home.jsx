import React, { useState, useEffect } from 'react';
import sliderimg from "../assets/slider.png";
import img1 from "../assets/logo.png";
import { Link } from 'react-router-dom';
import About from "../pages/about";
import Footer from './footer';
import Products from './products';
// Firebase imports
import {
  onAuthStateChanged,
  auth,
  addDoc,
  collection,
  updateDoc,
  db,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from '../auth/config';

// Material UI Imports
import { Button, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function Home() {
  // State variables
  const [createName, setCreateName] = useState("");
  const [createtitle, setCreatetitle] = useState("");
  const [createdesc, setCreatedesc] = useState("");
  const [createPrice, setCreatePrice] = useState("");
  const [locPass, setLocPass] = useState("");
  const [image, setImage] = useState(null); // State for storing the selected image
  const [loginUser, setLoginUser] = useState(null);
  const [num,setnum]=useState("")

  // Snackbar hook from Material-UI
  const { enqueueSnackbar } = useSnackbar();

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       console.log(user.email);
       
        
        setLoginUser(user);
      } else {
        setLoginUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Add Product Function
  async function AddProduct(e) {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      let imageUrl = ""; 
      const storage = getStorage();

      // Check if an image is selected
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`); // Reference to the image path

        // Upload the image
        await uploadBytes(imageRef, image).then(async (snapshot) => {
          imageUrl = await getDownloadURL(snapshot.ref); // Get the download URL after upload
        });
      } else {
        console.error("Image is not defined."); // Log an error if no image is selected
        enqueueSnackbar("Please select an image to upload.", { variant: 'warning' });
        return; // Exit the function early
      }

      // Save product data to Firestore
      const docRef = await addDoc(collection(db, "sinproduct"), {
        title: createtitle,
        username: createName || (loginUser ? loginUser.displayName : ''),
        email:loginUser.email,
        desc: createdesc,
        location: locPass,
        number:num,
        price: createPrice,
        imageUrl: imageUrl, // Save the image URL
      });

      // Update with the generated document ID (if needed)
      await updateDoc(docRef, { id: docRef.id });

      // Reset the form fields after the product is added
      setCreateName("");
      setCreatetitle("");
      setCreatedesc("");
      setCreatePrice("");
      setLocPass("");
      setnum("");
      setImage(null); // Reset image state

      // Show success message
      enqueueSnackbar("Your post is added to the feed!", { variant: 'success' });
    } catch (error) {
      console.error("Error while adding product:", error.message);
      enqueueSnackbar("Error adding product!", { variant: 'error' });
    }
  }

  return (
    <>
      {/* Sell Button */}
      {loginUser ? (
        <button
          className="sellbtn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBackdrop"
          aria-controls="offcanvasWithBackdrop"
        >
          Sell
        </button>
      ) : (
        <Link to={"/"}>
          <Button className='col-12 sellbtn'>
            <i className="fa-solid fa-user-slash iconcol col-12"></i>
          </Button>
        </Link>
      )}
      <img src={sliderimg} alt="" className='col-12 px-5 d-flex mt-3' />
      {/* Off-canvas */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
        <div className="offcanvas-header">
          <img src={img1} className='col-2 navbar-brand' alt="Logo" />
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body flex-column d-flex justify-content-center align-items-center">
          <h4 className=' pt-5 pb-4'>Add Your Product</h4>
          <form onSubmit={AddProduct} className='flex-column d-flex justify-content-center align-items-center col-12'>
            <input
              type="text"
              placeholder="Enter Your Name"
              className='col-10 mb-3'
              required
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Product Title"
              className='col-10 mb-3'
              required
              value={createtitle}
              onChange={(e) => setCreatetitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Product Description"
              className='col-10 mb-3'
              required
              value={createdesc}
              onChange={(e) => setCreatedesc(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className='col-10 mb-3'
              required
              value={createPrice}
              onChange={(e) => setCreatePrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className='col-10 mb-3'
              required
              value={locPass}
              onChange={(e) => setLocPass(e.target.value)}
            />

            {/*  */}
            <input
              type="number"
              placeholder="Contact-Number"
              className='col-10 mb-3'
              required
              value={num}
              onChange={(e) => setnum(e.target.value)}
            />
            {/*  */}
            <div className='d-flex flex-row col-10  justify-content-center'>
            <h6 className="col-5 pt-3">Product-Image</h6>
            <input
              type="file"
              accept="image/*"
              
              className='col-7 mb-3'
              onChange={(e) => {
                const file = e.target.files[0]; // Get the first file
                if (file) {
                  setImage(file); // Set the file to state if it exists
                } else {
                  console.error("No file selected.");
                }
              }}
            />
            </div>
            {/* Submit Button */}
            <div className='d-flex mt-4 justify-content-center align-items-center col-12'>
              <button className='btn btnus col-4' type="submit">Add Product</button>
            </div>
          </form>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar />
      {/* About US */}
<About/>
      {/* About US */}
      {/* PRODUCT */}
      <Products/>
      {/* PRODUCT */}
      {/* FOOTER */}
     <Footer/>
      {/* FOOTER */}






    </>
  );
}
