package com.workfinder.security;

import com.workfinder.oauth2.OAuth2SuccessHandler;
import com.workfinder.oauth2.security.OAuth2UserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final JWTFilter jwtFilter;
    private final OAuth2UserDetailsService oAuth2UserDetailsService;
    private final OAuth2SuccessHandler successHandler;

    public SecurityConfiguration(JWTFilter jwtFilter, OAuth2UserDetailsService oAuth2UserDetailsService, OAuth2SuccessHandler successHandler, OAuth2SuccessHandler successHandler1) {
        this.jwtFilter = jwtFilter;
        this.oAuth2UserDetailsService = oAuth2UserDetailsService;
        this.successHandler = successHandler1;
    }



    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy
                        (SessionCreationPolicy.STATELESS))
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request.requestMatchers
                        ("/api/auth/login","/api/auth/employerRegistration"
                                ,"/api/auth/employeeRegistration","/api/auth/verify",
                                "/api/auth/resend","/api/auth/reset-password","/api/jobs","/api/auth/forgot-password")
                        .permitAll().anyRequest().authenticated())

                .oauth2Login(oauth2 -> oauth2.successHandler(successHandler)
                        .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserDetailsService)
                                .oidcUserService(oAuth2UserDetailsService :: loadUser)))

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

}
