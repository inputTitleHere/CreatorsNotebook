import { DeleteForever, DensitySmall, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  TextField,
} from "@mui/material";
import {
  removeCharacterAttr,
  renameCharacterAttr,
} from "../../../../../../redux-store/slices/characterSlice";
import { useState } from "react";
import { any, string } from "prop-types";
import { fetchByForm, fetchByJson } from "../../../../../../utils/fetch";
import { useDispatch, useSelector } from "react-redux";

/**
 * 캐릭터 속성 좌측의 핸들
 * 드래그엔 드랍용 핸들과 클릭시 속성 관련 옵션을 배치하는 기능을 수행한다.
 */
AttributeHandle.propTypes = {
  characterUuid: string,
  name: string,
  type: string,
  value: any,
};
export default function AttributeHandle({ characterUuid, name, type, value }) {
  const [anchorEl, setAnchorEl] = useState(false);
  const [popoverEl, setPopoverEl] = useState(null);
  const [attrName, setAttrName] = useState(name);
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character.characterData)[
    characterUuid
  ];
  /**
   * 개별 속성의 menu를 열고 닫는 함수
   */
  const handleMenuOpenClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * 속성명 변경을 제어 및 글자수 10글자 안넘게 제한한다.
   */
  const handleNewAttrNameInputChange = (event) => {
    if (event.target.value.length > 10) {
      alert("속성명은 10글자 이하로 해주세요!");
      return false;
    }
    setAttrName(event.target.value);
  };

  /**
   * 속성명을 묻는 팝업창을 닫는다.
   */
  const handleRenameAttrClose = () => {
    setPopoverEl(null);
    handleMenuClose();
  };

  /**
   * 속성 삭제 기능
   */
  const deleteAttr = async () => {
    const toSend = {
      characterUuid,
      name,
      type,
      value,
    };
    await fetchByJson("/character/deleteAttribute", "DELETE", toSend);
    toSend.characterUuid = characterUuid;
    dispatch(removeCharacterAttr(toSend));
  };

  /**
   * 이름변경 popover를 연다.
   */
  const handleRenameAttr = (event) => {
    setPopoverEl(event.currentTarget);
  };

  /**
   * 실제 속성명을 변경한다.
   * 단 이미 존재하는지 검증 이후 변경한다.
   */
  const renameAttr = async () => {
    if (character[attrName]) {
      alert("기존에 존재하는 속성명은 새로 추가할 수 없습니다!");
      return;
    }
    const formData = new FormData();
    formData.append("characterUuid", characterUuid);
    formData.append("oldName", name);
    formData.append("newName", attrName);

    await fetchByForm("/character/renameAttribute", "PUT", formData);

    dispatch(
      renameCharacterAttr({
        oldName: name,
        newName: attrName,
        characterUuid: characterUuid,
      })
    );
    handleRenameAttrClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "2px",
      }}
    >
      <Icon
        sx={{
          cursor: "pointer",
        }}
        onClick={handleMenuOpenClick}
      >
        <DensitySmall />
      </Icon>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRenameAttr}>
          <ListItemIcon>
            <Edit color="primary" />
          </ListItemIcon>
          <ListItemText>속성명 변경</ListItemText>
        </MenuItem>
        <MenuItem onClick={deleteAttr}>
          <ListItemIcon>
            <DeleteForever color="warning" />
          </ListItemIcon>
          <ListItemText>속성 삭제</ListItemText>
        </MenuItem>
      </Menu>
      <Popover
        open={Boolean(popoverEl)}
        anchorEl={popoverEl}
        onClose={handleRenameAttrClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <TextField
            id="attr-name"
            variant="filled"
            label="10글자 이하의 신규 속성명"
            value={attrName}
            onChange={handleNewAttrNameInputChange}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                renameAttr();
              }
            }}
            sx={{
              width: "20rem",
            }}
          ></TextField>
          <Button variant="contained" onClick={renameAttr}>
            변경
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
