
/**
 * new Image()으로 생성한 객체를 ref에 명시된 input[type:file]에 다시 등록한다.
 * @param {HTMLImageElement} blob : 잘린 이미지 Blob. 
 * @param {import("react").MutableRefObject} imageRef : input[type:file]의 레퍼런스.
 */
export function putImageIntoFile(blob, imageRef){
  const newImageFile = new File([blob],'cover.jpg',{
    type:"image/jpeg"
  })
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(newImageFile);
  imageRef.current.files=dataTransfer.files;
}