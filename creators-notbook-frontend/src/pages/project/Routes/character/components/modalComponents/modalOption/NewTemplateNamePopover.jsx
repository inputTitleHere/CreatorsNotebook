import { Box, Button, Popover, TextField, Typography } from "@mui/material";
import { object, string } from "prop-types";
import { fetchByJson } from "../../../../../../../utils/fetch";
import { useState } from "react";
import { useSelector } from "react-redux";

NewTemplateNamePopover.propTypes = {
  characterUuid: string,
  setters: object,
  anchorEl: object,
};
export default function NewTemplateNamePopover({
  characterUuid,
  setters,
  anchorEl,
}) {
  const { setAskNamePopoverAnchorEl, setCharacterOptionMenuAnchor } = setters;
  const [templateName, setTemplateName] = useState("");
  const { uuid: projectUuid } = useSelector((state) => state.project.project);
  const character = useSelector((state) => state.character.characterData)[
    characterUuid
  ];
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
    const serverTemplateData = await fetchByJson(
      "/characterTemplate/new",
      "POST",
      template
    );
    console.log(serverTemplateData);
    setTemplateName("");
    setAskNamePopoverAnchorEl(null);
    setCharacterOptionMenuAnchor(null);
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
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
  );
}
