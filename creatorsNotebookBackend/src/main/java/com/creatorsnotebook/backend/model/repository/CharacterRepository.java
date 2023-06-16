package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.CharacterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CharacterRepository extends JpaRepository<CharacterEntity, UUID> {

  @Query("SELECT ce FROM CharacterEntity ce left join fetch ce.creator where ce.projectEntity.uuid = :uuid")
  List<CharacterEntity> findAllByProjectUuid(@Param("uuid") UUID projectUuid);

  CharacterEntity findByUuid(UUID uuid);


  @Modifying
  @Query("DELETE from CharacterEntity ce WHERE ce.projectEntity.uuid = :uuid")
  void deleteCharactersByProject(@Param("uuid") UUID projectUuid);
}
