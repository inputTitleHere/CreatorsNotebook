import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  keyframes,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AddCircleOutline, ArrowBack, ArrowForward } from "@mui/icons-material";
import CharacterItem from "./components/CharacterItem";
import { useRef, useState } from "react";

/**
 * 캐릭터 정보 표시 챕터
 */
export default function CharacterChapter() {
  const user = useSelector((state) => state.user.user);
  const characterList = useSelector((state) => state.project.characters);

  /* STATES */
  const [isScrollAreaMouseHovered, setScrollAreaMouseHovered] = useState(false);
  const characterListRef = useRef(null);

  /* FOR TESTING AND TODOs*/
  const dummyData = [
    { 이름: "루리아" },
    { 이름: "시노리아" },
    { 이름: "이노리아" },
    { 이름: "베르칼" },
    { 이름: "유리므리아" },
    { 이름: "아르토마니아" },
    { 이름: "귀네비스" },
    { 이름: "바토리" },
    { 이름: "하라히메" },
    { 이름: "엘리스타르" },
  ];

  /* CONSTS */
  const slideLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-10px);
  }
  `;
  const slideRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(10px);
  }
  `;

  /* FUNCTION */
  /**
   * 세로방향의 스크롤을 캐릭터 리스트의 가로방향으로 변경한다.
   * @param {object} event 이벤트 객체
   */
  const handleHorizontalWheel = (event) => {
    characterListRef.current.scrollLeft += event.deltaY;
  };

  /**
   * 마우스가 스크롤 영역에 들어오면 작동한다.
   */
  const handleScrollAreaMouseEnter = () => {
    setScrollAreaMouseHovered(true);
  };
  /**
   * 마우스가 스크롤 영역에서 나가면 작동한다.
   */
  const handleScrollAreaMouseExit = () => {
    setScrollAreaMouseHovered(false);
  };

  return (
    <>
      <Container maxWidth={false} disableGutters={true}>
        {/* 캐릭터 챕터 상단 옵션바 */}
        <Box
          sx={{
            position: "absolute",
            background:
              "repeating-linear-gradient(-45deg,#ebe3787b 0px, #ebe3787b 10px, #302d1f7a 10px, #302d1f7a 20px)",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={handleScrollAreaMouseEnter}
          onMouseLeave={handleScrollAreaMouseExit}
          onWheel={handleHorizontalWheel}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
            sx={{
              padding: "10px",
              height: "4rem",
            }}
          >
            <Grid item>
              <Button
                variant="contained"
                startIcon={<AddCircleOutline />}
                sx={{
                  fontSize: "1.3rem",
                }}
              >
                <Typography noWrap>신규 캐릭터 생성</Typography>{" "}
              </Button>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent.main",
                  padding: "0px 15px",
                  borderRadius: "15px",
                }}
              >
                <ArrowBack
                  sx={{
                    animation: isScrollAreaMouseHovered
                      ? `${slideLeft} .5s infinite alternate`
                      : "none",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    margin: "0px 10px",
                    userSelect: "none",
                  }}
                >
                  스크롤 존
                </Typography>
                <ArrowForward
                  sx={{
                    animation: isScrollAreaMouseHovered
                      ? `${slideRight} .5s infinite alternate`
                      : "none",
                  }}
                />
              </Box>
            </Grid>
            <Grid item display="flex" alignItems="center" minWidth="150px">
              <Box
                sx={{
                  marginRight: "1rem",
                }}
              >
                <Typography noWrap>정렬옵션</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
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
          <Stack direction="row" spacing={1} marginTop="4rem">
            {dummyData.map((item, index) => {
              return <CharacterItem data={item} key={index} />;
            })}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
