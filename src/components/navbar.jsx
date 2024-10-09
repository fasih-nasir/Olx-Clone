import React, { useEffect } from 'react'
// 
import { Link } from 'react-router-dom'
//
// FIREBASE
import { query, where, onSnapshot,doc, auth,getDownloadURL,ref,onAuthStateChanged,storage,uploadBytesResumable ,signInWithEmailAndPassword,updateDoc,addDoc,collection,db,createUserWithEmailAndPassword,app } from '../auth/config';
// FIREBASE
import img1 from "../assets/logo.png"
// MATERIAL UI
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonOutline from '@mui/icons-material/PersonOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
// MATERIAL UI
export default function Navbar() {
// RELOAD



// RELOAD


  // MATERIAL UI
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };
  // MATERIAL UI
const [dashimg,setdashimg]=useState("")
  // GET DATA

  const q = query(collection(db, "accounts"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
        cities.push(doc.data());
    });
    cities.map((e)=>{
    
      if(e.email == loginuser.email){
      
      setdashimg(e.profileimg)
        
      }
      
      
      
      
  })
    
    // console.log("Current cities in CA: ", cities.join(", "));
  });

  // GET DATA
  // LOGIN STATE
const [email,setemail]=useState("")
const [pass,setpass]=useState("")
const [loginuser,setloginuser]=useState("")

onAuthStateChanged(auth, (user) => {
  if (user) {
  
    // console.log(user);
    
    setloginuser(user)
    const uid = user.uid;
    // ...
  } else {


  }
});


  // LOGIN STATE
  // CREATE STATE
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPass, setCreatePass] = useState("");
  const [img, setimg] = useState("");
  const [locPass,setlocPass]=useState("")
  const [dataimg, setdataimg] = useState("");

  // CREATE STATE

