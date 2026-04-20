package com.candystore.config;

import com.candystore.model.Usuario;
import com.candystore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

        @Autowired
        private UsuarioRepository usuarioRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Bean
        public CommandLineRunner initialData() {
                return args -> {
                        // Criar Admin se não existir
                        // Criar ou Atualizar Admin
                        java.util.Optional<Usuario> adminOpt = usuarioRepository.findByEmail("admin@demo.com");
                        if (adminOpt.isPresent()) {
                                Usuario admin = adminOpt.get();
                                admin.setSenha(passwordEncoder.encode("Admin@123"));
                                admin.setRole(Usuario.Role.ADMIN);
                                usuarioRepository.save(admin);
                                System.out.println("Senha do Admin ATUALIZADA para: Admin@123");
                        } else {
                                Usuario admin = new Usuario();
                                admin.setNome("Administrador");
                                admin.setEmail("admin@demo.com");
                                admin.setSenha(passwordEncoder.encode("Admin@123"));
                                admin.setProvider(Usuario.Provider.LOCAL);
                                admin.setRole(Usuario.Role.ADMIN);
                                usuarioRepository.save(admin);
                                System.out.println("Usuário Admin CRIADO: admin@demo.com / Admin@123");
                        }

                        // Criar Usuario Demo se não existir
                        if (usuarioRepository.findByEmail("usuario@demo.com").isEmpty()) {
                                Usuario demoUser = new Usuario();
                                demoUser.setNome("Usuario Demo");
                                demoUser.setEmail("usuario@demo.com");
                                demoUser.setSenha(passwordEncoder.encode("User@123"));
                                demoUser.setProvider(Usuario.Provider.LOCAL);
                                demoUser.setRole(Usuario.Role.USER);
                                usuarioRepository.save(demoUser);
                                System.out.println("Usuário Demo criado: usuario@demo.com / User@123");
                        }
                };
        }
}
