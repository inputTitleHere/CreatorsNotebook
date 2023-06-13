import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { object, string } from "prop-types";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthority } from "../../../../../utils/projectUtils";
import { KeyboardDoubleArrowDown, Settings } from "@mui/icons-material";
import {
  addCharacterAttribute,
  updateCharacterAttrOrder,
} from "../../../../../redux-store/slices/characterSlice";
import Short from "./modalComponents/Short";
import Long from "./modalComponents/Long";
import NumberComponent from "./modalComponents/Number";
import Image from "./modalComponents/Image";
import { fetchByJson } from "../../../../../utils/fetch";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CharacterModalOption from "./modalComponents/CharacterModalOption";

CharacterModal.propTypes = {
  characterUuid: string, // slice의 characters상 순서.
  handleFunctions: object,
};
export default function CharacterModal({ characterUuid, handleFunctions }) {
  /* STATES */
  const [newAttrAnchor, setNewAttrAnchor] = useState(null);
  const [popupAnchor, setPopupAnchor] = useState(null);
  const [attrName, setAttrName] = useState("");
  const [mousePos, setMousePos] = useState({ top: 0, left: 0 });
  const [isAskAttrNamePopupOpen, setIsAskAttrNamePopupOpen] = useState(false);
  const [characterOptionMenuAnchor,setCharacterOptionMenuAnchor] = useState(null);
  const [newAttrType, setNewAttrType] = useState(null);
  const newAttrButtonRef = useRef(null);
  /* HOOKS */
  const character = useSelector((state) => state.character.characterData)[
    characterUuid
  ];
  const projectData = useSelector((state) => state.project.project);
  const dispatch = useDispatch();
  const { handleModalClose, deleteCharacter } = handleFunctions;

  /* FUNCTIONS */
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
   * 바닥의 신규 속성 생성 버튼으로 이동한다.
   */
  const handleScrollToBottom = () => {
    newAttrButtonRef.current.scrollIntoView();
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
  const handleNewAttrNameInputChange = (event) => {
    if (event.target.value.length > 10) {
      alert("속성명은 10글자 이하로 해주세요!");
      return false;
    }
    setAttrName(event.target.value);
  };

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
    let payload = { name: attrName, characterUuid: characterUuid };
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
      characterUuid: characterUuid,
      data: {
        name: attrName,
        type: data.type,
        value: "",
      },
      order: character ? [...character.order, attrName] : [],
    };
    fetchByJson("/character/insertAttribute", "POST", toServer);
    setIsAskAttrNamePopupOpen(false);
  };

  /**
   * 드래그 종료시 해당위치에 속성을 배치하고 서버에 전송한다.
   */
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (destination.index === source.index) {
      return;
    }
    const order = [...character.order];
    order.splice(destination.index, 0, order.splice(source.index, 1)[0]);
    const data = {
      uuid: character.uuid,
      order: order,
    };
    const res = fetchByJson("/character/updateAttributeOrder", "PUT", data);
    if (res) {
      dispatch(
        updateCharacterAttrOrder({
          characterUuid,
          newOrder: order,
        })
      );
    }
  };

  const handleOpenOptionMenu = (event) => {
    setCharacterOptionMenuAnchor(event.currentTarget);
  };

  return (
    <Modal
      open={true}
      onClose={handleModalClose}
      keyboard="false"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          height: "95vh",
          minWidth: "600px",
          width: "70vw",
          outline: "none",
          padding: "0px 20px",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            {checkAuthority(projectData, 3) && (
              <>
                <Box>
                  <IconButton onClick={handleOpenOptionMenu}>
                    <Settings />
                  </IconButton>
                </Box>
                <CharacterModalOption 
                characterUuid={characterUuid}
                menuAnchor={characterOptionMenuAnchor}
                setters={{
                  setCharacterOptionMenuAnchor
                }}
                functions={{
                  deleteCharacter
                }}
                />
              </>
            )}
            <Box>
              <IconButton onClick={handleScrollToBottom}>
                <KeyboardDoubleArrowDown fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          {/* 캐릭터 정보 배치 */}
          <Droppable droppableId="characterModal" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {character?.order.length > 0 ? (
                  character.order.map((key, index) => {
                    const item = character.data[key];
                    switch (item.type) {
                      case "short":
                        return (
                          <Draggable key={key} draggableId={key} index={index}>
                            {(provided) => (
                              <Short
                                data={item}
                                characterUuid={characterUuid}
                                provided={provided}
                              />
                            )}
                          </Draggable>
                        );
                      case "long":
                        return (
                          <Draggable key={key} draggableId={key} index={index}>
                            {(provided) => (
                              <Long
                                data={item}
                                characterUuid={characterUuid}
                                provided={provided}
                              />
                            )}
                          </Draggable>
                        );
                      case "number":
                        return (
                          <Draggable key={key} draggableId={key} index={index}>
                            {(provided) => (
                              <NumberComponent
                                data={item}
                                characterUuid={characterUuid}
                                provided={provided}
                              />
                            )}
                          </Draggable>
                        );
                      case "image":
                        return (
                          <Draggable key={key} draggableId={key} index={index}>
                            {(provided) => (
                              <Image
                                data={item}
                                characterUuid={characterUuid}
                                provided={provided}
                              />
                            )}
                          </Draggable>
                        );
                    }
                  })
                ) : (
                  <Typography variant="h4" textAlign="center">
                    캐릭터의 내용을 채워봐요!
                  </Typography>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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
              ref={newAttrButtonRef}
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
        </DragDropContext>
      </Paper>
    </Modal>
  );
}
