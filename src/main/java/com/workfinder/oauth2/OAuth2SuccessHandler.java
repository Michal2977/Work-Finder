package com.workfinder.oauth2;

import com.workfinder.entity.User;
import com.workfinder.oauth2.security.SecurityUserDetails;
import com.workfinder.security.JWTService;
import com.workfinder.service.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JWTService jwtService;
    private final AuthService authService;

    public OAuth2SuccessHandler(JWTService jwtService, AuthService authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        SecurityUserDetails userDetails = (SecurityUserDetails) authentication.getPrincipal();


        String email = userDetails.getUsername();

        User user = authService.findByEmail(email);

        String token = jwtService.generateToken(user.getEmail());

        String redirect = "http://localhost:5173/oauth2/success?token=" + URLEncoder.encode(token,StandardCharsets.UTF_8);

        if (userDetails.isLinked()){
            redirect += "&status=LINKED";
        }

        response.sendRedirect(redirect);
    }

}

