import { string } from "prop-types";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { fetchByUrl } from "../../../../utils/fetch";
import { useNavigate } from "react-router-dom";

ProjectOptionButton.propTypes = {
  authority: string,
  projectUuid: string,
};
/**
 * 개별 프로젝트에 대한 부가 기능을 명시한다.
 * @param {object} {authority, projectUuid} 권한 및 프로젝트 고유번호
 */
export default function ProjectOptionButton({ authority, projectUuid }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  /**
   * 옵션모달창을 연다.
   * @param {object} event 클릭이벤트
   */
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  /**
   * 옵션창을 닫는 기능을 수행한다.
   * @param {object} event 클릭 이벤트
   */
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  /**
   * 프로젝트 삭제 기능을 수행.
   * @param {object} event 클릭 이벤트 객체
   * @returns 삭제 성공시 해당 페이지 리로드
   */
  const handleDelete = async (event) => {
    event.stopPropagation();
    if(!confirm("프로젝트를 정말로 삭제하겠습니까?")){
      return;
    }
    const params = new URLSearchParams({ uuid: projectUuid });
    console.log(params);
    const result = await fetchByUrl("/project/delete", "DELETE", params);
    console.log(result);
    if (result) {
      navigate(0);
    }
  };

  /**
   * TODO -> 멤버관리 기능
   * @param {*} event 
   */
  const handleMember =(event)=>{
    event.stopPropagation();
  }

  return (
    <>
      {authority === "CREATOR" || authority === "ADMIN" ? (
        <div className="option-wrapper">
          <IconButton onClick={handleClick}>
            <MoreVertIcon color="outline" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleMember}>프로젝트 멤버관리</MenuItem>
            <MenuItem onClick={handleDelete}>프로젝트 삭제</MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="option-wrapper">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      )}
    </>
  );
}
