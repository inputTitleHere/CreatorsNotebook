/**
 * new Image()으로 생성한 객체를 ref에 명시된 input[type:file]에 다시 등록한다.
 * @param {HTMLImageElement} blob : 잘린 이미지 Blob.
 * @param {import("react").MutableRefObject} imageRef : input[type:file]의 레퍼런스.
 */
export function putImageIntoFile(blob, imageRef) {
  const newImageFile = new File([blob], "cover.jpg", {
    type: "image/jpeg",
  });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(newImageFile);
  imageRef.current.files = dataTransfer.files;
}

/**
 * 이미지 클릭시 이미지 중간으로 스크롤
 */
export function centerImageToScreenOnClick(event) {
  event.target.scrollIntoView({
    block: "center",
    inline: "center",
  });
}

/**
 * TODO
 * 이미지 경로
 */
export const IMAGE_DIRECTORY = "/test-image/";

/**
 * 이미지 최대 크기
 * 단위는 MB.
 */
export const IMAGE_LIMIT = 10;