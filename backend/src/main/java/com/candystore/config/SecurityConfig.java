package com.candystore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS
                                .csrf(csrf -> csrf.disable()) // Disable CSRF for REST API simplicity in MVP
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/admin/**").authenticated() // Protect Admin
                                                .anyRequest().permitAll() // Allow everything else (API, Frontend
                                                                          // assets)
                                )
                                .formLogin(form -> form
                                                .defaultSuccessUrl("/admin", true)
                                                .permitAll())
                                .logout(logout -> logout.permitAll());

                return http.build();
        }

        @Bean
        public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
                org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
                configuration.setAllowedOrigins(java.util.Arrays.asList("*"));
                configuration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(java.util.Arrays.asList("*"));
                org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

        @Bean
        public UserDetailsService userDetailsService() {
                // AQUI VOCÊ DEFINE O LOGIN E SENHA DO ADMIN
                // Para mudar, basta trocar o "admin" e "doces123" abaixo.
                UserDetails admin = User.withDefaultPasswordEncoder()
                                .username("admin") // <-- Seu Usuário
                                .password("doces123") // <-- Sua Senha
                                .roles("ADMIN")
                                .build();

                return new InMemoryUserDetailsManager(admin);
        }
}
