import { bool, func, object, string } from "prop-types";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImage";
import { putImageIntoFile } from "../../../../utils/imageUtils";

ProjectCropModal.propTypes = {
  setModalState: func,
  modalState: bool,
  imageData: string,
  imageRef: object,
  imageDimensions: object,
  setImagePreview: func,
};
export default function ProjectCropModal({
  modalState,
  setModalState,
  imageData,
  imageRef,
  imageDimensions,
  setImagePreview,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  /**
   * 취소 버튼 클릭시 이미지 input을 초기화시킨다.
   */
  const handleCloseButton = () => {
    setModalState(false);
    // imageRef.current.value = "";
  };

  /**
   * 이미지 자르기 버튼 클릭시
   *
   */
  const handleCompleteButton = async () => {
    try {
      const extension = imageData.substring(
        imageData.indexOf(":") + 1,
        imageData.indexOf(";")
      );
      const { blobUrl: croppedImage, blob } = await getCroppedImg(
        imageData,
        croppedAreaPixels,
        extension
      );
      setImagePreview(croppedImage);
      putImageIntoFile(blob, imageRef);
      setModalState(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className={modalState ? "cropper-modal" : "hidden"}>
      <div className="header">
        <div className="top">
          <h2>대표 이미지</h2>
          <div className="buttons">
            <button type="button" onClick={handleCompleteButton}>
              완료
            </button>
            <button type="button" onClick={handleCloseButton}>
              취소
            </button>
          </div>
        </div>
      </div>
      <div className="cropper">
        <Cropper
          image={imageData}
          crop={crop}
          zoom={zoom}
          aspect={3 / 4}
          minZoom={1}
          maxZoom={5}
          restrictPosition={true}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          objectFit={
            imageDimensions.height / 4 > imageDimensions.width / 3
              ? "horizontal-cover"
              : "vertical-cover"
          }
        />
      </div>
    </div>
  );
}
