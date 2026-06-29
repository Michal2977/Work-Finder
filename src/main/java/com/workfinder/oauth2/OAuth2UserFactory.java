package com.workfinder.oauth2;

import com.workfinder.enums.OAuth2UserProvider;

import java.util.HashMap;
import java.util.Map;

public class OAuth2UserFactory {

    public static OAuth2UserCustom create(OAuth2UserProvider provider, Map<String,Object> attributes){
        Map<String ,Object> map = new HashMap<>();
        String name = null;
        String email = null;
        String providerId = null;

        switch (provider){
            case GOOGLE -> {
                name = attributes.get("name").toString();
                email = attributes.get("email").toString();
                providerId = attributes.get("sub").toString();
            }case FACEBOOK -> {
                name = attributes.get("name").toString();
                email = attributes.get("email").toString();
                providerId = attributes.get("id").toString();
            }
        }
        map.put("name",name);
        map.put("email",email);
        map.put("providerId",providerId);
        map.putAll(attributes);

        return new OAuth2UserCustom(attributes,name,email,provider,providerId);
    }
}
