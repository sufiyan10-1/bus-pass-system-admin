"use client"

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Loader2 } from "lucide-react";

const MSRTCServices = () => {
  const [pendingIdentities, setPendingIdentities] = useState([])
  const [isUserPresent, setIsUserPresent] = useState('');
  const router = useRouter()
 //get current user
 
 

 useEffect(() => {
   const getUserDetail = async () => {
     try {
       const res = await axios.get('api/me');
       console.log(res.data);

       if (res.data.message === 'User found') {
         setIsUserPresent('User found');
       }
     } catch (error) {
       console.log("error in page", error);
       setIsUserPresent('User not found');
     }
   };

   getUserDetail();
 }, []); // No dependency array or empty array

//fatching identities  
  useEffect(()=>{
  async function fetchIdentities() {
    try {
      const response = await axios.get('/api/get-pending-identities')
      setPendingIdentities(response.data.message || [])
    } catch (error) {
      console.error('Error fetching identities:', error)
       
    }
  }
    fetchIdentities();
  }, [])
  
  //view all detial of identity button 
  async function viewAllDetail(objectId) {
    try {
    router.replace(`viewAllDetailOfIdentity/${objectId}`);    
  } catch (error) {
      console.error('Error fetching viewAllDetailOfIdentity page:', error)
    }
  }
 const userLoginOrNot = ()=>{
  if(isUserPresent === ''){
    return ( <Loader2 className='animate-spin w-24 h-24'/>)
  }
  else if(isUserPresent === 'User found'){
    return(
      <div className="min-h-screen bg-gray-50 mt-20">
      <div>
      <div className="text-center my-4">
        <h1 className="text-2xl font-bold">IDENTITY REQUEST</h1>
      </div>

      {/* Top Bar */}
      <div className="bg-gray-50 min-h-screen">
  {/* Header Section */}
  <section className="flex justify-around items-center bg-gray-900 text-white py-3 rounded-lg shadow-md">
    <div className="font-bold hover:text-blue-500 transition-transform">
      Card ID
    </div>
    <div className="font-bold hover:text-blue-500 transition-transform">
      Name
    </div>
    <div className="font-bold hover:text-blue-500 transition-transform">
      Date of Birth
    </div>
    <div className="font-bold hover:text-blue-500 transition-transform">
      Address
    </div>
  </section>

  {/* Data Section */}
  <section className="bg-gray-50 p-4">
    <ul className="flex flex-col space-y-4">
      {pendingIdentities.map((pendingIdentity) => (
        <li
          key={pendingIdentity._id}
          className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:gap-10 gap-2">
            <p className="text-gray-600">{pendingIdentity.IdNumber}</p>
            <p className="font-semibold text-gray-700">{pendingIdentity.studentName}</p>
            <p className="text-gray-600">{pendingIdentity.studentDOB}</p>
            <p className="text-gray-600">{pendingIdentity.studentAddress}</p>
          </div>
          <button
            className="mt-4 md:mt-0 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              viewAllDetail(pendingIdentity._id);
            }}
          >
            View All
          </button>
        </li>
      ))}
    </ul>
  </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 mt-8">
        <div className="flex justify-around mb-4">
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-blue-500">
              Home
            </a>
            <a href="#" className="hover:text-blue-500">
              About Us
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact Us
            </a>
            <a href="#" className="hover:text-blue-500">
              FAQs
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-blue-500">
              E-Pass Application
            </a>
            <a href="#" className="hover:text-blue-500">
              Tracking System
            </a>
            <a href="#" className="hover:text-blue-500">
              Document Upload
            </a>
            <a href="#" className="hover:text-blue-500">
              E-Pass Validity
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-blue-500">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500">
              User Guide
            </a>
            <a href="#" className="hover:text-blue-500">
              Support
            </a>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-white hover:text-blue-500">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © 2024 Government Bus E-Pass Generation. All rights reserved.
        </p>
      </footer>
       </div> 
    </div>
    )
  }
  else{
    return(
      <div>
        {router.push('/sign-in')}
      </div>
    )
  }
 }
 return (
   <div>
    {userLoginOrNot()}
   </div>
  );
};

export default MSRTCServices;
