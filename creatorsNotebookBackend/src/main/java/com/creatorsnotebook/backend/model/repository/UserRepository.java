package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,String> {
    public UserEntity findByEmail(String email);
}
