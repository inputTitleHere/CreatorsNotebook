import { Chip } from "@mui/material";
import { bool, object, string } from "prop-types";
import { fetchByForm, fetchByJson } from "../../../../../../utils/fetch";
import { useDispatch, useSelector } from "react-redux";
import {
  addCharacterTag,
  removeCharacterTag,
  removeTagFromAllCharacters,
} from "../../../../../../redux-store/slices/characterSlice";
import { useState } from "react";
import { removeTagFromStore } from "../../../../../../redux-store/slices/tagSlice";

TagChip.propTypes = {
  characterUuid: string,
  isTagDeleteMode: bool,
  tagSet: object,
  tagNo: string,
};

export default function TagChip({
  characterUuid,
  isTagDeleteMode,
  tagSet,
  tagNo,
}) {
  const dispatch = useDispatch();
  const tagData = useSelector((state) => state.tag.tagMap)[tagNo];
  const [isTagged, setIsTagged] = useState(tagSet.has(Number(tagNo)));
  /**
   * 태그를 삭제한다(프로젝트에서 삭제한다.)
   * 또한 모든 캐릭터에서 해당 태그를 제거한다.
   */
  const handleTagDelete = async () => {
    if (
      confirm(
        "정말로 태그를 삭제하시겠습니까?\n모든 캐릭터에서 해당 태그가 삭제됩니다."
      )
    ) {
      const formData = new FormData();
      formData.append("tagNo", tagNo);
      await fetchByForm("/tag/delete", "DELETE", formData);
      dispatch(removeTagFromStore({ tagNo }));
      dispatch(removeTagFromAllCharacters({ tagNo }));
    }
  };

  /**
   * 캐릭터에 태그를 추가 또는 삭제한다.
   * 만약 이미 선택된 태그면 태그를 해제한다.
   * 선택되지 않었던 태그라면 신규 관계를 추가한다.
   */
  const handleTagClick = async () => {
    const toSend = {
      characterDto: {
        uuid: characterUuid,
      },
      tagDto: {
        no: tagData.no,
      },
    };
    if (isTagged) {
      await fetchByJson("/tag/untag", "DELETE", toSend);
      setIsTagged(false);
      dispatch(removeCharacterTag({ characterUuid, tagNo: tagData.no }));
    } else {
      await fetchByJson("/tag/tag", "POST", toSend);
      dispatch(addCharacterTag({ characterUuid, tagNo: tagData.no }));
      setIsTagged(true);
    }
  };

  if (isTagDeleteMode) {
    return (
      <Chip
        label={tagData.tagName}
        onDelete={handleTagDelete}
        onClick={handleTagClick}
        sx={{
          bgcolor: tagData.hexColor,
          color: tagData.textColor,
          boxShadow: isTagged
            ? `0px 0px 3px 6px ${tagData.hexColor}80`
            : "none",
        }}
      />
    );
  } else {
    return (
      <Chip
        label={tagData.tagName}
        onClick={handleTagClick}
        sx={{
          bgcolor: tagData.hexColor,
          color: tagData.textColor,
          boxShadow: isTagged
            ? `0px 0px 3px 6px ${tagData.hexColor}80`
            : "none",
        }}
      />
    );
  }
}
