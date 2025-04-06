package com.search.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    private final String secret;
    private final MyUserDetails myUserDetails;

    public JwtFilter(String secret, MyUserDetails myUserDetails) {
        this.secret = secret;
        this.myUserDetails = myUserDetails;
    }

//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//        HttpServletRequest httpRequest = (HttpServletRequest) request;
//        String token = httpRequest.getHeader("Authorization");
//
//        if (token != null && token.startsWith("Bearer ")) {
//            token = token.substring(7);
//            try {
//                DecodedJWT jwt = JWT.require(Algorithm.HMAC256(secret)).build().verify(token);
//                String username = jwt.getSubject();
//
//                UserDetails userDetails = myUserDetails.loadUserByUsername(username);
//
//                UsernamePasswordAuthenticationToken auth =
//                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//
//                SecurityContextHolder.getContext().setAuthentication(auth);
//            } catch (Exception e) {
//                SecurityContextHolder.clearContext();
//            }
//        }
//
//        chain.doFilter(request, response);
//    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String token = null;

        // 1. Попробуем найти токен в Cookie
        if (httpRequest.getCookies() != null) {
            for (var cookie : httpRequest.getCookies()) {
                if ("accessToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        // 2. Если не найден — fallback в Authorization header
        if (token == null) {
            String authHeader = httpRequest.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        // 3. Если есть токен — проверим
        if (token != null) {
            try {
                DecodedJWT jwt = JWT.require(Algorithm.HMAC256(secret)).build().verify(token);
                String username = jwt.getSubject();

                UserDetails userDetails = myUserDetails.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }
        }

        chain.doFilter(request, response);
    }
}
