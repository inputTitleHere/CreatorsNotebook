import { Box, Container, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CharacterItem from "./components/CharacterItem";
import { useRef, useState } from "react";
import CharacterModal from "./components/CharacterModal";
import CharacterChapterHeader from "./components/characterChapterHeader/CharacterChapterHeader";

/**
 * 캐릭터 정보 표시 챕터
 */
export default function CharacterChapter() {
  /* REDUX */
  const { isToggleFilterActive, tagFilterSet, filterMode } = useSelector(
    (state) => state.tag
  );

  const { characters, characterData } = useSelector((state) => state.character);

  /* STATES */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCharacterUuid, setCurrentCharacterUuid] = useState(undefined);
  const [modalPos, setModalPos] = useState(0);

  /* REFS */
  const characterListRef = useRef(null);

  /* FUNCTION */
  // 캐릭터 모달을 닫는다.
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <Container maxWidth={false} disableGutters={true}>
        {/* 캐릭터 챕터 상단 옵션바 */}
        <CharacterChapterHeader
          setters={{
            setCurrentCharacterUuid,
            setIsModalOpen,
          }}
          refs={{
            characterListRef,
          }}
        />
        {/* 캐릭터 표시 리스트 Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            boxSizing:"border-box",
            padding:"0px 10px",
            height: "calc(100vh - 3.5rem)",
            margin: "0px auto",
            overflowX: "scroll",
            overflowY: "hidden",
          }}
          ref={characterListRef}
        >
          <Stack direction="row" spacing={1} sx={{
            marginTop:"3em",
            paddingTop:"10px",
          }}>
            {characters.length > 0 ? (
              // 캐릭터의 태그에 따른 표현 분류 작업을 수행한다.
              characters.map((uuid, index) => {
                if (isToggleFilterActive) {
                  // 필터 모드에 따라 수행
                  if (filterMode === "OR") {
                    // 필터모드 OR
                    for (const tagNo of characterData[uuid].tagList) {
                      if (tagFilterSet[tagNo]) {
                        return (
                          <CharacterItem
                            data={characterData[uuid]}
                            key={index}
                            characterUuid={uuid}
                            setters={{
                              setIsModalOpen,
                              setCurrentCharacterUuid,
                              setModalPos,
                            }}
                          />
                        );
                      }
                    }
                  } else {
                    // 필터모드 AND
                    // -> 구현 : 선택된 태그 목록을 모두 포함해야한다.
                    const characterTagSet = new Set(
                      characterData[uuid].tagList
                    );
                    let flag = true;
                    for (const tagNo of Object.keys(tagFilterSet)) {
                      if (!characterTagSet.has(Number(tagNo))) {
                        flag = false;
                        break;
                      }
                    }
                    if (flag) {
                      return (
                        <CharacterItem
                          data={characterData[uuid]}
                          key={index}
                          characterUuid={uuid}
                          setters={{
                            setIsModalOpen,
                            setCurrentCharacterUuid,
                            setModalPos,
                          }}
                        />
                      );
                    }
                  }
                } else {
                  return (
                    <CharacterItem
                      data={characterData[uuid]}
                      key={index}
                      characterUuid={uuid}
                      setters={{
                        setIsModalOpen,
                        setCurrentCharacterUuid,
                        setModalPos,
                      }}
                    />
                  );
                }
              })
            ) : (
              <Typography
                variant="h4"
                sx={{
                  padding: "20px",
                  textAlign: "center",
                  width: "100vw",
                }}
              >
                아직 생성된 캐릭터가 없습니다!
              </Typography>
            )}
          </Stack>
        </Box>
        {isModalOpen && (
          <CharacterModal
            characterUuid={currentCharacterUuid}
            setIsModalOpen={setIsModalOpen}
            modalPos={modalPos}
            handleFunctions={{
              handleModalClose,
            }}
          />
        )}
      </Container>
    </>
  );
}
