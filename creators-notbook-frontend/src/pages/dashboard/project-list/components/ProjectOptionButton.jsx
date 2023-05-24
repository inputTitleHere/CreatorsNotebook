import { string } from "prop-types";
import threeHorizontalLine from "../../../../assets/icons/threeHorizontalLine.png" 

ProjectOptionButton.propTypes={
  authority:string,
}
export default function ProjectOptionButton({authority}){

  const handleOptionClick=(event)=>{
    event.stopPropagation();
    console.log(authority);
  }

  return(
    <div className="option-wrapper" onClick={handleOptionClick}>
      <img src={threeHorizontalLine} alt="가로삼줄(옵션)" />
    </div>
  )
}