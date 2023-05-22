import { object } from "prop-types";
import { IMAGE_DIRECTORY } from "../../../../utils/imageUtils";
import ProjectAuthComponent from "./ProjectAuthComponent";
import ProjectOptionButton from "./ProjectOptionButton";
import noImage from "../../../../assets/icons/no-pictures.png";

ProjectItemComponent.propTypes = {
  data: object,
};

export default function ProjectItemComponent({ data }) {
  const dateOfWeekList = ["일", "월", "화", "수", "목", "금", "토"];
  const editDateObject = new Date(data.editDate);

  return (
    <div className="project-item">
      <div className="image-wrapper">
        {data.image ? (
          <img src={IMAGE_DIRECTORY + data.image} alt="" />
        ) : (
          <img src={noImage} alt="noimage" />
        )}
      </div>
      <div className="mid">
        <h3>{data.title}</h3>
      </div>
      <div className="bottom-section">
        <div className="top">
          <div className="edit-date">
            최종수정 :{" "}
            {`${editDateObject.getFullYear()}년 ${editDateObject.getMonth()}월 ${editDateObject.getDate()}일 [${
              dateOfWeekList[editDateObject.getDay()]
            }]`}
          </div>
        </div>
        <div className="bottom">
          <ProjectAuthComponent authority={data.authority} />
          <ProjectOptionButton authority={data.authority} />
        </div>
      </div>
    </div>
  );
}
