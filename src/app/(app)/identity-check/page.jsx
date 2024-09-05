'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Page() {
  const [pendingIdentities, setPendingIdentities] = useState([])

  const router = useRouter()


  async function fetchIdentities() {
    try {
      const response = await axios.get('/api/get-pending-identities')
      setPendingIdentities(response.data.message || [])
    } catch (error) {
      console.error('Error fetching identities:', error)
       
    }
  }


  async function viewAllDetail(objectId) {
      try {
      router.replace(`viewAllDetailOfIdentity/${objectId}`);

      
    } catch (error) {
        console.error('Error fetching viewAllDetailOfIdentity page:', error)
      }
  }
 
  return (
    <div>
      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault()
          fetchIdentities()
        }}
      >
        Refresh
      </Button>
      <ul className='flex flex-row flex-wrap'>
        {pendingIdentities.map((pendingIdentity) => (
          <li key={pendingIdentity._id} className='p-2 border border-gray-300 m-2'>
            <p><strong>Student Name:</strong> {pendingIdentity.studentName}</p>
            <p><strong>Address:</strong> {pendingIdentity.studentAddress}</p>
            <p><strong>DOB:</strong> {pendingIdentity.studentDOB}</p>
            <p><strong>School/College:</strong> {pendingIdentity.nameOfCollegeOrSchool}</p>
            <Button className="mt-4"variant="outline"
            onClick={(e) => {
              e.preventDefault()
              viewAllDetail(pendingIdentity._id)
            }}>view all</Button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Page
