import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// AUTHENTICATION
import { auth, onAuthStateChanged, signOut, query, collection, db, onSnapshot } from './config'
import { doc, deleteDoc } from "firebase/firestore";
export default function Dash() {
  // NAVIGATE
  const navigate = useNavigate();

  // USESTATE
  const [loginuser, setloginuser] = useState(null)
  const [dashimg, setdashimg] = useState("")
  const [alldata, setalldata] = useState("")  
  const [allpro, setallpro] = useState([])  

  // GET CURRENT USER
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setloginuser(user);
        // Fetch products for the logged-in user
        fetchProducts(user.email);
        fetchProfileData(user.email);
      } else {
        setloginuser(null);
      }
    });
  }, []);

  // FETCH ALL PRODUCTS
  const fetchProducts = (userEmail) => {
    const qb = query(collection(db, "sinproduct"));
    onSnapshot(qb, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.email === userEmail) {
          products.push({ ...productData, id: doc.id });
        }
      });
      setallpro(products);
    });
  };

  // FETCH PROFILE DATA
  const fetchProfileData = (userEmail) => {
    const q = query(collection(db, "accounts"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email === userEmail) {
          setdashimg(userData.profileimg);
          setalldata(userData);
        }
      });
    });
  };

  // LOGOUT FUNCTION
  function logout() {
    signOut(auth).then(() => {
      alert("Sign-out successful.");
      navigate("/");
    }).catch((error) => {
      alert(error);
    });
  }

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "sinproduct", id));
      console.log("Product deleted with ID:", id);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }
  return (
    <div className='container-fluid d-flex flex-lg-row flex-column dash'>
      <div className='div1 px-2 col-lg-3 col-12 d-flex flex-column justify-content-center align-items-center'>
        <div className='homediv'>
          <Link to={"/"}>
            <i className="fa fa-home" aria-hidden="true"></i>
          </Link>
        </div>
        <div className='col-10 d-flex justify-content-center py-3 align-items-center '>
          <img src={dashimg} className='img-fluid col-8 dashimgbig' alt="" />
        </div>
        {loginuser ? (
          <div className='d-flex col-12 px-2  flex-column py-3'>
            <h6 className='col-12'><b className='pe-1'>Name</b>:<span className='px-1'>{alldata.name}</span></h6>
            <h6 className='col-12'><b className='pe-1'>Email</b>:<span className='px-1'>{alldata.email}</span></h6>
            <h6 className='col-12'><b className='pe-1'>From</b>:<span className='px-1'>{alldata.location}</span></h6>
          </div>
        ) : (
          <div className='d-flex col-12 px-2  flex-column py-3'>
            <h5 className=''>No Data</h5>
          </div>
        )}
        <div className='position-absolute d-flex justify-content-center align-item-center col-6 bottom-0 my-2 px-2'>
          <button className='px-2 col-6 logouy' onClick={logout}>
            Logout <i className="fa fa-sign-out px-2" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {/* Second Column - col-lg-9 */}
      <div className="col-lg-8 col-12">
        <h2 className="px-2 py-3">Your Products</h2>
        <div className='d-flex flex-wrap row px-2'>
          {allpro.length > 0 ? allpro.map((product) => (
            <div className='col-lg-4 col-md-6 col-sm-12 mb-4' key={product.id}>
              <div className='card'>
                <img src={product.imageUrl} className='card-img-top dashimgtop' alt={product.name} />
                <div className='card-body'>
                  <h5 className='card-title text-truncate'>{product.title}</h5>
                  <p className='card-text'>Price: {product.price}</p>
                  <button className='logouy' onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
