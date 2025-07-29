import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginTokenFlow } from '../../redux/actions/logintokenflow-action';
import { getUser } from '../../redux/actions/dashboard-action';

// tertet
const LoginToken = () => {
    const [searchParams, setSearchParams] = useSearchParams();
  const querytoken = searchParams.get("token")
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  if(querytoken )

  dispatch(loginTokenFlow({ token: querytoken})).unwrap().then((res)=>{
    console.log(res, "response "); 
    if(res.code !== 200){
      navigate('/sign-in')
    }
    // else{
    //   dispatch(getUser(res?.data?.[0]?.token));
    // }
    
  });
  
}

export default LoginToken