package com.c5r.schoolapp_api.PasswordResetToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenService {
    @Autowired
    private TokenRepository tokenRepository;

    public PasswordResetToken save(PasswordResetToken token){ return tokenRepository.save(token);}
    public Optional<PasswordResetToken> findByToken(String token){ return tokenRepository.findByToken(token);}
}
