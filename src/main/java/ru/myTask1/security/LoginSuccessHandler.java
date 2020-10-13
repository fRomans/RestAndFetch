package ru.myTask1.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {
        String pageName = null;
        try {
            for (GrantedAuthority role : authentication.getAuthorities()) {
                if (role.getAuthority().equals("ROLE_ADMIN")) {
                    pageName = "/admin";
                    break;
                } else if (role.getAuthority().equals("ROLE_USER")) {
                    pageName = "/user";
                } else {
                    System.out.println(" NO this role !!!");

                }
            }
        } catch (NullPointerException e) {
            System.out.println("very Baaaaaaaaad!!!!" + e);
        }
        httpServletResponse.sendRedirect(pageName);
    }
}