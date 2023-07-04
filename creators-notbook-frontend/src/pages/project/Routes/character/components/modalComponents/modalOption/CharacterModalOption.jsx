import { ContentPaste, Delete, Save } from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { object, string } from "prop-types";
import { useState } from "react";
import NewTemplateNamePopover from "./NewTemplateNamePopover";
import { useDispatch, useSelector } from "react-redux";
import { fetchByForm } from "@src/utils/fetch";
import { removeCharacter } from "@src/redux-store/slices/characterSlice";

CharacterModalOption.propTypes = {
  characterUuid: string,
  menuAnchor: object,
  setters: object,
  functions: object,
};
export default function CharacterModalOption({
  characterUuid,
  menuAnchor,
  setters,
}) {
  const {
    setCharacterOptionMenuAnchor,
    setIsTemplateSelectionModalOpen,
    setIsModalOpen,
  } = setters;
  /* STATE */
  const [askNamePopoverAnchorEl, setAskNamePopoverAnchorEl] = useState(null);

  const project = useSelector((state) => state.project.project);
  const dispatch = useDispatch();

  /* FUNCTION */
  const closeMenu = () => {
    setCharacterOptionMenuAnchor(null);
  };
  const handleDeleteCharacter = () => {
    if (confirm("삭제하시겠습니까? 삭제된 캐릭터는 복구가 불가능합니다.")) {
      deleteCharacter(characterUuid);
    }
  };

  /**
   * 캐릭터를 삭제한다.
   * @param {string} uuid 캐릭터 고유 번호
   */
  const deleteCharacter = async (uuid) => {
    console.log("DELETE :" + uuid);
    const formData = new FormData();
    formData.append("characterUuid", uuid);
    formData.append("projectUuid", project.uuid);
    const result = await fetchByForm("/character/delete", "DELETE", formData);
    // --- 로컬 slice에서 삭제하기
    if (result) {
      setIsModalOpen(false);
      dispatch(removeCharacter(uuid));
    } else {
      alert("캐릭터 삭제 실패");
    }
  };

  return (
    <Menu open={Boolean(menuAnchor)} onClose={closeMenu} anchorEl={menuAnchor}>
      <Box
        sx={{
          padding: "0px 10px",
        }}
      >
        <MenuList>
          <MenuItem
            onClick={(event) => {
              setAskNamePopoverAnchorEl(event.currentTarget);
            }}
            sx={{
              "&:hover": {
                color: "primary.main",
                path: {
                  color: "primary.main",
                },
              },
            }}
          >
            <ListItemIcon>
              <Save />
            </ListItemIcon>
            <ListItemText>신규 템플릿 생성</ListItemText>
          </MenuItem>
          <MenuItem
            sx={{
              "&:hover": {
                color: "primary.main",
                path: {
                  color: "primary.main",
                },
              },
            }}
            onClick={() => {
              closeMenu();
              setIsTemplateSelectionModalOpen(true);
            }}
          >
            <ListItemIcon>
              <ContentPaste />
            </ListItemIcon>
            <ListItemText>기존 템플릿 추가</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleDeleteCharacter}
            sx={{
              border: "1px solid",
              borderColor: "warning.main",
              borderRadius: "10px",
              "&:hover": {
                color: "warning.main",
              },
            }}
          >
            <ListItemIcon>
              <Delete color="warning" />
            </ListItemIcon>
            <ListItemText>캐릭터 삭제</ListItemText>
          </MenuItem>
        </MenuList>
        {/* popover */}
        <NewTemplateNamePopover
          characterUuid={characterUuid}
          setters={{ setAskNamePopoverAnchorEl, setCharacterOptionMenuAnchor }}
          anchorEl={askNamePopoverAnchorEl}
        />
      </Box>
    </Menu>
  );
}
