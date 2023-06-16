import { object } from "prop-types";
import { useState } from "react";

const TITLE_LIMIT = 50;

ProjectTextInput.propTypes = {
  refs: object,
};
export default function ProjectTextInput({ refs }) {
  const [titleInput, setTitleInput] = useState("");
  const { titleRef, descriptionRef } = refs;

  const handleTitleChange = (event) => {
    const titleStr = event.target.value;
    if (titleStr.length > TITLE_LIMIT) {
      setTitleInput(titleInput.substring(0, TITLE_LIMIT));
    } else {
      setTitleInput(titleStr);
    } 
  };

  return (
    <>
      <label htmlFor="title">
        <span>프로젝트 제목</span>
        <span>
          {titleInput.length}/{TITLE_LIMIT}
        </span>
      </label>
      <input
        type="text"
        name="title"
        id="title"
        onChange={handleTitleChange}
        value={titleInput}
        ref={titleRef}
      />
      <label htmlFor="description">프로젝트 설명</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        ref={descriptionRef}
      ></textarea>
    </>
  );
}
