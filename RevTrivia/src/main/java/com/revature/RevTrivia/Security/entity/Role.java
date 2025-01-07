package com.revature.RevTrivia.Security.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.revature.RevTrivia.Security.entity.Permission.*;

@RequiredArgsConstructor
public enum Role {
    STUDENT(
            Set.of(
                    STUDENT_DELETE,
                    STUDENT_CREATE,
                    STUDENT_READ,
                    STUDENT_UPDATE
            )
    ),
    EDUCATOR(
            Set.of(
                    EDUCATOR_DELETE,
                    EDUCATOR_CREATE,
                    EDUCATOR_READ,
                    EDUCATOR_UPDATE
            )
    );

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getUserAuthorities() {
        List<SimpleGrantedAuthority> authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
