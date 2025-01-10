import { AppBar, Toolbar, Typography, IconButton, Container, Box, Button } from '@mui/material';
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    { icon: <LinkedInIcon sx={{ fontSize: 28 }} />, url: 'https://www.linkedin.com/in/cameronarmijo000/', label: 'LinkedIn' },
    { icon: <TwitterIcon sx={{ fontSize: 28 }} />, url: 'https://x.com', label: 'X (Twitter)' },
    { icon: <InstagramIcon sx={{ fontSize: 28 }} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <GitHubIcon sx={{ fontSize: 28 }} />, url: 'https://github.com/cama0000', label: 'GitHub' },
    { icon: <LanguageIcon sx={{ fontSize: 28 }} />, url: 'https://acama.netlify.app/', label: 'Personal Website' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#531c70', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ flexDirection: 'column', py: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 3,
            mb: 6
          }}>
            <Typography variant="h3" sx={{ 
              color: 'gold', 
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Do it all in one place.
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'white',
              textAlign: 'center',
              maxWidth: '600px',
              opacity: 0.9
            }}>
              Join other students already using Prism.
            </Typography>
            <Link href="/register" passHref>
              <Button 
                variant="contained"
                size="large"
                sx={{ 
                  bgcolor: 'gold',
                  color: '#531c70',
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '9999px',
                  '&:hover': {
                    bgcolor: '#ffd700',
                    transform: 'translateY(-4px)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                Register now
              </Button>
            </Link>
          </Box>

          <Box sx={{ 
            width: '100%', 
            height: '1px', 
            bgcolor: 'rgba(255,255,255,0.1)', 
            mb: 6 
          }} />

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'white',
                    padding: 2,
                    '&:hover': { 
                      color: 'gold',
                      transform: 'translateY(-4px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>

            {/* Copyright */}
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center'
              }}
            >
              &copy; {new Date().getFullYear()} Prism. All rights reserved.
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
