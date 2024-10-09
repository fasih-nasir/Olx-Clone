import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../auth/config'; // Import Firebase Firestore config

export default function ProductDetail() {
  const { id } = useParams(); // Get the product id from the URL params
  const [product, setProduct] = useState(null);

  // Fetch product details from Firestore based on the id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'sinproduct', id); // Reference the document by id
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          setProduct(docSnap.data()); // Set the product data
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct(); // Call the function when component mounts
  }, [id]); // Dependency array includes id to refetch when it changes

  if (!product) {
    return <div>Loading...</div>; // Show loading while fetching
  }

  // Function to handle "Buy Now" button click
  const handleBuyNow = () => {
    const message = `I'm interested in buying ${product.title} for ${product.price}. Location: ${product.location}.`;
  
    // Ensure the number exists
    let phoneNumber = product.number;
    if (!phoneNumber) {
      console.error('Phone number is undefined.');
      return; // Do not proceed if the number is missing
    }
  
    // Add Pakistan country code if the number doesn't start with '+92'
    if (!phoneNumber.startsWith('+92')) {
      // Ensure the phone number does not already contain the 0 at the start
      if (phoneNumber.startsWith('0')) {
        phoneNumber = phoneNumber.substring(1); // Remove the leading '0'
      }
      phoneNumber = '+92' + phoneNumber; // Append +92 country code
    }
  
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank'); // Open WhatsApp in a new tab
  };

  // Render product data from Firebase
  return (
    <section className="text-dark py-5">
      <div className="container d-flex flex-column flex-md-row align-items-center">
        <div className="col-md-6 col-12 mb-4 mb-md-0">
          <img className="img-fluid rounded col-10 imgboxdetail" alt={product.title} src={product.imageUrl} />
        </div>
        <div className="col-md-6 col-12 d-flex flex-column align-items-center text-center text-md-start">
          <h2 className="text-start">{product.title}</h2>
          <p className="text-start">{product.desc}</p>
          <div className='d-flex align-items-start col-12'>
            <p className="text-start">
              <strong>Price:</strong> {product.price} <br />
              <strong>Location:</strong> {product.location}
            </p>
          </div>
          <div className="d-flex justify-content-start col-12 justify-content-md-start">
            <button className="btnnow" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
