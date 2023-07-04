import {
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Menu,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortCharacterCustom,
  sortCharacterDefault,
} from "@src/redux-store/slices/characterSlice";
import { object } from "prop-types";

CharacterSortMenu.propTypes = {
  setter: object,
  anchorEl: object,
};

export default function CharacterSortMenu({ setter, anchorEl }) {
  const { setSortOptionAnchorEl } = setter;
  /* REDUX */

  const project = useSelector((state) => state.project.project);
  const { characterData } = useSelector((state) => state.character);
  /* STATES */

  const [sortMode, setSortMode] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [sortType, setSortType] = useState(null);

  /* HOOKS */
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
        const type = value.data[attr].type;
        if (type === "image" || type === "long") {
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

  /* FUNCTION */
  /**
   * 정렬 모드 설정
   */
  const handleChangeSortMode = (event) => {
    setSortMode(event.target.value);
  };
  /**
   * 정렬옵션 메뉴 관련 Handle
   */

  const handleSortOptionMenuClose = () => {
    setSortOptionAnchorEl(null);
  };
  const handleSortOptionMenuWheel = (event) => {
    event.stopPropagation();
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

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
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
  );
}
