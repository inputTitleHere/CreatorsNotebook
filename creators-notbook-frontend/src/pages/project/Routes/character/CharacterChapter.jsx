import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AddCircleOutline } from "@mui/icons-material";

export default function CharacterChapter() {
  const user = useSelector((state) => state.user.user);
  const characterList = useSelector((state)=>state.project.characters);
  console.log(characterList);
  return (
    <>
      <Box > 
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            padding: "10px",
          }}
        >
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutline />}
              sx={{
                fontSize: "1.3rem",
              }}
            >
              <Typography>신규 캐릭터 생성</Typography>{" "}
            </Button>
          </Grid>
          <Grid item>정렬옵션</Grid>
        </Grid>
      </Box>
      <Box>

      </Box>
    </>
  );
}
