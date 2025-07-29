import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../../../components/buttons/button';
import VideoPlayer from './Components/VideoPlayer';
import { uploadVideo } from '../../../../redux/admin/actions/services';
// import { updateDeliverableVideo, updateStepVideo, updateDocumentVideo } from '../../../../redux/slices/videoSlice';

const ServiceVideos = () => {
  const dispatch = useDispatch();

  // Select video URLs from Redux state
  const {delivrableVideoUrl, stepsVideoUrl,documentVideoUrl, uploadLoading } = useSelector((state) => state.adminService);
  // const stepVideoUrl = useSelector((state) => state.video.stepVideoUrl);
  // const documentVideoUrl = useSelector((state) => state.video.documentVideoUrl);

  // Handle confirm upload for each video type
  const handleDeliverableConfirm = (file) => {
    console.log("called")
    console.log(file, "deliverable vieo file")
    const formData = new FormData()

    formData.append("files", file)
    dispatch(uploadVideo(formData, "deliverable"));
  };

  const handleStepConfirm = (file) => {
    const videoUrl = URL.createObjectURL(file);
    // dispatch(updateStepVideo(videoUrl));
    console.log("called")
    const formData = new FormData()

    formData.append("files", file)
    dispatch(uploadVideo(formData, "step"));
  };

  const handleDocumentConfirm = (file) => {
    const videoUrl = URL.createObjectURL(file);
    // dispatch(updateDocumentVideo(videoUrl));
    const formData = new FormData()

    formData.append("files", file)
    dispatch(uploadVideo(formData, "document"));
  };

  return (
    <div>
      <section className="mb-8 bg-gray-50">
        <h6 className="text-lg font-semibold mb-2">
          Upload Deliverable Video
          <span className="ml-2 text-sm text-gray-500">(Optional)</span>
        </h6>
        <VideoPlayer
           // Assuming the modal is always open; adjust as needed
          title="Deliverable Video"
          url={delivrableVideoUrl}
          handleConfirm={handleDeliverableConfirm}
          buttonContent="Upload Deliverable"
        />
        <Button primary={true} isLoading={uploadLoading?.deliverable}>Deliverable Video</Button>
      </section>

      <section className="mb-8 bg-gray-50">
        <h6 className="text-lg font-semibold mb-2">
          Upload Steps Video
          <span className="ml-2 text-sm text-gray-500">(Optional)</span>
        </h6>
        <VideoPlayer
          
          title="Steps Video"
          url={stepsVideoUrl}
          handleConfirm={handleStepConfirm}
          buttonContent="Upload Steps"
        />
        <Button primary={true} isLoading={uploadLoading?.step}>Steps Video</Button>
      </section>

      <section className="bg-gray-50">
        <h6 className="text-lg font-semibold mb-2">
          Upload Document Video
          <span className="ml-2 text-sm text-gray-500">(Optional)</span>
        </h6>
        <VideoPlayer
          
          title="Document Video"
          url={documentVideoUrl}
          handleConfirm={handleDocumentConfirm}
          buttonContent="Upload Document"
        />
        <Button primary={true} isLoading={uploadLoading?.document}>Document Video</Button>
      </section>
    </div>
  );
};

export default ServiceVideos;
