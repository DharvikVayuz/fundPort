// import { verifyUser, veri } from '@/redux/admin/actions/UserManagement';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUserFormTable } from '../../../redux/actions/userAuth-action';
const VerifyUser = () => {

    const dispatch = useDispatch()
    const {userId} = useParams(); 
    const navigate = useNavigate();
    const verifyUser = () => {
       
        dispatch(verifyUserFormTable({ userId: userId }))
      }

      useEffect(()=>{
        verifyUser()
        // navigate(`/admin/`);
      }, [])
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
        <p className='text-lg font-bold'>Verifying your account, please wait...</p>
    </div>
  );
};

export default VerifyUser;
