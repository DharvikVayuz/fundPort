import React, { useEffect } from 'react'
import { MainTab } from '../components'
import { Outlet, useSearchParams } from 'react-router-dom';
import BasicDetails from '../BasicDetails';
import CreateSteps from '../Steps/StepsForm';
import ServiceFaqs from '../ServiceFAQs';
import AddSubscriptions from '../Subscriptions/SubscriptionsForm';
import ServiceVideos from '../ServiceVideos';
import ServiceTestimonials from '../Testimonials';
const ServiceForm = () => {
    // const [searchParams] = useSearchParams({});

    // const switchTab = () => {
    //     switch(searchParams.get('tab')){
    //         case 'basic-details':
    //             return <BasicDetails/>;
    //         case 'service-steps':   
    //             return <CreateSteps/>;
    //         case 'service-subscriptions':
    //             return <AddSubscriptions/>;
    //         case 'service-faqs':
    //             return <ServiceFaqs/>;
    //         case 'service-videos':
    //             return <ServiceVideos/>;
    //         case 'service-testimonials':
    //             return <ServiceTestimonials/>;
    //         default:
    //             return <BasicDetails/>
    //     }
    // }
    // useEffect(() => {
    //     switchTab();
    // }, [searchParams.get('tab')]);
  return (
    <div>
        <MainTab/>
        {/* {switchTab()} */}
        <Outlet/>
    </div>
  )
}

export default ServiceForm