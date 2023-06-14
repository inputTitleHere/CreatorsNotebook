import { ContentPaste, Delete, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { object, string } from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchByJson } from "../../../../../../utils/fetch";

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
  functions,
}) {
  const { setCharacterOptionMenuAnchor } = setters;
  const { deleteCharacter } = functions;
  /* STATE */
  const [askNamePopoverAnchorEl, setAskNamePopoverAnchorEl] = useState(null);
  const [templateName, setTemplateName] = useState("");
  // { data, order }
  const character = useSelector((state) => state.character.characterData)[
    characterUuid
  ];
  const { uuid: projectUuid } = useSelector((state) => state.project.project);
  /* FUNCTION */
  const closeMenu = () => {
    setCharacterOptionMenuAnchor(null);
  };
  const handleDeleteCharacter = () => {
    if (confirm("삭제하시겠습니까? 삭제된 캐릭터는 복구가 불가능합니다.")) {
      deleteCharacter(characterUuid);
    }
  };

  const createNewCharacterTemplate = async () => {
    const templateData = {};
    character?.order.forEach((item) => {
      templateData[item] = {
        name: item,
        type: character?.data[item].type,
        value: "",
      };
    });
    const template = {
      projectUuid: projectUuid,
      dataOrder: character?.order,
      data: templateData,
      name: templateName,
    };
    console.log(template);
    const serverTemplateData = await fetchByJson("/characterTemplate/newTemplate","POST",template);
    console.log(serverTemplateData);
    setTemplateName("");
    setAskNamePopoverAnchorEl(null);
    setCharacterOptionMenuAnchor(null);
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
            <ListItemText>이 캐릭터로 템플릿 생성</ListItemText>
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
          >
            <ListItemIcon>
              <ContentPaste />
            </ListItemIcon>
            <ListItemText>기존 템플릿 적용하기</ListItemText>
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
        <Popover
          open={Boolean(askNamePopoverAnchorEl)}
          anchorEl={askNamePopoverAnchorEl}
          onClose={() => setAskNamePopoverAnchorEl(null)}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <TextField
              label=" 15글자 이하 신규 템플릿 이름"
              value={templateName}
              name="templateTitle"
              onChange={(event) => {
                const str = event.target.value;
                if (str.length > 15) {
                  alert("템플릿 이름은 15글자 이하로 해주세요!");
                  return;
                }
                setTemplateName(str);
              }}
              sx={{
                margin: "10px 5px 10px 10px",
              }}
            />
            <Button
              variant="outlined"
              sx={{
                margin: "10px 10px 10px 5px",
              }}
              onClick={createNewCharacterTemplate}
            >
              <Typography variant="h6">저장</Typography>
            </Button>
          </Box>
        </Popover>
      </Box>
    </Menu>
  );
}
