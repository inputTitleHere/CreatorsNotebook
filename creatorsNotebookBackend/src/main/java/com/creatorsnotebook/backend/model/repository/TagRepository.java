package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<TagEntity,Long> {


  @Query("SELECT te from TagEntity te where te.projectEntity.uuid = :projectUuid")
  List<TagEntity> findAllByProjectUuid(@Param("projectUuid") UUID projectUuid);
}
