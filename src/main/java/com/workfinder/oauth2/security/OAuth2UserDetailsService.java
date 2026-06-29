package com.workfinder.oauth2.security;

import com.workfinder.entity.Employee;
import com.workfinder.entity.Role;
import com.workfinder.entity.User;
import com.workfinder.entity.UserProvider;
import com.workfinder.enums.OAuth2UserProvider;
import com.workfinder.oauth2.OAuth2UserCustom;
import com.workfinder.oauth2.OAuth2UserFactory;
import com.workfinder.repository.RoleRepository;
import com.workfinder.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserDetailsService  extends DefaultOAuth2UserService {

    private final OidcUserService oidcUserService = new OidcUserService();
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request){
        OAuth2User oAuth2User = super.loadUser(request);
        return processOAuth2User(request.getClientRegistration().getRegistrationId(),oAuth2User.getAttributes());
    }

    public OidcUser loadUser(OidcUserRequest request){
        OidcUser oidcUser = oidcUserService.loadUser(request);

        OAuth2User oAuth2User = processOAuth2User(request.getClientRegistration().getRegistrationId(),
                oidcUser.getAttributes());

        return new DefaultOidcUser(oAuth2User.getAuthorities(),oidcUser.getIdToken(),
                oidcUser.getUserInfo(),"email");
    }

    public OAuth2User processOAuth2User(String registrationId, Map<String,Object> attributes){
        OAuth2UserProvider provider = OAuth2UserProvider.valueOf(registrationId.toUpperCase());
        OAuth2UserCustom custom = OAuth2UserFactory.create(provider,attributes);

        User user = userRepository.findByEmailWithProviders(custom.getEmail()).orElse(null);

        if (user == null){
            user = registerUser(provider,custom);
        }else {
            user = updateExsitingUser(user,provider,custom);
        }
        return new SecurityUserDetails(user,attributes);
    }

    private User registerUser(OAuth2UserProvider provider, OAuth2UserCustom custom){
        User user = new User();
        Role role = roleRepository.findByRole("EMPLOYEE");

        user.setEmail(custom.getEmail());
        user.setEnabled(true);
        user.setCreateAt(LocalDateTime.now());
        user.createRole(role);
        user.setDisplayName(custom.getName());



        Employee employee = new Employee();
        employee.setUser(user);
        user.setEmployee(employee);



        UserProvider userProvider = new UserProvider();
        userProvider.setProvider(provider);
        userProvider.setProviderId(custom.getProviderId());
        userProvider.setUser(user);

        user.addProvider(userProvider);

        return userRepository.save(user);
    }

    private User updateExsitingUser(User user,OAuth2UserProvider provider,OAuth2UserCustom custom){

        boolean hasProvider = user.getProviders().stream().anyMatch(p -> p.getProvider() == provider);

        if (!hasProvider){
            UserProvider userProvider = new UserProvider();
            userProvider.setProvider(provider);
            userProvider.setProviderId(custom.getProviderId());
            userProvider.setUser(user);
            user.addProvider(userProvider);
        }
        user.setDisplayName(custom.getName());
        user.setEnabled(true);
        user.setVerificationCode(null);
        user.setExpiresAt(null);
        return userRepository.save(user);
    }
}
