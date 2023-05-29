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
export default function ProjectOptionButton({ authority, projectUuid }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
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

  return (
    <>
      {authority === "CREATOR" || authority === "ADMIN" ? (
        <div className="option-wrapper">
          <IconButton onClick={handleClick}>
            <MoreVertIcon color="outline" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem>프로젝트 멤버관리</MenuItem>
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
