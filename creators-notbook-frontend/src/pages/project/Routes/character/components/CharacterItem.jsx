import { Stack } from "@mui/material";
import { number, object } from "prop-types";
import ItemSingleline from "./itemComponents/ItemSingleline";
import ItemMultiline from "./itemComponents/ItemMultiline";
import ItemImage from "./itemComponents/ItemImage";

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
        margin: "0px 5px",
        height: "calc(100vh - 9rem)",
        overflowY: "scroll",
        padding: "7px",
      }}
      onWheel={handleCharacterItemScroll}
    >
      {data.order.length > 0 &&
        data.order.map((key, index) => {
          const type = data.data[key].type;
          // console.log(data.data[key]);
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
  );
}
