'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
 
import { toast } from './ui/use-toast';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
 


const NavBar = () => {
  const[userData, setUserData] = useState([]);
  const[isUserPresent, setIsUserPresent] = useState(false)
  
//geting current user if avalilabel
 useEffect(()=>{
  const getUserDetail = async ()=>{
   try {
     const res = await axios.get('api/me')
    console.log(res)
     setUserData(res.data.data)
    if(res.data.message === 'User found'){
      setIsUserPresent(true)
    }
   
   } catch (error) {
     console.log("error in page",error)
   }
   }
 
    getUserDetail();
  }, [])

// logout functionality 

const logOut = async ()=>{
   const response = await axios.get('api/logout');
   if(!response){
     console.log("logout unsuccessfull", response.message)
     toast({
      title: "Logout Faild !",
      description: response.data.message,
      variant: 'destructive',
     })
   }
   toast({
    title: "Logout Successful !",
    description: response.data.message,
   })
   window.location.reload();
}
console.log(userData)
  return (
    <div className="bg-slate-800 text-white py-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="relative container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">MSRTC Bus Services</h1>
        <nav>
          <ul className="hidden md:flex space-x-4">
            <li>
              <p className="text-white hover:text-yellow-300 transition-transform transform hover:scale-110">
                Create Identity
              </p>
            </li>
            <li>
              <p className="text-white hover:text-yellow-300 transition-transform transform hover:scale-110">
                Bus Pass
              </p>
            </li>
            <li>
              <p className="text-white hover:text-yellow-300 transition-transform transform hover:scale-110">
                Live Tracking
              </p>
            </li>
            <li>
              <p className="text-white hover:text-yellow-300 transition-transform transform hover:scale-110">
                Bus Timing
              </p>
            </li>
          </ul>
        </nav>
        {isUserPresent?
         <NavigationMenu>
         <NavigationMenuList>
           <NavigationMenuItem>
             <NavigationMenuTrigger className="text-black">Hello {userData.username} </NavigationMenuTrigger>
             <NavigationMenuContent>
               <div >
                 <ul className='flex flex-col gap-5 py-6 px-10  text-left'>  
               
               
               <NavigationMenuLink>
                 <Button
                 onClick={(e)=>{e.preventDefault(); logOut()}}
                 className="bg-black text-white rounded-md hover:bg-gray-700">
                    Logout
                 </Button>
               </NavigationMenuLink>
               </ul>
               </div>
             </NavigationMenuContent>
           </NavigationMenuItem>
         </NavigationMenuList>
       </NavigationMenu>:
        <Link href="/sign-up">
          <Button className="bg-white text-slate-800 py-2 px-4 rounded-md hover:bg-slate-100">
            Sign Up
          </Button>
        </Link>
  
        
        }
      </div>
    </div>
  );
};

export default NavBar;
