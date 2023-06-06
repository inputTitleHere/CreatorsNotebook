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
  /**
   * 가로스크롤 propagation 방지
   */
  const handleCharacterItemScroll = (event) => {
    event.stopPropagation();
  };

  /**
   * 캐릭터 모달창을 연다.
   */
  const handleClickOpenModal = () => {
    setters.setCurrentCharacterIndex(index);
    setters.setIsModalOpen(true);
  };

  return (
    <Stack
    onClick={handleClickOpenModal}
    sx={{
        minWidth:"450px",
        border: "1px solid blue",
        margin:"0px 5px",
        height:"calc(100vh - 9rem)",
        overflowY:"scroll",
        padding:"7px"
      }}
      onWheel={handleCharacterItemScroll}
    >
      <Box  sx={{
        display:"flex",
        minHeight:"50px",
      }}>
        <Typography variant="h6">작성자 : </Typography>
        <Typography>
          <span>{data["creatorName"]}</span>
        </Typography>
      </Box>
      {data.order.length>0 && data.order.map((key, index) => {
        return (
          <Box key={index} display="flex">
            <Typography variant="h6">{key} : </Typography>
            <Typography>
              <span>{data.data[key].value}</span>
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
