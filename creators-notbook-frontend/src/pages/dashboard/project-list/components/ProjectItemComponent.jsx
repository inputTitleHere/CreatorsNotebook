import { object } from "prop-types";
import { IMAGE_DIRECTORY } from "../../../../utils/imageUtils";

ProjectItemComponent.propTypes = {
  data: object,
};

export default function ProjectItemComponent({ data }) {
  return (
    <div className="project-item">
      {data.image && <img src={IMAGE_DIRECTORY + data.image} alt="" />}
    </div>
  );
}
