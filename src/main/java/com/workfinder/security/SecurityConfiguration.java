package com.workfinder.security;

import com.workfinder.oauth2.OAuth2SuccessHandler;
import com.workfinder.oauth2.security.OAuth2UserDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {




    private final JWTFilter jwtFilter;
    private  final OAuth2UserDetailService oAuth2UserDetailService;
    private final OAuth2SuccessHandler successHandler;

    public SecurityConfiguration(JWTFilter jwtFilter, OAuth2UserDetailService oAuth2UserDetailService, OAuth2SuccessHandler successHandler) {
        this.jwtFilter = jwtFilter;
        this.oAuth2UserDetailService = oAuth2UserDetailService;
        this.successHandler = successHandler;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration source = new CorsConfiguration();

        source.setAllowedMethods(List.of("*"));
        source.setAllowedHeaders(List.of("*"));
        source.setAllowedOrigins(List.of("http://localhost:5173"));
        source.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource cors = new UrlBasedCorsConfigurationSource();
        cors.registerCorsConfiguration("/**",source);

        return cors;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity security)throws Exception{
        security.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy
                        (SessionCreationPolicy.STATELESS))
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request.requestMatchers
                        ("/api/auth/login","/api/auth/employee-registration",
                                "/api/auth/employer-registration","/api/jobs","/api/auth/verify","/api/auth/resend",
                                "/api/auth/reset-password","/api/auth/forgot-password")
                        .permitAll().anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2.successHandler(successHandler)
                        .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserDetailService)
                                .oidcUserService(oAuth2UserDetailService :: loadUser)))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return security.build();
    }
}
