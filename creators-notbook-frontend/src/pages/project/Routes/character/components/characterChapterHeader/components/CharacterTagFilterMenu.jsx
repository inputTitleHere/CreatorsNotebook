import {
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Menu,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { object } from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTagToFilter,
  removeTagFromFilter,
  setTagFilter,
  toggleTagFilter,
  toggleTagMode,
} from "../../../../../../../redux-store/slices/tagSlice";

CharacterTagFilterMenu.propTypes = {
  setter: object,
  anchorEl: object,
};
export default function CharacterTagFilterMenu({ setter, anchorEl }) {
  /* CONSTS */
  const { setTagFilterAnchorEl } = setter;
  /* REDUX */
  const { isToggleFilterActive, tagFilterSet, tagMap, filterMode } =
    useSelector((state) => state.tag);
  const { project } = useSelector((state) => state.project);
  /* HOOKS */
  const dispatch = useDispatch();

  /* EFFECTS */
  /**
   * 초기 로드시 태그설정 로드해오기
   */
  useEffect(() => {
    // characterTagFilter(ctf)
    if (!project?.uuid) {
      return;
    }
    const ctfString = localStorage.getItem("ctf");
    let ctf = undefined;
    if (ctfString) {
      ctf = JSON.parse(ctfString);
      // 해당 프로젝트에 대한 정보가 없는 경우(이 프로젝트로는 처음)
      if (!ctf[project.uuid]) {
        ctf[project.uuid] = {
          isToggleFilterActive: false,
          tagFilterSet: {},
          filterMode: "AND",
        };
        localStorage.setItem("ctf", JSON.stringify(ctf));
      }
    } else {
      // 완전 초기로 localstorage가 빈 경우
      ctf = {
        [project.uuid]: {
          isToggleFilterActive: false,
          tagFilterSet: {},
          filterMode: "AND",
        },
      };
      localStorage.setItem("ctf", JSON.stringify(ctf));
    }
    dispatch(
      setTagFilter({
        isToggleFilterActive: ctf[project.uuid].isToggleFilterActive,
        tagFilterSet: ctf[project.uuid].tagFilterSet,
        filterMode: ctf[project.uuid].filterMode,
      })
    );
  }, [project, dispatch]);

  /**
   * 태그필터 변경시마다 로컬에 저장
   */
  useEffect(() => {
    const ctfString = localStorage.getItem("ctf");
    if (ctfString && Boolean(project?.uuid)) {
      const ctf = JSON.parse(ctfString);
      ctf[project?.uuid] = {
        isToggleFilterActive: Boolean(isToggleFilterActive),
        tagFilterSet,
        filterMode,
      };
      if (ctf) {
        localStorage.setItem("ctf", JSON.stringify(ctf));
      }
    }
  }, [project?.uuid, isToggleFilterActive, tagFilterSet, filterMode]);

  /* FUNCTION */
  // 필터 메뉴 닫기
  const handleTagFilterMenuClose = () => setTagFilterAnchorEl(null);
  // 필터 적용 여부 토글
  const handleToggleFilter = (event) => {
    dispatch(toggleTagFilter(event.currentTarget.checked));
  };

  /**
   *
   * @param {number} tagNo 태그 고유번호
   * @returns tagNo가 사용되는 태그 사용 토글 콜백함수
   */
  const toggleTag = (tagNo) => {
    return (event) => {
      if (event.currentTarget.checked) {
        dispatch(addTagToFilter(tagNo));
      } else {
        dispatch(removeTagFromFilter(tagNo));
      }
    };
  };

  /**
   *
   */
  const handleToggleMode = (event) => {
    if (event.currentTarget.checked) {
      dispatch(toggleTagMode("OR"));
    } else {
      dispatch(toggleTagMode("AND"));
    }
  };

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleTagFilterMenuClose}
    >
      <FormGroup
        sx={{
          padding: "0px 10px",
        }}
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          <FormLabel>필터 적용</FormLabel>
          <Switch
            checked={isToggleFilterActive ? true : false}
            onChange={handleToggleFilter}
          />
        </Stack>
        <Divider />
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          justifyContent="center"
        >
          <Tooltip title="태그 모두 포함">
            <Typography variant="h6">AND</Typography>
          </Tooltip>
          <Switch
            checked={filterMode === "OR"}
            onChange={handleToggleMode}
            color="default"
          />
          <Tooltip title="태그 중 하나라도 포함">
            <Typography variant="h6">OR</Typography>
          </Tooltip>
        </Stack>
        <Divider />
        <Stack>
          {Object.keys(tagMap).map((tagNo, index) => {
            const tagData = tagMap[tagNo];
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox checked={tagFilterSet[tagNo] ? true : false} />
                }
                onChange={toggleTag(tagNo)}
                label={
                  <Chip
                    label={tagData.tagName}
                    sx={{
                      bgcolor: tagData.hexColor,
                      color: tagData.textColor,
                      cursor: "pointer",
                    }}
                  />
                }
              />
            );
          })}
        </Stack>
      </FormGroup>
    </Menu>
  );
}
