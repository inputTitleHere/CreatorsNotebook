package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.entity.UserProjectBridgeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProjectBridgeRepository extends JpaRepository<UserProjectBridgeEntity,Long> {

  @Query("select upbe from UserProjectBridgeEntity upbe left join fetch upbe.projectEntity where upbe.userEntity.no = :no")
  List<UserProjectBridgeEntity> findAllFetchJoinByUserEntity(@Param("no") long userNo);


}
