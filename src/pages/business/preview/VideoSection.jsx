import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ModalWrapper } from "../../../components/wrappers/modal";
// Handler hook for when Outside click dropdown close
let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode;
};
 

const Video = () => {
  const [videoOpen, setvideoOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setvideoOpen(false);
  });

  const data=[{link:"https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1"},
    {link:"https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1"},
    {link:"https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1"},
    {link:"https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1"},
    {link:"https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1"}
  ]
  return (
    <section >
      <div ref={domNode} className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-10/12">
            <div className="relative z-20 h-[300px] overflow-hidden rounded-lg md:h-[200px]">
              <div className="absolute left-0 top-0 h-full w-full">
                <img
                  src="https://i.ibb.co/KbSwcWJ/image-01-1.jpg"
                  alt="bg"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div
                className={`absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-primary bg-opacity-90`}
              >
                <Link
                  href="https://www.youtube.com/watch?v=XR6OaznDwl8"
                  onClick={() => setvideoOpen(true)}
                  className="absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary dark:bg-dark-2 dark:text-white md:h-[60px] md:w-[60px]"
                >
                  <span className="absolute right-0 top-0 z-[-1] h-full w-full animate-ping rounded-full bg-white bg-opacity-20 delay-300 duration-1000"></span>
                  <svg
                    width="23"
                    height="27"
                    viewBox="0 0 23 27"
                    className="fill-current"
                  >
                    <path d="M22.5 12.634C23.1667 13.0189 23.1667 13.9811 22.5 14.366L2.25 26.0574C1.58333 26.4423 0.750001 25.9611 0.750001 25.1913L0.750002 1.80866C0.750002 1.03886 1.58334 0.557731 2.25 0.942631L22.5 12.634Z" />
                  </svg>
                </Link>
              </div>

              <div>
                <span className="absolute left-4 top-4 z-40">
                  <svg
                    width="50"
                    height="79"
                    viewBox="0 0 50 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="47.7119"
                      cy="76.9617"
                      r="1.74121"
                      transform="rotate(180 47.7119 76.9617)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="61.6385"
                      r="1.74121"
                      transform="rotate(180 47.7119 61.6385)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="46.3163"
                      r="1.74121"
                      transform="rotate(180 47.7119 46.3163)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="16.7159"
                      r="1.74121"
                      transform="rotate(180 47.7119 16.7159)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="31.3421"
                      r="1.74121"
                      transform="rotate(180 47.7119 31.3421)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="1.74121"
                      r="1.74121"
                      transform="rotate(180 47.7119 1.74121)"
                      fill="white"
                    />
                    <circle
                      cx="32.3916"
                      cy="76.9617"
                      r="1.74121"
                      transform="rotate(180 32.3916 76.9617)"
                      fill="white"
                    />
                    <circle
                      cx="32.3877"
                      cy="61.6384"
                      r="1.74121"
                      transform="rotate(180 32.3877 61.6384)"
                      fill="white"
                    />
                    <circle
                      cx="32.3916"
                      cy="46.3162"
                      r="1.74121"
                      transform="rotate(180 32.3916 46.3162)"
                      fill="white"
                    />
                    <circle
                      cx="32.3916"
                      cy="16.7161"
                      r="1.74121"
                      transform="rotate(180 32.3916 16.7161)"
                      fill="white"
                    />
                    <circle
                      cx="32.3877"
                      cy="31.342"
                      r="1.74121"
                      transform="rotate(180 32.3877 31.342)"
                      fill="white"
                    />
                    <circle
                      cx="32.3916"
                      cy="1.74145"
                      r="1.74121"
                      transform="rotate(180 32.3916 1.74145)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="76.9617"
                      r="1.74121"
                      transform="rotate(180 17.0674 76.9617)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="61.6384"
                      r="1.74121"
                      transform="rotate(180 17.0674 61.6384)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="46.3162"
                      r="1.74121"
                      transform="rotate(180 17.0674 46.3162)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="16.7161"
                      r="1.74121"
                      transform="rotate(180 17.0674 16.7161)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="31.342"
                      r="1.74121"
                      transform="rotate(180 17.0674 31.342)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="1.74145"
                      r="1.74121"
                      transform="rotate(180 17.0674 1.74145)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="76.9617"
                      r="1.74121"
                      transform="rotate(180 1.74316 76.9617)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="61.6384"
                      r="1.74121"
                      transform="rotate(180 1.74316 61.6384)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="46.3162"
                      r="1.74121"
                      transform="rotate(180 1.74316 46.3162)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="16.7161"
                      r="1.74121"
                      transform="rotate(180 1.74316 16.7161)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="31.342"
                      r="1.74121"
                      transform="rotate(180 1.74316 31.342)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="1.74145"
                      r="1.74121"
                      transform="rotate(180 1.74316 1.74145)"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className="absolute bottom-4 right-4 z-40">
                  <svg
                    width="50"
                    height="79"
                    viewBox="0 0 50 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="47.7119"
                      cy="76.9617"
                      r="1.74121"
                      transform="rotate(180 47.7119 76.9617)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="61.6385"
                      r="1.74121"
                      transform="rotate(180 47.7119 61.6385)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="46.3163"
                      r="1.74121"
                      transform="rotate(180 47.7119 46.3163)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="16.7159"
                      r="1.74121"
                      transform="rotate(180 47.7119 16.7159)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="31.3421"
                      r="1.74121"
                      transform="rotate(180 47.7119 31.3421)"
                      fill="white"
                    />
                    <circle
                      cx="47.7119"
                      cy="1.74121"
                      r="1.74121"
                      transform="rotate(180 47.7119 1.74121)"
                      fill="white"
                    />
                    <circle
                      cx="32.3916"
                      cy="76.9617"
                      r="1.74121"
                      transform="rotate(180 32.3916 76.9617)"
                      fill="white"
                    />
                    <circle
                      cx="32.3877"
                      cy="61.6384"
                      r="1.74121"
                      transform="rotate(180 32.3877 61.6384)"
                      fill="white"
                    />
                    <circle
                      cx="32.3916"
                      cy="46.3162"
                      r="1.74121"
                      transform="rotate(180 32.3916 46.3162)"
                      fill="white"
                    />
                    <circle
                      cx="32.3916"
                      cy="16.7161"
                      r="1.74121"
                      transform="rotate(180 32.3916 16.7161)"
                      fill="white"
                    />
                    <circle
                      cx="32.3877"
                      cy="31.342"
                      r="1.74121"
                      transform="rotate(180 32.3877 31.342)"
                      fill="white"
                    />
                    <circle
                      cx="32.3916"
                      cy="1.74145"
                      r="1.74121"
                      transform="rotate(180 32.3916 1.74145)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="76.9617"
                      r="1.74121"
                      transform="rotate(180 17.0674 76.9617)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="61.6384"
                      r="1.74121"
                      transform="rotate(180 17.0674 61.6384)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="46.3162"
                      r="1.74121"
                      transform="rotate(180 17.0674 46.3162)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="16.7161"
                      r="1.74121"
                      transform="rotate(180 17.0674 16.7161)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="31.342"
                      r="1.74121"
                      transform="rotate(180 17.0674 31.342)"
                      fill="white"
                    />
                    <circle
                      cx="17.0674"
                      cy="1.74145"
                      r="1.74121"
                      transform="rotate(180 17.0674 1.74145)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="76.9617"
                      r="1.74121"
                      transform="rotate(180 1.74316 76.9617)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="61.6384"
                      r="1.74121"
                      transform="rotate(180 1.74316 61.6384)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="46.3162"
                      r="1.74121"
                      transform="rotate(180 1.74316 46.3162)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="16.7161"
                      r="1.74121"
                      transform="rotate(180 1.74316 16.7161)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="31.342"
                      r="1.74121"
                      transform="rotate(180 1.74316 31.342)"
                      fill="white"
                    />
                    <circle
                      cx="1.74316"
                      cy="1.74145"
                      r="1.74121"
                      transform="rotate(180 1.74316 1.74145)"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {videoOpen && (
        <ModalWrapper onClick={() => setvideoOpen(false)} video={true}>
 
          <div className="  bg-white">
            <>
              <iframe
                className=" h-[500px] w-[500px]"
                src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1"
              />
            </>
          </div>    
         
        </ModalWrapper>
      
      )}
    </section>
  );
};

export default Video;
