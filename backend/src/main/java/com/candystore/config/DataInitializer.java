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
                        java.util.Optional<Usuario> adminOpt = usuarioRepository.findByEmail("admin@doces.com");
                        if (adminOpt.isPresent()) {
                                Usuario admin = adminOpt.get();
                                admin.setSenha(passwordEncoder.encode("Jucabala@123"));
                                admin.setRole(Usuario.Role.ADMIN);
                                usuarioRepository.save(admin);
                                System.out.println("Senha do Admin ATUALIZADA para: Jucabala@123");
                        } else {
                                Usuario admin = new Usuario();
                                admin.setNome("Administrador");
                                admin.setEmail("admin@doces.com");
                                admin.setSenha(passwordEncoder.encode("Jucabala@123"));
                                admin.setProvider(Usuario.Provider.LOCAL);
                                admin.setRole(Usuario.Role.ADMIN);
                                usuarioRepository.save(admin);
                                System.out.println("Usuário Admin CRIADO: admin@doces.com / Jucabala@123");
                        }

                        // Criar Neto se não existir
                        if (usuarioRepository.findByEmail("neto").isEmpty()) {
                                Usuario neto = new Usuario();
                                neto.setNome("Neto");
                                neto.setEmail("neto");
                                neto.setSenha(passwordEncoder.encode("123"));
                                neto.setProvider(Usuario.Provider.LOCAL);
                                neto.setRole(Usuario.Role.USER);
                                usuarioRepository.save(neto);
                                System.out.println("Usuário Neto criado: neto / 123");
                        }
                };
        }
}
