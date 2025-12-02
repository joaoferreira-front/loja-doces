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
                        if (usuarioRepository.findByEmail("admin@doces.com").isEmpty()) {
                                Usuario admin = new Usuario();
                                admin.setNome("Administrador");
                                admin.setEmail("admin@doces.com");
                                admin.setSenha(passwordEncoder.encode("admin"));
                                admin.setProvider(Usuario.Provider.LOCAL);
                                usuarioRepository.save(admin);
                                System.out.println("Usuário Admin criado: admin@doces.com / admin");
                        }

                        // Criar Neto se não existir
                        if (usuarioRepository.findByEmail("neto").isEmpty()) {
                                Usuario neto = new Usuario();
                                neto.setNome("Neto");
                                neto.setEmail("neto");
                                neto.setSenha(passwordEncoder.encode("123"));
                                neto.setProvider(Usuario.Provider.LOCAL);
                                usuarioRepository.save(neto);
                                System.out.println("Usuário Neto criado: neto / 123");
                        }
                };
        }
}
