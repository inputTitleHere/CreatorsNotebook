import {
  Box,
  Button,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { number, object } from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthority } from "../../../../../utils/projectUtils";
import { Delete } from "@mui/icons-material";
import { addCharacterAttribute } from "../../../../../redux-store/slices/characterSlice";
import Short from "./modalComponents/Short";
import Long from "./modalComponents/Long";
import NumberComponent from "./modalComponents/Number";
import Image from "./modalComponents/Image";
import { fetchByJson } from "../../../../../utils/fetch";

CharacterModal.propTypes = {
  characterIndex: number, // slice의 characters상 순서.
  handleFunctions: object,
};
export default function CharacterModal({ characterIndex, handleFunctions }) {
  /* STATES */
  const [newAttrAnchor, setNewAttrAnchor] = useState(null);
  const [popupAnchor, setPopupAnchor] = useState(null);
  const [attrName, setAttrName] = useState("");
  const [mousePos, setMousePos] = useState({ top: 0, left: 0 });
  const [isAskAttrNamePopupOpen, setIsAskAttrNamePopupOpen] = useState(false);
  const [newAttrType, setNewAttrType] = useState(null);
  /* HOOKS */
  const character = useSelector((state) => state.character.characters)[
    characterIndex
  ];
  const projectData = useSelector((state) => state.project.project);
  const dispatch = useDispatch();
  const { handleModalClose, deleteCharacter } = handleFunctions;

  /* FUNCTIONS */
  const handleDeleteCharacter = () => {
    if (confirm("삭제하시겠습니까? 삭제된 캐릭터는 복구가 불가능합니다.")) {
      deleteCharacter(character.uuid, characterIndex);
    }
  };
  /**
   * 마우스 클릭 위치를 사용해 신규 속성 추가 메뉴를 연다.
   */
  const handleNewAttrClick = (event) => {
    setMousePos({ left: event.clientX, top: event.clientY });
    setNewAttrAnchor(event.currentTarget);
  };
  /**
   * 신규속성추가 메뉴를 닫는다.
   */
  const handleMenuClose = () => {
    setNewAttrAnchor(null);
  };
  /**
   * 신규 속성 타입 클릭시(선택시) popup을 열고 state를 설정한다.
   */
  const handleCreateAttr = (event) => {
    setIsAskAttrNamePopupOpen(true);
    setPopupAnchor(event.currentTarget);
    setMousePos({ left: event.clientX, top: event.clientY });
    setNewAttrType(event.target.getAttribute("data-type"));
    handleMenuClose();
  };
  /**
   * 속성명 변경을 제어 및 글자수 10글자 안넘게 제한한다.
   */
  const handleNewAttrNameInputChange=(event)=>{
    if(event.target.value.length>10){
      alert("속성명은 10글자 이하로 해주세요!");
      return false;
    }
    setAttrName(event.target.value);
  }

  /**
   * 신규 속성명을 묻는 팝업창을 닫는다.
   */
  const handleNewAttrNameClose = () => {
    setPopupAnchor(null);
    setIsAskAttrNamePopupOpen(false);
  };

  /**
   * 신규 속성을 생성한다.
   * - 사용가능한 속성명인지 검증한다.
   * - 속성을 생성하여 slice에 저장한다.
   * - 속성명을 묻는 popup을 제거한다.
   */
  const createNewAttr = () => {
    if (attrName.length === 0) {
      alert("속성명은 최소 1글자 이상으로 해주세요");
      return false;
    }
    if (attrName in character.data) {
      alert("중복된 속성명은 사용할 수 없습니다.");
      return false;
    }
    let payload = { name: attrName, characterIndex: characterIndex };
    let data = {
      name: attrName,
      type: undefined,
      value: "",
      editMode: true,
    };
    if (newAttrType === "단문") {
      data.type = "short";
    } else if (newAttrType === "장문") {
      data.type = "long";
    } else if (newAttrType === "숫자") {
      data.type = "number";
    } else if (newAttrType === "이미지") {
      data.type = "image";
    }
    payload.data = data;
    dispatch(addCharacterAttribute(payload));
    setAttrName("");

    // data to send to server
    let toServer = {
      name: attrName,
      characterUuid: character.uuid,
      data: {
        name: attrName,
        type: data.type,
        value: "",
      },
      order: character ? [...character.order, attrName] : [],
    };
    fetchByJson("/character/insertAttr", "POST", toServer);
    setIsAskAttrNamePopupOpen(false);
  };

  return (
    <Modal open={true} onClose={handleModalClose} keyboard="false">
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflowY: "scroll",
          height: "95vh",
          minWidth: "600px",
          width: "60vw",
          outline: "none",
          padding:"0px 20px"
        }}
      >
        {checkAuthority(projectData, 2) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Delete />}
              color="warning"
              onClick={handleDeleteCharacter}
            >
              캐릭터 삭제
            </Button>
          </Box>
        )}
        {/* 캐릭터 정보 배치 */}
        {character?.order.length>0 ? (character.order.map((key, index) => {
          const item = character.data[key];
          switch (item.type) {
            case "short":
              return (
                <Short
                  key={index}
                  data={item}
                  characterIndex={characterIndex}
                />
              );
            case "long":
              return (
                <Long key={index} data={item} characterIndex={characterIndex} />
              );
            case "number":
              return (
                <NumberComponent
                  key={index}
                  data={item}
                  characterIndex={characterIndex}
                />
              );
            case "image":
              return (
                <Image
                  key={index}
                  data={item}
                  characterIndex={characterIndex}
                />
              );
          }
        })):
        <Typography variant="h4" textAlign="center"> 캐릭터의 내용을 채워봐요! </Typography>
      }
        {/* 신규 데이터 컬럼 생성하기 */}
        {checkAuthority(projectData, 3) && (
          <Box
            sx={{
              border: "2px dashed",
              borderColor: "primary.main",
              margin: "10px 20px",
              height: "5rem",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleNewAttrClick}
          >
            <Typography>신규 속성 추가</Typography>
          </Box>
        )}
        <Menu
          anchorEl={newAttrAnchor}
          open={Boolean(newAttrAnchor)}
          onClose={handleMenuClose}
          anchorReference="anchorPosition"
          anchorPosition={mousePos}
        >
          <MenuItem data-type="단문" onClick={handleCreateAttr}>
            단문 텍스트
          </MenuItem>
          <MenuItem data-type="장문" onClick={handleCreateAttr}>
            장문 텍스트
          </MenuItem>
          <MenuItem data-type="숫자" onClick={handleCreateAttr}>
            숫자
          </MenuItem>
          <MenuItem data-type="이미지" onClick={handleCreateAttr}>
            이미지
          </MenuItem>
        </Menu>
        {/* PopUp창 */}
        {isAskAttrNamePopupOpen && (
          <Popover
            open={true}
            anchorEl={popupAnchor}
            onClose={handleNewAttrNameClose}
            anchorReference="anchorPosition"
            anchorPosition={mousePos}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <TextField
                id="attr-name"
                variant="filled"
                label="10글자 이하의 신규 속성명"
                value={attrName}
                onChange={handleNewAttrNameInputChange}
                autoFocus
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    createNewAttr();
                  }
                }}
                sx={{
                  width: "20rem",
                }}
              ></TextField>
              <Button variant="contained" onClick={createNewAttr}>
                생성
              </Button>
            </Box>
          </Popover>
        )}
      </Paper>
    </Modal>
  );
}
