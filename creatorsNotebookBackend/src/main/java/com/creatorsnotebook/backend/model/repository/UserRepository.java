package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  public UserEntity findByEmail(String email);

  public boolean existsByEmail(String email);

  public UserEntity findByNo(long userNo);

  @Modifying
  @Query("UPDATE UserEntity ue set ue.password = :encodedPassword WHERE ue.email = :email")
  void updatePassword(String email, String encodedPassword);
}
