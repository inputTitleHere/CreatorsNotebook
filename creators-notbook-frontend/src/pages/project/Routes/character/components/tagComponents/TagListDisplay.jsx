import { Chip } from "@mui/material";
import { object } from "prop-types";

TagListDisplay.propTypes = {
  tagData: object,
};
export default function TagListDisplay({ tagData }) {
  return (
    <Chip
      label={tagData.tagName}
      sx={{
        bgcolor: tagData.hexColor,
        color: tagData.textColor,
      }}
    />
  );
}
