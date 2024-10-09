import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { query, collection, db, onSnapshot } from "../auth/config";

export default function Products() {
  const [alldata, setalldata] = useState([]);

  // GET DATA
  useEffect(() => {
    const q = query(collection(db, "sinproduct"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });

      setalldata(products); // Set all products
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  // Render Products
  return (
    <>
      <div className='container-fluid '>
        <h2 className='text-center'>All Products</h2>
        <div className="container-fluid px-4 py-5 ">
          <div className="d-flex flex-wrap justify-content-start">
            {alldata.map((product, index) => (
              <div className="col-lg-3 col-12 col-md-6 p-3" key={index}>
                <div className="card h-100 obxdiv rounded">
                  <a className="d-block position-relative rounded overflow-hidden">
                    <img
                      alt={product.title}
                      className="w-100 h-100 object-fit-cover"
                      src={product.imageUrl}
                    />
                  </a>
                  <div className="mt-3 p-3">
                    <h6 className="text-dark title-font fs-5 fw-bold text-truncate">{product.title}</h6>
                    <p className="mb-0">{product.username} </p>
                    
                    <p className="mb-0">Price: {product.price} <br /> {product.location} </p>
              {/* {console.log(product.id)} */}
               <Link to={`product-detail/${product.id}`} target='_blank'>
                <button className='btnsee'><i className="fa fa-eye" aria-hidden="true"></i></button>
                </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
