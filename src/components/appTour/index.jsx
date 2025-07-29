import React, { useState } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useDispatch, useSelector } from 'react-redux';
import { setTourOpen, setCurrentStep } from '../../redux/slices/appTourSlice';
import { useNavigate } from 'react-router-dom';
 
export default function TourComponent({isTourOpen, steps, styles, isHidden, path}) {
  const [run, setRun] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleClickStart = () => {
    setRun(!run);
    dispatch(setTourOpen(true)); // Open tour
  };

  
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
  
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      dispatch(setCurrentStep(index + (action === ACTIONS.PREV ? -1 : 1)));
    } else if ([STATUS.FINISHED].includes(status)) {
      setRun(false);
      dispatch(setTourOpen(false));
      localStorage.setItem("isTourVisible", false);
      if (path && path !== "undefined") {
        navigate(`${path}`); // Replace '/next-page' with your target route
      }
    } else if (status === STATUS.SKIPPED) {
      setRun(false);
      dispatch(setTourOpen(false));
      localStorage.setItem("isTourVisible", false);
      // No navigation when skipped
    }
  
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  };
  
  // Custom Button Styles
  const customButtonStyles = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px'
  };

  return (
    <div>
       <Joyride
      key={path}
      steps={steps}
      run={isTourOpen}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      disableOverlayClose={true}
      scrollOffset={120}
      styles={{
        options: {
          zIndex: 1001,
          primaryColor: "#0A1C40",
        },
        overlay: {
          zIndex: 1001,
        },
      }}
    />

    </div>
  );
}
