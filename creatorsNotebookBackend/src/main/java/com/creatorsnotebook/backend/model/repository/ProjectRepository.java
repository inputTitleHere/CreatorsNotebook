package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, UUID> {


  @Modifying
  @Query("UPDATE ProjectEntity p set p.title = :title where p.uuid = :uuid")
  int changeProjectTitle(@Param("uuid") UUID uuid, @Param("title") String title);

  @Modifying
  @Query("UPDATE ProjectEntity p set p.description = :description where p.uuid = :uuid")
  int changeProjectDescription(@Param("uuid") UUID uuid, @Param("description") String description);

  @Modifying
  @Query("UPDATE ProjectEntity p set p.image = :image where p.uuid = :uuid")
  int changeProjectImage(@Param("uuid") UUID uuid, @Param("image") String newImageName);
}
