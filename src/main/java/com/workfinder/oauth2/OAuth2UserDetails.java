package com.workfinder.oauth2;

import com.workfinder.enums.OAuth2UserProvider;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public class OAuth2UserDetails implements OAuth2User {


    private final Map<String,Object> attributes;
    private final String name;
    private final String email;
    private final OAuth2UserProvider provider;
    private final String providerId;

    public OAuth2UserDetails(Map<String, Object> attributes, String name, String email, OAuth2UserProvider provider, String providerId) {
        this.attributes = attributes;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.providerId = providerId;
    }

    @Override
    public <A> @Nullable A getAttribute(String name) {
        return (A) attributes.get(name);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getName() {
        return name;
    }

    public OAuth2UserProvider provider(){
        return provider;
    }

    public String getEmail(){
        return email;
    }

    public String getProviderId(){
        return providerId;
    }
}
