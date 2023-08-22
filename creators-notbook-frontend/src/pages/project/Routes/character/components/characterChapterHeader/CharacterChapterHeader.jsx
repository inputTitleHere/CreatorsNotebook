import { AddCircleOutline, ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, Grid, Typography, keyframes } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCharacter } from "@src/redux-store/slices/characterSlice";
import { fetchByForm } from "@src/utils/fetch";
import { object } from "prop-types";
import CharacterSortMenu from "./components/CharacterSortMenu";
import CharacterTagFilterMenu from "./components/CharacterTagFilterMenu";

CharacterChapterHeader.propTypes = {
  setters: object,
  refs: object,
};
export default function CharacterChapterHeader({ setters, refs }) {
  const { setCurrentCharacterUuid, setIsModalOpen } = setters;
  const { characterListRef } = refs;

  /* STATE */
  const [isScrollAreaMouseHovered, setScrollAreaMouseHovered] = useState(false);
  const [sortOptionAnchorEl, setSortOptionAnchorEl] = useState(null);
  const [tagFilterAnchorEl, setTagFilterAnchorEl] = useState(null);
  /* HOOKS */
  const user = useSelector((state) => state.user.user);
  const project = useSelector((state) => state.project.project);
  const dispatch = useDispatch();
  /* FUNCTIONS - HANDLES */
  /**
   * 정렬옵션 메뉴 열기
   */
  const handleSortOptionMenuOpen = (event) =>
    setSortOptionAnchorEl(event.currentTarget);

  /**
   * 태그 필터 옵션 메뉴 열기
   */
  const handleTagFilterMenuOpen = (event) =>
    setTagFilterAnchorEl(event.currentTarget);
  /**
   * 세로방향의 스크롤을 캐릭터 리스트의 가로방향으로 변경한다.
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

  /**
   * 신규 캐릭터를 생성하고 서버로부터 발급받은 신규 캐릭터 정보를 프런트에 저장한 이후 모달을 연다.
   */
  const handleModalOpen = async () => {
    const formData = new FormData();
    formData.append("projectUuid", project.uuid);
    formData.append("userNo", user.no);
    const newCharacter = await fetchByForm("/character/new", "POST", formData);
    console.log(newCharacter);
    setCurrentCharacterUuid(newCharacter.uuid);
    dispatch(addCharacter(newCharacter));
    setIsModalOpen(true);
  };

  /* CONSTS */
  const slideLeft = keyframes`
    from {transform: translateX(0);}
    to {transform: translateX(-10px);}
    `;
  const slideRight = keyframes`
    from {transform: translateX(0);}
    to {transform: translateX(10px);}
    `;

  return (
    <Box
      sx={{
        position: "absolute",
        background:
          "repeating-linear-gradient(-45deg,#ebe3787b 0px, #ebe3787b 10px, #302d1f7a 10px, #302d1f7a 20px)",
        width: "100vw",
        minWidth:"600px",
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
          height: "3rem",
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleModalOpen}
            sx={{
              height: "2.5rem",
              fontSize: "1.2rem",
              padding: "1rem",
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
          <Box sx={{ marginRight: "1rem" }} onClick={handleTagFilterMenuOpen}>
            <Button variant="contained">태그 필터</Button>
          </Box>
          <Box sx={{ marginRight: "1rem" }}>
            <Button variant="contained" onClick={handleSortOptionMenuOpen}>
              정렬 옵션
            </Button>
            <CharacterSortMenu
              setter={{ setSortOptionAnchorEl }}
              anchorEl={sortOptionAnchorEl}
            />
            <CharacterTagFilterMenu
              anchorEl={tagFilterAnchorEl}
              setter={{ setTagFilterAnchorEl }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
