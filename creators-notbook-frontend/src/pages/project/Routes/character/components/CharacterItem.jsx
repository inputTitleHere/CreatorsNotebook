import { Paper, Stack } from "@mui/material";
import { object, string } from "prop-types";
import ItemSingleline from "./itemComponents/ItemSingleline";
import ItemMultiline from "./itemComponents/ItemMultiline";
import ItemImage from "./itemComponents/ItemImage";
import { useRef, useState } from "react";

/**
 * 캐릭터 리스트에서 개별 캐릭터 아이템(모달 아님)
 */
CharacterItem.propTypes = {
  data: object, // 캐릭터 전체 정보를 가진 object
  uuid: string,
  setters: object,
};
export default function CharacterItem({ data, uuid, setters }) {
  const { setCurrentCharacterUuid, setIsModalOpen, setModalPos } = setters;
  const stackRef = useRef(null);
  const [scrollYPos, setScrollYPos] = useState(0);

  /* FUNCTION */
  /**
   * 가로스크롤 propagation 방지
   */
  const handleCharacterItemScroll = (event) => {
    // console.log(stackRef.current?.scrollTop);
    // console.log(stackRef.current?.scrollTop);
    setScrollYPos(
      stackRef.current?.scrollTop /
        (stackRef.current.scrollHeight - stackRef.current?.clientHeight)
    );
    event.stopPropagation();
  };

  /**
   * 캐릭터 모달창을 연다.
   */
  const handleClickOpenModal = () => {
    setCurrentCharacterUuid(uuid);
    setModalPos(scrollYPos);
    setIsModalOpen(true);
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        minWidth: "450px",
        maxWidth: "450px",
        cursor: "pointer",
      }}
      // onWheel={handleCharacterItemScroll}
    >
      <Stack
        onClick={handleClickOpenModal}
        sx={{
          height: "calc(100vh - 9rem)",
          overflowY: "scroll",
          padding: "7px",
        }}
        ref={stackRef}
        onScroll={handleCharacterItemScroll}
      >
        {data.order.length > 0 &&
          data.order.map((key, index) => {
            const type = data.data[key]?.type;
            switch (type) {
              case "short":
              case "number":
                return (
                  <ItemSingleline
                    name={data.data[key].name}
                    value={data.data[key].value}
                    key={index}
                  />
                );
              case "long":
                return (
                  <ItemMultiline
                    name={data.data[key].name}
                    value={data.data[key].value}
                    key={index}
                  />
                );
              case "image":
                return (
                  <ItemImage
                    name={data.data[key].name}
                    value={data.data[key].value}
                    key={index}
                  />
                );
            }
          })}
      </Stack>
    </Paper>
  );
}
