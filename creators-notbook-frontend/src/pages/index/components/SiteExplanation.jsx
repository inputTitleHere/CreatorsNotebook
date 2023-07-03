import styled from "@emotion/styled";
import { Box, Chip, Typography } from "@mui/material";

export default function SiteExplanation() {
  const BodyText = styled(Typography)(() => ({
    fontSize: "24px",
  }));

  return (
    <Box
      sx={{
        marginTop: "12px",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">&#187;</Typography>
      &nbsp;
      <Chip label={<BodyText>웹소설</BodyText>} /> ,
      <Chip label={<BodyText>웹툰</BodyText>} />,
      <Chip label={<BodyText>만화</BodyText>} />
      &nbsp;등 창작자 분들을 위한 정보관리 서비스입니다.
    </Box>
  );
}
