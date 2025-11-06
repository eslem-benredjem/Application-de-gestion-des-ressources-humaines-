package tn.excellia.gestemploye.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tn.excellia.gestemploye.repositories.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

//un filtre  pour valider les tokens JWT
@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    public JWTAuthorizationFilter(JwtUtils jwtUtils, UserRepository userRepository) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        //Récupération du token depuis l'en-tête de la requête(bearer
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7); // Récupérer le token après "Bearer "
        String username = jwtUtils.extractUsername(token);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = (UserDetails) userRepository.findByAdresseMail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (jwtUtils.validateToken(token, userDetails.getUsername())) {
                // Extraction de l'ID utilisateur depuis le token
                Long userId = jwtUtils.extractUserId(token);

                List<SimpleGrantedAuthority> authorities = userDetails.getAuthorities().stream()
                        .map(auth -> new SimpleGrantedAuthority(auth.getAuthority()))
                        .collect(Collectors.toList());

                // Ajouter l'ID utilisateur dans les détails de l'authentification
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails, null, authorities);
                auth.setDetails(userId);  // Ajouter l'ID utilisateur

                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                System.out.println("Token invalide ou expiré");
            }
        }

        filterChain.doFilter(request, response);
    }

}
