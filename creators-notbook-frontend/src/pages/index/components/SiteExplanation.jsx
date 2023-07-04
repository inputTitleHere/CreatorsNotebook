import styled from "@emotion/styled";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchByUrl } from "@src/utils/fetch";

/**
 * 인덱스 페이지에서 사이트에 대한 설명을 명시한다.
 */
export default function SiteExplanation() {
  /* UseStates */
  const [countStatistics, setCountStatictics] = useState({
    projectCount: 0,
    characterCount: 0,
  });

  /* Styled MUI components */
  const BodyText = styled(Typography)(() => ({
    fontSize: "24px",
  }));

  const LeftDoubleArrow = styled(Typography)(() => ({
    marginRight: "5px",
  }));

  const BodyStack = styled(Stack)(() => ({
    fontSize: "24px",
  }));

  const NoWrapBox = styled(Box)(() => ({
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
  }));

  /**
   * 로드시 서버로부터 전체 프로젝트 개수와 캐릭터 개수를 가져와 표시한다.
   */
  useEffect(() => {
    (async () => {
      const data = await fetchByUrl("/project/count-statistics");
      console.log(data);
      setCountStatictics(data);
    })();
  }, []);

  return (
    <Box>
      <BodyStack direction="row" alignItems="center" flexWrap="wrap">
        <LeftDoubleArrow variant="h2">&#187;</LeftDoubleArrow>
        <NoWrapBox>&#8220;창작자의 노트북&#8221;은</NoWrapBox>
        <Chip label={<BodyText>웹소설</BodyText>} /> ,
        <Chip label={<BodyText>웹툰</BodyText>} />,
        <Chip label={<BodyText>만화</BodyText>} />
        <NoWrapBox>
          &nbsp;등 크리에이터 분들을 위한 정보관리 서비스를 제공하고자 합니다.
        </NoWrapBox>
      </BodyStack>
      <BodyStack>
        <NoWrapBox>
          <LeftDoubleArrow variant="h2" display="inline">
            &#187;
          </LeftDoubleArrow>
          현재
        </NoWrapBox>
        <Box sx={{
          marginLeft:"24px"
        }}>
          <NoWrapBox>
            <Typography
              variant="h4"
              sx={{
                margin: "0px 5px",
              }}
              display="inline"
            >
              {countStatistics.projectCount}
            </Typography>
            개의 프로젝트와
          </NoWrapBox>
          <NoWrapBox>
            <Typography
              variant="h4"
              sx={{
                margin: "0px 5px",
              }}
              display="inline"
            >
              {countStatistics.characterCount}
            </Typography>
            명의 캐릭터가 생성되었습니다!
          </NoWrapBox>
        </Box>
      </BodyStack>
    </Box>
  );
}
