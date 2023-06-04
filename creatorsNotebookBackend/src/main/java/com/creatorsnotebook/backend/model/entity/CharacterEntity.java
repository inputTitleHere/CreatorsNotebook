package com.creatorsnotebook.backend.model.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "character")
@Builder
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class CharacterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "uuid", columnDefinition = "UUID")
    private UUID uuid;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user.no")
    private UserEntity creator;

    @ManyToOne
    @JoinColumn(name = "project.uuid")
    private ProjectEntity projectEntity;

    @Column(name = "create_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private LocalDateTime createDate;

    @Column(name = "edit_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime editDate;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private List<String> dataOrder = new ArrayList<>();

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> data = new HashMap<>();

}
