import { Box, Stack, Typography } from "@mui/material";
import { object } from "prop-types";

CharacterItem.propTypes = {
  data: object,
};
export default function CharacterItem({ data }) {
  /* FUNCTION */
  const handleCharacterItemScroll = (event) => {
    event.stopPropagation();
  };
  return (
    <Stack
      minWidth="300px"
      sx={{
        border: "1px solid blue",
      }}
      onWheel={handleCharacterItemScroll}
    >
      <Box display="flex">
        <Typography variant="h6">작성자 : </Typography>
        <Typography>
          <span>{data["creatorName"]}</span>
        </Typography>
      </Box>
      {/* {Object.keys(data).map((key, index) => {
        return (
          <Box key={index} display="flex">
            <Typography variant="h6">{key} : </Typography>
            <Typography>
              <p>{data[key]}</p>
            </Typography>
          </Box>
        );
      })} */}
    </Stack>
  );
}
