// import { Outlet } from "react-router-dom";
// import { useLocation,Navigate } from "react-router-dom";
// export const IsLoggedInWrapper = () => {
//   const location = useLocation();
//   let userInfo=null
//   try {
//    userInfo=JSON.parse(localStorage.getItem('userInfo'))?.token;
//   } catch (error) {
//     userInfo=null;
//   }
//   let signedInFlag=userInfo.token
//   if (signedInFlag&&userInfo&&(location.pathname.includes('sign-in')||location.pathname.includes('sign-up')||location.pathname.includes('forgot-password')||location.pathname.includes('verify'))) {
//     return <Navigate to="/dashboard" />;
//   }
//   return <Outlet />;
// };

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

export const IsLoggedInWrapper = () => {
  const location = useLocation();
  const [signedInFlag, setSignedInFlag] = useState(false);

// const isSignedIn = sessionStorage.getItem('signedIn')
// console.log(localStorage.getItem('signedIn'))


// useEffect(() => {
  //   if (!isSignedIn) {
  //     let userInfo = null;
  //     try {
  //       userInfo = JSON.parse(localStorage.getItem('userInfo'))?.token;
  //       localStorage.removeItem('userInfo');
  //     } catch (error) {
  //       userInfo = null;
  //     }
  //   }
  // }, [isSignedIn]);
  useEffect(() => {
    let userInfo = null;
    try {
      userInfo = JSON.parse(localStorage.getItem('userInfo'))?.token;
    } catch (error) {
      userInfo = null;
    }
  
    setSignedInFlag(!!userInfo);
  }, []); 

  // console.log(signedInFlag,"signedInFlag");
  // console.log(location.pathname.includes('verfiy'),"path");
  
  // if (!signedInFlag && location.pathname.includes('verify')) {
  //   return <Navigate to="/sign-in" />;
  // }

  if (signedInFlag && (location.pathname.includes('sign-in') || location.pathname.includes('sign-up') || location.pathname.includes('forgot-password') || location.pathname.includes('verify'))) {
    return <Navigate to="/dashboard" />;
  }

  //console.log((signedInFlag && (location.pathname.includes('verfiy')));
  // if (signedInFlag && (location.pathname.includes('verfiy') )) {
    
  //   return <Navigate to="sign-in" />;
  // }
  return <Outlet />;
};

