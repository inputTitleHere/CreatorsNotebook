import {
  Box,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { object } from "prop-types";
import { useRef, useState } from "react";

ProjectTextInput.propTypes = {
  refs: object,
};
export default function ProjectTextInput({ refs }) {
  const [titleInput, setTitleInput] = useState("");
  const { titleRef, descriptionRef } = refs;
  const TITLE_LIMIT = useRef(40);

  const handleTitleChange = (event) => {
    const titleStr = event.target.value;
    if (titleStr.length > TITLE_LIMIT.current) {
      setTitleInput(titleInput.substring(0, TITLE_LIMIT.current));
    } else {
      setTitleInput(titleStr);
    }
  };

  return (
    <Box
      sx={{
        margin: "48px 0px 24px",
      }}
    >
      <Box
        sx={{
          margin: "24px 0px",
        }}
      >
        <InputLabel
          sx={{
            marginBottom: "12px",
          }}
        >
          <Typography variant="h3">프로젝트 제목</Typography>
        </InputLabel>
        <TextField
          name="title"
          id="project-title"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <Typography>
                {titleInput.length}/{TITLE_LIMIT.current}
              </Typography>
            ),
          }}
          value={titleInput}
          onChange={handleTitleChange}
          ref={titleRef}
          sx={{
            "& fieldset": {
              borderRadius: "15px",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          margin: "24px 0px",
        }}
      >
        <InputLabel
          sx={{
            marginBottom: "12px",
          }}
        >
          <Typography variant="h3">프로젝트 설명</Typography>
        </InputLabel>
        <TextField
          name="description"
          id="project-description"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          ref={descriptionRef}
          sx={{
            "& fieldset": {
              borderRadius: "15px",
            },
          }}
        />
      </Box>
    </Box>
  );
}
