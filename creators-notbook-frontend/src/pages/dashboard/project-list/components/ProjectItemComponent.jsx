import { object } from "prop-types";
import { IMAGE_DIRECTORY } from "../../../../utils/imageUtils";
import ProjectAuthComponent from "./ProjectAuthComponent";
import ProjectOptionButton from "./ProjectOptionButton";
import noImage from "../../../../assets/images/noimage.png";

ProjectItemComponent.propTypes = {
  data: object,
};

export default function ProjectItemComponent({ data }) {
  const dateOfWeekList = ["일", "월", "화", "수", "목", "금", "토"];
  const editDateObject = new Date(data.editDate);

  return (
    <div className="project-item">
      <div className="image-wrapper">
        {data.image !== "no_img" ? (
          <img
            src={IMAGE_DIRECTORY + data.image}
            alt="이미지 없어요"
            className="image_present"
          />
        ) : (
          <div className="no-image-wrapper">
            <img src={noImage} alt="noimage" className="image_nonexist" />
            <h3>등록된 이미지가 없습니다</h3>
          </div>
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
          <ProjectOptionButton
            authority={data.authority}
            projectUuid={data.uuid}
          />
        </div>
      </div>
    </div>
  );
}
