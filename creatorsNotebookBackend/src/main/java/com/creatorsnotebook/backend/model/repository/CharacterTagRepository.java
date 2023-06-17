package com.creatorsnotebook.backend.model.repository;

import com.creatorsnotebook.backend.model.entity.CharacterTagBridge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterTagRepository extends JpaRepository<CharacterTagBridge, Long> {

}
