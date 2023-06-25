package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.CharacterTagBridgeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CharacterTagRepository extends JpaRepository<CharacterTagBridgeEntity, Long> {

  @Modifying
  @Query("Delete from CharacterTagBridgeEntity ctbe where ctbe.characterEntity.uuid = :characterUuid and ctbe.tagEntity.no = :tagNo")
  void deleteCharacterTag(@Param("characterUuid") UUID characterUuid, @Param("tagNo") long tagNo);
}
