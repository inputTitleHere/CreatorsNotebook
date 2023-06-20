import { Divider, Paper, Stack } from "@mui/material";
import { object, string } from "prop-types";
import ItemSingleline from "./itemComponents/ItemSingleline";
import ItemMultiline from "./itemComponents/ItemMultiline";
import ItemImage from "./itemComponents/ItemImage";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TagListDisplay from "./tagComponents/TagListDisplay";

/**
 * 캐릭터 리스트에서 개별 캐릭터 아이템(모달 아님)
 */
CharacterItem.propTypes = {
  data: object, // 캐릭터 전체 정보를 가진 object
  characterUuid: string,
  setters: object,
};
export default function CharacterItem({ data, characterUuid, setters }) {
  const { setCurrentCharacterUuid, setIsModalOpen, setModalPos } = setters;
  const stackRef = useRef(null);
  const [scrollYPos, setScrollYPos] = useState(0);
  const { tagMap } = useSelector((state) => state.tag);
  const { tagList } = useSelector((state) => state.character.characterData)[
    characterUuid
  ];

  const [tagStackHeight, setTagStackHeight] = useState(0);
  const tagStackRef = useRef(null);

  useEffect(() => {
    setTagStackHeight(tagStackRef.current.clientHeight);
  }, [tagStackRef,tagList]);
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
    setCurrentCharacterUuid(characterUuid);
    setModalPos(scrollYPos);
    setIsModalOpen(true);
  };

  /**
   * 스크롤시 가로로 이동시킨다.
   */
  const handleHorizontalWheel = (event) => {
    tagStackRef.current.scrollLeft += event.deltaY;
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        minWidth: "450px",
        maxWidth: "450px",
        cursor: "pointer",
        height: "calc(100vh - 8rem)",
      }}
      onClick={handleClickOpenModal}
    >
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          margin: "5px",
          width: "98%",
          overflow: "hidden",
          cursor: "pointer",
        }}
        ref={tagStackRef}
        onWheel={handleHorizontalWheel}
      >
        {tagList.map((tagNo, index) => {
          return <TagListDisplay tagData={tagMap[tagNo]} key={index} />;
        })}
      </Stack>
      <Divider />
      <Stack
        sx={{
          height: `calc(100vh - 10rem - ${tagStackHeight}px)`,
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
