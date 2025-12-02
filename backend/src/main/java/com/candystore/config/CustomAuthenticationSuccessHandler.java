package com.candystore.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @org.springframework.beans.factory.annotation.Autowired
    private com.candystore.repository.LoginLogRepository loginLogRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        // Log Success
        String email = authentication.getName();
        loginLogRepository.save(new com.candystore.model.LoginLog(email, true, "Login realizado com sucesso"));

        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());

        String targetUrl = "/meus-pedidos";
        if (roles.contains("ROLE_ADMIN")) {
            targetUrl = "/admin";
        }

        String requestedWith = request.getHeader("X-Requested-With");
        String accept = request.getHeader("Accept");

        if ("XMLHttpRequest".equals(requestedWith) || (accept != null && accept.contains("application/json"))) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.getWriter().write("{\"redirectUrl\": \"" + targetUrl + "\"}");
            response.getWriter().flush();
        } else {
            response.sendRedirect(targetUrl);
        }
    }
}
