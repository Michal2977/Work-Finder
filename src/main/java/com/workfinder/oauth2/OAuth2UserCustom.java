package com.workfinder.oauth2;

import com.workfinder.enums.OAuth2UserProvider;

import java.util.Map;

public class OAuth2UserCustom extends OAuth2UserDetails{
    public OAuth2UserCustom(Map<String, Object> attributes, String name, String email, OAuth2UserProvider provider, String providerId) {
        super(attributes, name, email, provider, providerId);
    }
}
