import { string } from "prop-types";
import threeHorizontalLine from "../../../../assets/icons/threeHorizontalLine.png" 

ProjectOptionButton.propTypes={
  authority:string,
}
export default function ProjectOptionButton({authority}){
  return(
    <div className="option-wrapper">
      <img src={threeHorizontalLine} alt="가로삼줄(옵션)" />
    </div>
  )
}