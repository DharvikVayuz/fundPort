
const getCroppedImg = async (imageSrc, crop, pixelCrop) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Enable CORS
    image.src = imageSrc;
  
    await new Promise((resolve) => {
      image.onload = resolve;
    });
  
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");
  
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

export default getCroppedImg