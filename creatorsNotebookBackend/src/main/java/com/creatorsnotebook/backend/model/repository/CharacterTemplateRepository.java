package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.CharacterTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CharacterTemplateRepository extends JpaRepository<CharacterTemplateEntity,Long> {

  @Query("SELECT cte FROM CharacterTemplateEntity cte LEFT JOIN FETCH cte.project WHERE cte.project.uuid = :projectUuid ORDER BY cte.no desc")
  List<CharacterTemplateEntity> findAllByProjectUuid(@Param("projectUuid") UUID projectUuid);

  @Modifying
  @Query("DELETE FROM CharacterTemplateEntity cte WHERE cte.project.uuid = :projectUuid")
  void deleteCharacterTemplatesByProject(@Param("projectUuid") UUID projectUuid);
}
