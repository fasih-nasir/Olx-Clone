import React from 'react'

const AboutUs=()=> {
  return (
<>
<div className="container-fluid my-5">
  <section className="text-gray-600  body-font">
    <div className="container-fluid my-5 px-4 py-24 mx-auto">
      
      {/* First Row */}
      <div className="row abdiv justify-content-center align-items-center px-4">
        <div className="col-md-4 p-4">
          <a className="block relative h-48 rounded overflow-hidden">
            {/* <img alt="Trust & Security" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" /> */}
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Trust & Security</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">Secure Transactions</h2>
            <p className="mt-1">We ensure that every transaction is safe, reliable, and protected.</p>
          </div>
        </div>
        <div className="col-md-4 p-4">
          <a className="block relative h-48 rounded overflow-hidden">
            {/* <img alt="Wide Range of Categories" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261" /> */}
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Categories</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">Variety of Products</h2>
            <p className="mt-1">From electronics to fashion, explore a vast range of categories.</p>
          </div>
        </div>
        <div className="col-md-4 p-4">
          <a className="block relative h-48 rounded overflow-hidden">
            {/* <img alt="Customer Support" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/422x262" /> */}
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Customer Support</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">24/7 Assistance</h2>
            <p className="mt-1">Our dedicated support team is available around the clock to assist you.</p>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="row abdiv justify-content-center align-items-center px-4">
        <div className="col-md-4 p-4">
          <a className="block relative h-48 rounded overflow-hidden">
            {/* <img alt="Easy Listings" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" /> */}
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">User-Friendly</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">Easy to List Products</h2>
            <p className="mt-1">Post your products for sale quickly and with minimal effort.</p>
          </div>
        </div>
        <div className="col-md-4 p-4">
          <a className="block relative h-48 rounded overflow-hidden">
            {/* <img alt="Trusted Community" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/424x264" /> */}
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Community</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">Trusted Sellers</h2>
            <p className="mt-1">Join a community of trusted buyers and sellers for a smooth experience.</p>
          </div>
        </div>
        <div className="col-md-4 p-4">
          <a className="block relative h-48 rounded overflow-hidden">
            {/* <img alt="Fast Shipping" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/425x265" /> */}
          </a>
          <div className="mt-4">
            {/* <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Shipping</h3> */}
            <h2 className="text-gray-900 title-font text-lg font-medium">Fast & Reliable Delivery</h2>
            <p className="mt-1">Get your orders quickly with our reliable and fast shipping options.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

    </>
  )
}
export default AboutUs;
