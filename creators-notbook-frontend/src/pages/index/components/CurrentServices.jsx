import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { string } from "prop-types";
import { useMemo } from "react";
import SecondaryDivider from "../../common/simpleComponents/SecondaryDivider";

export default function CurrentServices() {
  return (
    <Box 
    sx={{
      marginBottom:"48px"
    }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">지원중인 서비스 목록</Typography>
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            margin: "0px 10px",
          }}
        />
        <Chip
          color="primary"
          label={
            // APP_VERSION -> vite.config.js에 설정
            // package.json에 명시된 현재 버전을 가져온다.
            // eslint-disable-next-line no-undef
            <Typography variant="h6">웹사이트 버전 : {APP_VERSION} </Typography>
          }
        />
      </Box>
      <SecondaryDivider/> 
      {/* 지원하는 서비스 목록 */}
      <Stack direction="row" alignItems="center" sx={{
        marginTop:"24px"
      }}>
        <CurrentServiceItem text={"캐릭터 관리"} />
      </Stack>
    </Box>
  );
}


/**
 * 지원중인 각기 서비스 내용에 대한 컴포넌트
 */
CurrentServiceItem.propTypes = {
  text: string,
};
function CurrentServiceItem({ text }) {
  const size = useMemo(() => {
    return 100;
  }, []);

  return (
    <Box
      sx={{
        border: "5px solid",
        borderColor: "secondary.main",
        borderRadius: "50%",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
}
