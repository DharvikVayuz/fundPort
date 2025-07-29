import { Button } from "../../../../../../components/buttons/button"
import React, { useState, useEffect, useRef } from 'react'
import { ImSpinner2 } from 'react-icons/im';

const VideoPlayer = ({ open, handleOpen, title, handleConfirm, url, loading, buttonContent, onFileChange }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(url || "");
    const [error, setError] = useState("");
    const [cancelFileChange, setCancelFileChnage] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const maxFileSize = 1 * 1024 * 1024;
        if (file) {
            const fileName = file.name;
            const idxDot = fileName.lastIndexOf(".") + 1;
            const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            const validFileExtensions = ["mp4", "mov", "avi", "webm"]
            if (!validFileExtensions.includes(extFile)) {
                event.target.value = '';
                setError("Please select an MP4,MOV,AVI or WEBM video file.");
                return;
            } else if (file.size > maxFileSize) {
                event.target.value = '';
                setError("File size cannot be greater than 1 Mb.");
                return;
            }

            const newUrl = URL.createObjectURL(file);
            setVideoFile(file);
            setVideoUrl(newUrl);
            setError("");
            // onFileChange(file);
        }
    };
    const handleSvgClick = () => {
        fileInputRef.current.click();
    };
    const handleChooseAnotherFile = () => {
        if (videoUrl && !url) {  // Only revoke the object URL if it's not the initial provided URL
            URL.revokeObjectURL(videoUrl);
        }
        setCancelFileChnage(true)
        setVideoUrl("");
        setVideoFile(null);
        setError("");
    };

    const handleCancelFileChange = () => {
        setVideoUrl(url);
        setVideoFile(null)
        setCancelFileChnage(false)
    }

    const confirmUpload = () => {
        if (videoFile) {
            handleConfirm(videoFile);
        }
    };

    useEffect(() => {
        return () => {
            setError("");
        };
    }, [handleOpen]);
    useEffect(() => {
        if (!open) {
            // Reset the state only when the modal is closing
            // setVideoFile(null);
            setVideoUrl(url);
            setError("");
            setCancelFileChnage(false);
        }
    }, [open, url]);
    return (
        <>
            <div>{videoUrl ? (
                <>
                    <video className="mt-4 w-full h-64" controls>
                        <source src={videoUrl} type={videoFile?.type || `video/mp4`} />
                    </video>
                </>
            ) : (
                <>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="video/*"
                        onChange={handleFileChange}
                        className="cursor-pointer w-full hidden"
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                    <div onClick={handleSvgClick} className="flex cursor-pointer flex-col items-center mt-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="mt-2 text-gray-600">No video selected</p>
                    </div>
                </>
            )}</div>
            <div className="mt-2 flex justify-end items-center gap-2">
                {(videoFile || url) && !loading && !cancelFileChange && ( // Show this only if it's not the initial provided URL
                    <Button onClick={handleChooseAnotherFile} outline={true}
                        color="red">
                        Choose Another File
                    </Button>
                )}
                {cancelFileChange && !loading && !videoFile && <Button outline="true" color="green" onClick={handleCancelFileChange}>
                    <span>Cancel</span>
                </Button>}
                {(videoFile || url) && (
                    <Button
                    primary={true}
                        disabled={loading}
                        onClick={confirmUpload}
                    >
                        {loading ? (
                            <>
                                <ImSpinner2 className="animate-spin text-white !text-xl" /> {buttonContent ? buttonContent : "Uploading"}
                            </>
                        ) : (
                            buttonContent ? buttonContent : "Upload"
                        )}
                    </Button>
                )}
            </div></>
    )
}

export default VideoPlayer