// SIGNUP
async function handleSignUp(e) {
  e.preventDefault();

  // Img Upload Start
  const storageRef = ref(storage, `images/${img.name}`);
  const uploadTask = uploadBytesResumable(storageRef, img);

  // Start listening for upload state changes
  uploadTask.on(
    'state_changed', 
    (snapshot) => {
      // Track progress of the image upload
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    }, 
    (error) => {
      // Handle upload errors
      console.error('Error during upload:', error.message);
    },
    async () => {
      // This block runs after the image is uploaded
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    

      // Create user account
      createUserWithEmailAndPassword(auth, createEmail, createPass)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Firebase - Create a new document in 'accounts' collection
          const docRef = await addDoc(collection(db, "accounts"), {
            name: createName,
            email: createEmail,
            location:locPass,
            profileimg: downloadURL,  // Save the image URL in Firestore
          });

          // Update document with the generated ID
          await updateDoc(docRef, { id: docRef.id });

          setCreateName("");   
          setCreateEmail(""); 
          setCreatePass("");   
          setimg(null);       
          enqueueSnackbar(`${createName} Your account has been successfully created!`, { variant: 'success' });
        })
        
        .catch((error) => {
          // Handle any error in creating the user
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error during user creation:', errorCode, errorMessage);
          enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
        });
    }
  );
  // Img Upload End
}
// SIGNUP 
  // LOGIN 
  function loginsubmit(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
    
      const user = userCredential.user;
      enqueueSnackbar(`Successfully Login!`, { variant: 'sccess' });
    })
    setemail("")
    setpass("")
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      enqueueSnackbar(`Error: ${errorMessage}`, { variant: 'error' });

    });
  
  


  }
  // 
  return (
<>

<div>

  <div className="container-fluid d-flex col-12 flex-row py-3 px-5">
    <div className='col-6'>
    <Link to={"/"}>
   <img src={img1} className='col-1 navbar-brand' alt="" />
   </Link>
   </div>

    <div className="d-flex flex-row align-items-end justify-content-end col-6" id="navbarSupportedContent">
     
    <Stack direction="row" className='d-flex justify-content-end' spacing={2}>
      {/* <Link > */}
      <Button className='logibtn'  endIcon={<LoginIcon />} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        LOGIN
      </Button>
      {/* </Link> */}
      {/* usericon  */}

{loginuser ?(

    <Link className='col-lg-4 col-3' to={"/auth/dash"}>


    <img src={dashimg} className='img-fluid dashimg col-12' alt="" />
  

  {/* </button> */}
    </Link>
  
):(
    <Link  to={"/"}>
  <Button  className='col-12 btnus '>
    <i className="fa-solid fa-user-slash iconcol col-12"></i>
  
</Button>
  </Link>
)  }
    
      {/* usericon  */}

   
    </Stack>
    </div>
  </div>


    </div>
    {/* // LOGIN */}
    <div
  className="offcanvas offcanvas-end"
  tabIndex={-1}
  id="offcanvasRight"
  aria-labelledby="offcanvasRightLabel"
>
  <div className="offcanvas-header">
  <a href="">
   <img src={img1} className='col-2 navbar-brand' alt="" />
   </a>
    <button
      type="button"
      className="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    />
  </div>
  <div className="offcanvas-body flex-column d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
  <h3 className='py-3'>Sign-In</h3>
      <form className="d-flex flex-column align-items-center" style={{ width: '100%', maxWidth: '400px' }}>
        {/* Material UI TextFields with floating label */}
        <TextField
          className='col-10'
          label="Enter Your Email"

      
          margin="normal"
          value={email}
onChange={(e)=>{setemail(e.target.value)}}
        />
        <TextField
           className='col-10'
          label="Enter Your Password"
          type="password"
   
          value={pass}
          onChange={(e)=>{setpass(e.target.value)}}
        />

        {/* Sign In Button */}
      <div className='col-5'>
      <Stack>
        <Button type="submit" onClick={loginsubmit}  variant="outlined" endIcon={<LoginIcon />} className="btn  mt-3">
          Sign In
        </Button>
        </Stack>
        </div>
        <div className='py-2'>
  <h6 className='py-2'>
    Don't have an account?
    <button className="btn btn-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight">
      Create Now!
    </button>
  </h6>
</div>
      </form>
    </div>
</div>

    {/* // LOGIN */}
  
    {/* // SIGN-UP */}
    <div
  className="offcanvas offcanvas-end"
  tabIndex={-1}
  id="offcanvasRight1"
  aria-labelledby="offcanvasRightLabel"
>
  <div className="offcanvas-header">
    {/* <h5 id="offcanvasRightLabel"> */}
    <a href="">
   <img src={img1} className='col-2 navbar-brand' alt="" />
   </a>
    {/* </h5> */}
    <button
      type="button"
      className="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    />
  </div>
  <div
          className="offcanvas-body flex-column d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <h3 className="py-3">Sign-Up</h3>
          <form
            className="d-flex flex-column align-items-center"
            style={{ width: "100%", maxWidth: "400px" }}
            onSubmit={handleSignUp}
          >
            {/* Name Input */}
            <TextField
          
              label="Enter Your Name"
          
              value={createName}
              className='col-10'
              required
              onChange={(e) => setCreateName(e.target.value)}
            />

            {/* Email Input */}
            <TextField
                      className='col-10'

              label="Enter Your Email"
              variant="outlined"
                required
              margin="normal"
              value={createEmail}
              onChange={(e) => setCreateEmail(e.target.value)}
            />

            {/* Password Input */}
            <TextField
                      className='col-10'

              label="Enter Your Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={createPass}
              onChange={(e) => setCreatePass(e.target.value)}
            />
               <TextField
                      className='col-10'

              label="Location"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={locPass}
              onChange={(e) => setlocPass(e.target.value)}
            />
            <div className="d-flex my-2 col-10" >
      {/*  */}
      <div className='d-flex justify-content-between col-12'>
      <label htmlFor="Image" className="col-5">Profile-Image </label>
<input 
  type="file" 
  id="Image" // Add an ID to link with the label
  className="col-7 file-input" 
  onChange={(e) => { setimg(e.target.files[0]); }} 
/>
<label htmlFor="Image" className="col-5 custom-file-label">+</label>
</div>
{/*  */}
</div>
            {/* Sign-Up Button */}
            <div className="col-5">
              <Stack>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<AddIcon />}
                  className="btn btnall mt-3"
                >
                  Sign Up
                </Button>
              </Stack>
            </div>
            {/*  */}
            <h6 className='py-2'>
    Already account?
    <button className="btn btn-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
      Sign-In Now!
    </button>
  </h6>
            {/*  */}
          </form>
        </div>
</div>

    {/* // SIGN-UP */}
  
    </>
  )
}
