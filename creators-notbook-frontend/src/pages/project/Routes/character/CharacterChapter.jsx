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
  /* HOOKS */
  // const user = useSelector((state) => state.user.user);

  const { characters, characterData } = useSelector((state) => state.character);

  /* STATES */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCharacterUuid, setCurrentCharacterUuid] = useState(undefined);
  const [modalPos, setModalPos] = useState(0);
  const characterListRef = useRef(null);


  /* FUNCTION */

  //^ MODAL 관련
  /**
   * 캐릭터 모달을 닫는다.
   */
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
            height: "calc(100vh - 3.5rem)",
            margin: "0px auto",
            overflowX: "scroll",
          }}
          ref={characterListRef}
        >
          <Stack direction="row" spacing={1} marginTop="3rem" paddingTop="5px">
            {characters.length > 0 ? (
              // item에는 character의 uuid가 들어올 것.
              characters.map((uuid, index) => {
                return (
                  <CharacterItem
                    data={characterData[uuid]}
                    key={index}
                    uuid={uuid}
                    setters={{
                      setIsModalOpen,
                      setCurrentCharacterUuid,
                      setModalPos
                    }}
                  />
                );
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
