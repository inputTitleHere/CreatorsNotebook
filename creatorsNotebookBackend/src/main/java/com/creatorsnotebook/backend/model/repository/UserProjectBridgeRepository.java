package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.entity.UserProjectBridgeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserProjectBridgeRepository extends JpaRepository<UserProjectBridgeEntity,Long> {

  /**
   * 어떤 유저가 보유한 모든 유저-프로젝트 브릿지를 가져온다.
   * @param userNo 검색할 유저 번호
   * @return UserProjectBridgeEntity 목록
   */
  @Query("select upbe from UserProjectBridgeEntity upbe left join fetch upbe.projectEntity where upbe.userEntity.no = :no")
  List<UserProjectBridgeEntity> findAllFetchJoinByUserEntity(@Param("no") long userNo);


  /**
   * 특정 프로젝트와 특정 유저의 연관관계를 확인한다.
   * @param projectUuid 프로젝트 고유번호
   * @param userNo 유저 번호
   * @return 해당 유저번호와 프로젝트
   */
  @Query("SELECT upbe from UserProjectBridgeEntity upbe left join fetch upbe.userEntity where upbe.projectEntity.uuid = :projectUuid and upbe.userEntity.no = :userNo")
  UserProjectBridgeEntity findByProjectUuidAndUserNo(@Param("projectUuid") UUID projectUuid, @Param("userNo") long userNo);
}
