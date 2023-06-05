import { Box, Stack, Typography } from "@mui/material";
import { number, object } from "prop-types";

/**
 * 캐릭터 리스트에서 개별 캐릭터 아이템(모달 아님)
 */
CharacterItem.propTypes = {
  data: object,
  index: number,
  setters: object,
};
export default function CharacterItem({ data, index, setters }) {
  /* FUNCTION */
  const handleCharacterItemScroll = (event) => {
    event.stopPropagation();
  };

  const handleClickOpenModal = () => {
    setters.setCurrentCharacterIndex(index);
    setters.setIsModalOpen(true);
  };

  return (
    <Stack
      minWidth="300px"
      sx={{
        border: "1px solid blue",
        margin:"0px 5px",
      }}
      onWheel={handleCharacterItemScroll}
    >
      <Box onClick={handleClickOpenModal} sx={{
        display:"flex",
        minHeight:"50px",
      }}>
        <Typography variant="h6">작성자 : </Typography>
        <Typography>
          <span>{data["creatorName"]}</span>
        </Typography>
      </Box>
      {Object.keys(data.order).map((key, index) => {
        return (
          <Box key={index} display="flex">
            <Typography variant="h6">{key} : </Typography>
            <Typography>
              <p>{data.data[key]}</p>
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
