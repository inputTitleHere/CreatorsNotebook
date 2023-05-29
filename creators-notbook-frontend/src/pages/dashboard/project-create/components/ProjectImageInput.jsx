import { useRef, useState } from "react";
import ProjectCropModal from "./ProjectCropModal";
import { Button } from "@mui/material";

/**
 * 프로젝트 생성시 대표 이미지 설정에 관한 처리를 수행하는 컴포넌트
 */
export default function ProjectImageInput() {
  const [imageCropModalState, setImageCropModalState] = useState(false);
  const [imageDimensions, setImageDimensions]=useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);

  const handleUploadButton = () => {
    imageInputRef.current.click();
  };

  /**
   * 사진을 브라우저에 업로드하는 경우 이미지 Crop modal을 연다.
   */
  const handleFileInput = (event) => {
    setImagePreview(null);
    const reader = new FileReader();
    if (event.target.files[0]) {
      if (event.target.files[0].size > 1024 ** 2 * 5) {
        alert("이미지 크기는 5MB 이하만 가능합니다!");
        event.target.value="";
        return;
      }
      if(!/\.(png|jpe?g)$/i.test(event.target.files[0].name)){
        alert("이미지 형식(png, jpg, jpeg)만 가능합니다!");
        event.target.value="";
        return;
      }
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        const img = new Image();
        img.src=event.target.result;
        img.onload=()=>{
          setImage(reader.result);
          setImageDimensions({height:img.height, width:img.width});
          setImageCropModalState(true);
        }
      };
    }
  };

  return (
    <>
      <label htmlFor="image-input" className="label-with-object">
        <span>프로젝트 대표 이미지</span>
        <Button variant="contained" onClick={handleUploadButton}>
          신규 이미지 업로드
        </Button>
      </label>
      <input
        type="file"
        name="file"
        id="image-input"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileInput}
        ref={imageInputRef}
        style={{ display: "none" }}
      />
      <div className="modal-wrapper">
        <ProjectCropModal
          modalState={imageCropModalState}
          setModalState={setImageCropModalState}
          imageData={image}
          imageRef={imageInputRef}
          imageDimensions={imageDimensions}
          setImagePreview={setImagePreview}
        />
      </div>
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="프로젝트 이미지 대표" />
        </div>
      )}
    </>
  );
}
