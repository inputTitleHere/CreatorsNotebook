import { AddCircleOutline, ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Menu,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
  keyframes,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCharacter,
  sortCharacterCustom,
  sortCharacterDefault,
} from "../../../../../../redux-store/slices/characterSlice";
import { fetchByForm } from "../../../../../../utils/fetch";
import { object } from "prop-types";

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
  const [sortMode, setSortMode] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [sortType, setSortType] = useState(null);
  /* HOOKS */
  const user = useSelector((state) => state.user.user);
  const project = useSelector((state) => state.project.project);
  const { characterData } = useSelector((state) => state.character);
  const dispatch = useDispatch();

  /* EFFECT */
  /**
   * 초기 정렬설정을 로컬에서 읽어온다.
   */
  useEffect(() => {
    const sortOptionString = localStorage.getItem("cso");
    let sortOption;
    if (project?.uuid) {
      if (!sortOptionString) {
        sortOption = {
          [project.uuid]: {
            sm: "createDate",
            sd: "asc",
            type: "default", // default vs custom
          },
        };
        localStorage.setItem("cso", JSON.stringify(sortOption));
      } else {
        sortOption = JSON.parse(sortOptionString);
        if (!sortOption[project.uuid]) {
          sortOption[project.uuid] = {
            sm: "createDate",
            sd: "asc",
            type: "default", // default vs custom
          };
          localStorage.setItem("cso", JSON.stringify(sortOption));
        }
      }
      setSortMode(sortOption[project.uuid].sm);
      setSortDirection(sortOption[project.uuid].sd);
      setSortType(sortOption[project.uuid].type);
    }
  }, [project?.uuid]);

  /**
   * 정렬기능 변경시 정렬 적용
   */
  useEffect(() => {
    if (sortType === "default") {
      dispatch(sortCharacterDefault({ sortMode, sortDirection }));
    } else {
      dispatch(sortCharacterCustom({ sortMode, sortDirection }));
    }
    if (project?.uuid) {
      const sortOption = JSON.parse(localStorage.getItem("cso"));
      sortOption[project.uuid] = {
        sm: sortMode,
        sd: sortDirection,
        type: sortType,
      };
      localStorage.setItem("cso", JSON.stringify(sortOption));
    }
  }, [
    project?.uuid,
    dispatch,
    sortMode,
    sortDirection,
    sortType,
    characterData,
  ]);

  /* MEMO */
  /**
   * 모든 캐릭터에서 속성 이름들을 고유히 추출한다.
   * 정렬옵션에서 사용하며 각기 속성이 등장한 횟수를 기록한다.
   */
  const uniqueCharacterAttributeList = useMemo(() => {
    const namePool = {};
    const nameList = [];
    // eslint-disable-next-line no-unused-vars
    Object.values(characterData).forEach((value) => {
      value.order.forEach((attr) => {
        if (value.data[attr].type === "image") {
          return;
        }
        if (namePool[attr]) {
          namePool[attr]++;
        } else {
          nameList.push(attr);
          namePool[attr] = 1;
        }
      });
    });
    nameList.sort((left, right) => {
      const comp = namePool[right] - namePool[left];
      if (comp === 0) {
        return left.localeCompare(right);
      }
      return comp;
    });
    return nameList.map((attr) => {
      return [attr, namePool[attr]];
    });
  }, [characterData]);

  /* FUNCTIONS - HANDLES */

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

  /**
   * 오름차순 내림차순 설정
   */
  const handleSortDirectionChange = (event) => {
    if (event.target.checked) {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };
  /**
   * 정렬 모드 설정
   */
  const handleChangeSortMode = (event) => {
    setSortMode(event.target.value);
  };
  /**
   * 정렬옵션 메뉴 관련 Handle
   */
  const handleSortOptionMenuOpen = (event) => {
    setSortOptionAnchorEl(event.currentTarget);
  };
  const handleSortOptionMenuClose = () => {
    setSortOptionAnchorEl(null);
  };
  const handleSortOptionMenuWheel = (event) => {
    event.stopPropagation();
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
          <Box sx={{ marginRight: "1rem" }}>
            <Button variant="contained">태그 필터</Button>
          </Box>
          <Box sx={{ marginRight: "1rem" }}>
            <Button variant="contained" onClick={handleSortOptionMenuOpen}>
              정렬 옵션
            </Button>
            <Menu
              open={Boolean(sortOptionAnchorEl)}
              anchorEl={sortOptionAnchorEl}
              onClose={handleSortOptionMenuClose}
              onWheel={handleSortOptionMenuWheel}
            >
              <FormGroup
                sx={{
                  padding: "0px 20px",
                }}
              >
                <FormLabel>정렬 방향</FormLabel>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="h6">오름차순</Typography>
                  <Switch
                    checked={sortDirection === "desc"}
                    color="default"
                    onChange={handleSortDirectionChange}
                  />
                  <Typography variant="h6">내림차순</Typography>
                </Stack>
                <Divider />
                <RadioGroup value={sortMode} onChange={handleChangeSortMode}>
                  <FormLabel>기본 기준</FormLabel>
                  <FormControlLabel
                    value="createDate"
                    control={<Radio />}
                    label="생성일"
                    onClick={() => setSortType("default")}
                  />
                  <FormControlLabel
                    value="editDate"
                    control={<Radio />}
                    label="수정일"
                    onClick={() => setSortType("default")}
                  />
                  <FormLabel>속성 기준 [속성명(개수)]</FormLabel>
                  <Stack>
                    {uniqueCharacterAttributeList.map((item, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={item[0]}
                          control={<Radio />}
                          label={`${item[0]}(${item[1]})`}
                          onClick={() => setSortType("custom")}
                        />
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </FormGroup>
            </Menu>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
