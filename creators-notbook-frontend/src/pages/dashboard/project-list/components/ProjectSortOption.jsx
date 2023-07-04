import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjectSortOption } from "@src/redux-store/slices/projectSlice";

export default function ProjectSortOption() {
  const [sortOptionAnchorEl, setSortOptionAnchorEl] = useState(null);
  const { projectSortOptions } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  /* useEffect */
  useEffect(() => {
    const psoString = localStorage.getItem("pso");
    let pso;
    if (psoString) {
      pso = JSON.parse(psoString);
    } else {
      pso = {
        sortBy: "editDate",
        direction: "desc",
      };
      localStorage.setItem("pso", JSON.stringify(pso));
    }
    dispatch(setProjectSortOption(pso));
  }, [dispatch]);

  /* FUNCTION  */
  const handleOpenSortOptionMenu = (event) => {
    if (sortOptionAnchorEl) setSortOptionAnchorEl(null);
    else setSortOptionAnchorEl(event.currentTarget);
  };

  const handleCloseSortOptionMenu = () => setSortOptionAnchorEl(null);

  const handleSortModeChange = (event) => {
    dispatch(
      setProjectSortOption({
        ...projectSortOptions,
        sortBy: event.target.getAttribute("data-mode"),
      })
    );
  };

  const handleDirectionChange = (event) => {
    dispatch(
      setProjectSortOption({
        ...projectSortOptions,
        direction: event.target.getAttribute("data-direction"),
      })
    );
  };

  return (
    <Stack direction="row" alignItems="center">
      <Typography
        variant="h6"
        onClick={handleOpenSortOptionMenu}
        sx={{
          cursor: "pointer",
        }}
      >
        프로젝트 정렬
      </Typography>
      {sortOptionAnchorEl ? (
        <ArrowDropUp fontSize="large" />
      ) : (
        <ArrowDropDown fontSize="large" />
      )}
      <Menu
        open={Boolean(sortOptionAnchorEl)}
        anchorEl={sortOptionAnchorEl}
        onClose={handleCloseSortOptionMenu}
        transitionDuration={0}
      >
        <Box
          sx={{
            padding: "0px 10px",
          }}
        >
          <Typography variant="h6">정렬기준</Typography>
          <MenuItem
            selected={projectSortOptions.sortBy === "createDate"}
            onClick={handleSortModeChange}
            data-mode={"createDate"}
          >
            생성일
          </MenuItem>
          <MenuItem
            selected={projectSortOptions.sortBy === "editDate"}
            onClick={handleSortModeChange}
            data-mode={"editDate"}
          >
            수정일
          </MenuItem>
          <Divider />
          <Typography variant="h6">정렬방향</Typography>
          <MenuItem
            selected={projectSortOptions.direction === "asc"}
            onClick={handleDirectionChange}
            data-direction={"asc"}
          >
            오름차순
          </MenuItem>
          <MenuItem
            selected={projectSortOptions.direction === "desc"}
            onClick={handleDirectionChange}
            data-direction={"desc"}
          >
            내림차순
          </MenuItem>
        </Box>
      </Menu>
    </Stack>
  );
}
