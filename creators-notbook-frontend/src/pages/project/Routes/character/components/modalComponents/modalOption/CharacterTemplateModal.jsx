import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { bool, number, object, string } from "prop-types";
import { useEffect, useState } from "react";
import {
  fetchByForm,
  fetchByJson,
  fetchByUrl,
} from "@src/utils/fetch";
import { Close, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setCharacterData } from "@src/redux-store/slices/characterSlice";

CharacterTemplateModal.propTypes = {
  open: bool,
  characterUuid: string,
  projectUuid: string,
  setters: object,
};
export default function CharacterTemplateModal({
  open,
  characterUuid,
  projectUuid,
  setters,
}) {
  const { setIsTemplateSelectionModalOpen } = setters;

  const [templateData, setTemplateData] = useState([]);
  const [infoNo, setInfoNo] = useState(undefined);
  const character = useSelector(
    (state) => state.character.characterData[characterUuid]
  );
  const dispatch = useDispatch();
  /**
   * 템플릿 모달을 열면 바로 서버로부터 템플릿 정보를 로드해와서 배치한다.
   */
  useEffect(() => {
    (async () => {
      const queryString = new URLSearchParams({
        projectUuid: projectUuid,
      });
      const templates = await fetchByUrl(
        "/characterTemplate/loadTemplates",
        "GET",
        queryString
      );
      console.log(templates);
      setTemplateData(templates);
    })();
  }, [projectUuid]);

  /**
   * 각기 템플릿에 마우스가 올라가면 인덱스 번호를 수거해와 state에 저장한다.
   */
  const handleMouseEnter = (index) => {
    return () => {
      setInfoNo(index);
    };
  };

  /**
   * 모달을 닫는다.
   */
  const handleModalClose = () => {
    setIsTemplateSelectionModalOpen(false);
  };

  /**
   * 템플릿을 목록에서 제거한다.
   */
  const removeTemplate = (index) => {
    const list = [...templateData];
    list.splice(index, 1);
    setTemplateData(list);
  };

  /**
   * 속성명을 한글속성으로 변경해준다.
   * @param {string} item 서버에 저장된 속성명
   * @returns 한글로 변경된 속성명
   */
  const parseTypeToKoreanText = (item) => {
    switch (templateData[infoNo].data[item].type) {
      case "short":
        return "단문";
      case "long":
        return "장문";
      case "number":
        return "숫자";
      case "image":
        return "이미지";
    }
  };

  /**
   * 캐릭터 템플릿을 해당 캐릭터에 적용 및 서버에 전송, 로컬에 반영한다.
   */
  const applyCharacterTemplate = (index) => {
    return async () => {
      console.log(templateData[index]);
      console.log(character);
      if (
        confirm(
          `템플릿을 적용하시겠습니까?\n기존 속성과 겹치지 않는 신규 속성만 추가됩니다.`
        )
      ) {
        const tempData = templateData[index];
        const charData = { ...character.data };
        const charOrder = [...character.order];
        tempData.dataOrder.forEach((item) => {
          if (charData[item] === undefined) {
            charData[item] = tempData.data[item];
            charOrder.push(item);
          }
        });
        console.log(charData);
        console.log(charOrder);
        const toSend = {
          uuid:characterUuid,
          data:charData,
          order:charOrder,
        }
        const result = await fetchByJson("/character/applyTemplate","PUT",toSend);
        if(result.data){
          dispatch(setCharacterData({ characterUuid, charData, charOrder }));
          setIsTemplateSelectionModalOpen(false);
        }
      }
    };
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "70vw",
          maxWidth: "900px",
          maxHeight: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "3em",
            width: "100%",
            padding: "10px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginLeft: "10px",
            }}
          >
            캐릭터 템플릿 목록
          </Typography>
          <Typography variant="span">
            ※ 템플릿 적용시 현재 캐릭터에 없는 속성들만 추가됩니다.
          </Typography>
          <IconButton
            sx={{
              marginRight: "15px",
            }}
            onClick={handleModalClose}
          >
            <Close fontSize="large" />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <Stack
            spacing={0.5}
            sx={{
              paddingTop: "10px",
              maxHeight: "90vh",
              height: "60vh",
              overflowY: "scroll",
              width: "56%",
            }}
          >
            {templateData.map((item, index) => {
              return (
                <TemplateItem
                  templateData={item}
                  key={index}
                  index={index}
                  handlers={{ handleMouseEnter }}
                  functions={{ removeTemplate, applyCharacterTemplate }}
                />
              );
            })}
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              width: "43%",
              overflowY: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Typography variant="h5">
                {infoNo !== undefined ? templateData[infoNo].name : ""}
              </Typography>
            </Box>
            <Divider />
            <TableContainer
              sx={{
                maxHeight: "57vh",
                overflowY: "scroll",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ padding: "2px" }}>
                      <Typography variant="h6">번호</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ padding: "2px" }}>
                      <Typography variant="h6">속성명</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ padding: "2px" }}>
                      <Typography variant="h6">속성타입</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {templateData[infoNo]?.dataOrder.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center" size="small">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{item}</TableCell>
                        <TableCell align="center" size="medium">
                          {parseTypeToKoreanText(item)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}

TemplateItem.propTypes = {
  templateData: object,
  handlers: object,
  functions: object,
  index: number,
};
function TemplateItem({ templateData, handlers, functions, index }) {
  const { name, no } = templateData;
  const { handleMouseEnter } = handlers;
  const { removeTemplate, applyCharacterTemplate } = functions;
  /**
   * 해당 캐릭터 템플릿을 삭제한다.
   */
  const deleteCharacterTemplate = async (event) => {
    event.stopPropagation();
    console.log(no);
    if (confirm("템플릿을 삭제합니다.")) {
      const formData = new FormData();
      formData.append("no", no);
      const result = await fetchByForm(
        "/characterTemplate/delete",
        "DELETE",
        formData
      );
      if (result?.data) {
        removeTemplate(index);
      }
    }
  };

  return (
    <MenuItem
      sx={{
        width: "100%",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "3px",
      }}
      onMouseEnter={handleMouseEnter(index)}
      onClick={applyCharacterTemplate(index)}
    >
      <Typography noWrap>{name}</Typography>
      <Button
        variant="outlined"
        startIcon={<Delete />}
        color="warning"
        onClick={deleteCharacterTemplate}
      >
        삭제
      </Button>
    </MenuItem>
  );
}
