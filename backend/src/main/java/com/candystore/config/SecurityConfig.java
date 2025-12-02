package com.candystore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @org.springframework.beans.factory.annotation.Autowired
        private org.springframework.security.web.authentication.AuthenticationSuccessHandler authenticationSuccessHandler;

        @org.springframework.beans.factory.annotation.Autowired
        private org.springframework.security.web.authentication.AuthenticationFailureHandler authenticationFailureHandler;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/admin/**").hasRole("ADMIN")
                                                .requestMatchers("/api/register", "/api/auth/status",
                                                                "/api/manual/logout")
                                                .permitAll()
                                                .requestMatchers("/meus-pedidos/**", "/api/checkout").authenticated()
                                                .anyRequest().permitAll())
                                .formLogin(form -> form
                                                .loginPage("/login")
                                                .loginProcessingUrl("/api/login")
                                                .successHandler(authenticationSuccessHandler)
                                                .failureHandler(authenticationFailureHandler)
                                                .permitAll())
                                // .oauth2Login(oauth2 -> oauth2
                                // .loginPage("/login")
                                // .defaultSuccessUrl("/meus-pedidos", true))
                                .logout(logout -> logout
                                                .logoutUrl("/api/logout")
                                                .invalidateHttpSession(true)
                                                .clearAuthentication(true)
                                                .deleteCookies("DOCES_SESSION", "remember-me", "JSESSIONID")
                                                .logoutSuccessHandler((request, response, authentication) -> {
                                                        response.setStatus(
                                                                        jakarta.servlet.http.HttpServletResponse.SC_OK);
                                                })
                                                .permitAll())
                                .rememberMe(remember -> remember
                                                .key("uniqueAndSecretKey")
                                                .tokenValiditySeconds(604800)); // 7 days

                return http.build();
        }

        @Bean
        public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
                org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
                configuration.setAllowedOriginPatterns(java.util.Arrays.asList("*"));
                configuration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(java.util.Arrays.asList("*"));
                configuration.setAllowCredentials(true);
                org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

        @Bean
        public org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
                return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
        }

        @Bean
        public org.springframework.security.authentication.AuthenticationManager authenticationManager(
                        org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration authenticationConfiguration)
                        throws Exception {
                return authenticationConfiguration.getAuthenticationManager();
        }
}
