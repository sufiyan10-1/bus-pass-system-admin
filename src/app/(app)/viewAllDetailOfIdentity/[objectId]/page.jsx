'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import dbConnect from '@/lib/dbConnect';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { resolve } from 'styled-jsx/css';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';


const Page = () => {
  const [identityData, setIdentityData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectReason, setRejectReason] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  
  useEffect(() => {
    // Extract the last segment of the URL to get the objectId
  const urlParams = new URLSearchParams(window.location.pathname.split('/').pop());
  let objectIdFromUrl = urlParams.toString();
  objectIdFromUrl = objectIdFromUrl.substring(0, objectIdFromUrl.length - 1); // Adjust if there's an extra character

    if (!objectIdFromUrl) return;

    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Make a GET request to the API with the objectId
 
        const response = await axios.get(`/api/view_all_detail_ofIdentity?objectId=${objectIdFromUrl}`);
        setIdentityData(response.data.message || []);
      } catch (error) {
        console.error('Error fetching identities:', error);
      }
    };

    fetchData();

    
    
  
  }, []);

  const urlParams = new URLSearchParams(window.location.pathname.split('/').pop());
  let objectIdFromUrl = urlParams.toString();
  objectIdFromUrl = objectIdFromUrl.substring(0, objectIdFromUrl.length - 1); // Adjust if there's an extra character
 
  const  acceptApplication = async ()=>{
    try {
    const response = await axios.get(`/api/accept_application_button?objectId=${objectIdFromUrl}`); 
 
    if(response.data){
      toast({
        title: "Success !",
        description: "Application Accepted Successful"
      })
      router.push('/')
    } 
    else{
    toast({
      title: "Faild!",
      description: "Application Acceptation faild",
      variant: 'destructive'
    })
    router.push('/identity-check')
   }
   } catch (error) {
      console.error('Error while accept Application:', error);
      toast({
        title: "Faild!",
        description: "Unaccepted Error Occuer",
        variant: 'destructive'
      })
    }
  }
 

  const rejectApllication = async ()=>{
    const formData = new FormData();
    formData.append('rejectReason', rejectReason);
    formData.append('objectId', objectIdFromUrl);
    try {
    const response = await axios.post(`/api/reject_appliction_button`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response)
    if(response.data){
      toast({
        title: "Success !",
        description: "Application Rejected Successful"
      })
      router.push('/')
    }
    else{
      toast({
        title: "Success !",
        description: "Application Rejected Successful",
        variant: 'destructive'
      })
    }
    } catch (error) {
      console.error('Error while reject Application:', error);
    }
  }
 

  // Return the JSX to render the page
  return (
    <div className='mx-32 my-7'>
      <div className="flex flex-col items-center">
        <h3 className="text-3xl md:text-xl font-semibold leading-7 text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and Documents</p>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Render each piece of identity data */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{identityData.studentName}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{identityData.studentAddress}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">College or School Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{identityData.nameOfCollegeOrSchool}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address of School or College</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Need to add all address in module</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Student Class</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{identityData.studClass}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Distance</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className='font-bold mx-4'>From:</span> {identityData.distanceFrom} 
              <span className='font-bold mx-4'>To:</span> {identityData.distanceTo}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Student Photo</dt>
            <img src={identityData.studentPhoto} alt="Student Photo"/>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Student Sign</dt>
            <img src={identityData.studentSign} alt="Student Sign"/>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Student Aadhar Card</dt>
            <img src={identityData.aadharCard} alt="Student Aadhar Card"/>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Student Bonafied certificate</dt>
            <img src={identityData.bonafied} alt="Student Bonafied certificat"/>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Student Fees Receipt</dt>
            <img src={identityData.feesRecipt} alt="Student Fees Receipt"/>
          </div>
        </dl>
        <div className="flex flex-row justify-center gap-8">
         
        <div className="dialog">
  <button className="bg-red-500 py-2 px-6 rounded-sm text-white hover:bg-red-700" onClick={() => setIsOpen(true)}>Reject</button>

  {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-md shadow-lg transform transition-all duration-300 ease-in-out scale-95 opacity-100">
            <h2 className="text-lg font-semibold mb-4">Why do you want to reject this application?</h2>
            <input
              type="text"
              name="rejectReason"
              placeholder="Enter reason"
              required
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 py-2 px-4 text-white rounded-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                onClick={(e) => {
                  e.preventDefault();
                  rejectApllication();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

</div>

          <button 
           onClick={(e)=>{
            e.preventDefault()
            acceptApplication() 
          }} 
          className="bg-green-500 py-2 px-6 rounded-sm text-white hover:bg-green-700">All Ok, Verified
          </button>

        </div>
      </div>
    </div>
  );
}

export default Page;
