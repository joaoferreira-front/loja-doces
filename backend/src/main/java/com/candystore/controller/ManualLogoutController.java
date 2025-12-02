package com.candystore.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

@RestController
@RequestMapping("/api/manual")
public class ManualLogoutController {

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("--- MANUAL LOGOUT REQUEST RECEIVED ---");

        // 1. Use Spring Security's handler (Standard way)
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }

        // 2. Manual Cookie Clearing (Brute Force Backup)
        String[] cookieNames = { "DOCES_SESSION", "remember-me", "JSESSIONID" };
        String ctxPath = request.getContextPath();
        if (ctxPath == null || ctxPath.isEmpty())
            ctxPath = "/";

        String[] paths = { "/", "/api", "/login", ctxPath };

        for (String cookieName : cookieNames) {
            for (String path : paths) {
                Cookie cookie = new Cookie(cookieName, null);
                cookie.setPath(path);
                cookie.setHttpOnly(true);
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }

        System.out.println("--- COOKIES CLEARED AND SESSION INVALIDATED ---");

        return ResponseEntity.ok().body("{\"message\": \"Logged out successfully\"}");
    }
}
