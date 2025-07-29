import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { introVideo } from "../../../redux/actions/userAuth-action";
import { AuthLayout } from "../../../components/layout/auth";
import { ModalWrapper } from "../../../components/wrappers/modal";
import { FaSpinner } from "react-icons/fa";

const IntroVideo = () => {
    const { isVideo,isVideoLoading
    } = useSelector((state) => state.auth);
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(false);
    const videoUrl = isVideo?.data?.[0]?.url;
    useEffect(() => {
        dispatch(introVideo());
    }, [dispatch])

    const handleVideoEnd = () => {
        navigate("/dashboard");
    };

    return (
        isVideoLoading? 
         <div className="flex justify-center items-center min-h-screen">
           <FaSpinner className="animate-spin"/>
      </div>:(
        <AuthLayout>
            <ModalWrapper
                isOpen={confirmationModal}
            >
                <div
                    className="relative cursor-pointer "
                >
                    <Link
                        to={"/dashboard"}
                        className="absolute right-2 top-2 bg-white px-4 py-1 rounded-lg font-semibold text-black text-base z-10"
                    >
                        {`Skip >>`}
                    </Link>
                </div>
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[550px] rounded-2xl">
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                        controls
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        autoPlay
                        onEnded={handleVideoEnd}
                    >
                        <source
                            src={videoUrl}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </ModalWrapper>
        </AuthLayout>)
    );
};

export default IntroVideo;

