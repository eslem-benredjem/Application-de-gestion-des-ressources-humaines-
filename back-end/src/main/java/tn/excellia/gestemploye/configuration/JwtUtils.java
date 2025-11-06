package tn.excellia.gestemploye.configuration;

import org.springframework.stereotype.Component;
import tn.excellia.gestemploye.models.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
//méthodes  pour la gestion des tokens JWT dans une application
@Component
public class JwtUtils {

    private final Key SECRET_KEY = Keys.hmacShaKeyFor("wbRKQ2h6yIvSdZvuZvO57Aa0wtrXh7KlTriBPOnj0Fc=".getBytes());

    public String generateToken(String username, Role role, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role.name());  // Ajout du rôle dans le payload
        claims.put("userId", userId);     // Ajout de l'ID de l'utilisateur dans le payload

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 heures
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
//Cette méthode extrait l'ID de l'utilisateur du token JWT.
    public Long extractUserId(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("userId", Long.class); // Récupère l'ID de l'utilisateur
    }
    //Cette méthode extrait le nom d'utilisateur du token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    //Cette méthode extrait les rôles de l'utilisateur
    public List<String> extractRoles(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return (List<String>) claims.get("roles");
    }

    public boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }
}
