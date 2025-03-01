import { StyleSheet, Platform, Dimensions } from 'react-native';

// Define gradient colors to match the CSS variables
const GRADIENT_COLORS = {
  from: '#4040C0', // hsl(240, 70%, 50%)
  via: '#C040C0', // hsl(280, 70%, 50%)
  to: '#C04080',  // hsl(320, 70%, 50%)
};

// Define keyframes animation for web
const blobKeyframes = Platform.OS === 'web' ? `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
` : '';

// Inject styles into the document if on web
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  // Check if the style element already exists to avoid duplicates
  if (!document.getElementById('blob-keyframes-header')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'blob-keyframes-header';
    styleElement.textContent = blobKeyframes;
    document.head.appendChild(styleElement);
  }
  
  // Add responsive styles
  if (!document.getElementById('responsive-header-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'responsive-header-styles';
    styleElement.textContent = `
      /* Base styles */
      .header-nav-desktop {
        display: flex;
      }
      .header-hamburger {
        display: none;
      }
      
      /* Mobile styles */
      @media (max-width: 768px) {
        .header-nav-desktop {
          display: none !important;
        }
        .header-hamburger {
          display: flex !important;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  // Add a script to ensure the hamburger is visible
  if (!document.getElementById('header-responsive-script')) {
    const scriptElement = document.createElement('script');
    scriptElement.id = 'header-responsive-script';
    scriptElement.textContent = `
      function updateHeaderResponsiveness() {
        const isMobile = window.innerWidth <= 768;
        const desktopNavs = document.querySelectorAll('.header-nav-desktop');
        const hamburgers = document.querySelectorAll('.header-hamburger');
        
        desktopNavs.forEach(nav => {
          nav.style.display = isMobile ? 'none' : 'flex';
        });
        
        hamburgers.forEach(hamburger => {
          hamburger.style.display = isMobile ? 'flex' : 'none';
        });
      }
      
      // Run on load
      updateHeaderResponsiveness();
      
      // Run on resize
      window.addEventListener('resize', updateHeaderResponsiveness);
    `;
    document.head.appendChild(scriptElement);
  }
}

export const headerStyles = StyleSheet.create({
  // Wrapper for the entire header including mobile menu
  headerWrapper: {
    width: '100%',
    position: 'relative',
    zIndex: 1000,
  },
  // Main header container
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: GRADIENT_COLORS.via, // Use the middle gradient color as fallback
    position: 'relative',
    zIndex: 1000,
    overflow: 'hidden', // Keep the blobs contained
    width: '100%', // Full width on all platforms
    ...(Platform.OS === 'web' && {
      paddingHorizontal: 16,
      paddingVertical: 16,
      // For web, we can use actual gradients
      background: `linear-gradient(135deg, ${GRADIENT_COLORS.from}, ${GRADIENT_COLORS.via}, ${GRADIENT_COLORS.to})`,
    }),
  },
  // Inner content container for desktop
  headerInner: {
    width: '100%',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    // Only shown on desktop web
    ...(Platform.OS !== 'web' && {
      display: 'none',
    }),
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  // Desktop buttons container
  desktopButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    // Only shown on desktop web
    ...(Platform.OS !== 'web' && {
      display: 'none',
    }),
  },
  // Hamburger menu button
  hamburgerButton: {
    padding: 8,
    display: 'flex', // Always display by default
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 4,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }),
  },
  cartButton: {
    marginLeft: 5,
    marginRight: 5,
    padding: 8,
  },
  // Mobile menu styles
  mobileMenu: {
    width: '100%',
    backgroundColor: GRADIENT_COLORS.via,
    overflow: 'hidden',
    ...(Platform.OS === 'web' && {
      background: `linear-gradient(135deg, ${GRADIENT_COLORS.from}, ${GRADIENT_COLORS.via}, ${GRADIENT_COLORS.to})`,
    }),
  },
  mobileMenuContent: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  mobileNavButton: {
    width: '100%',
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  mobileAuthButtons: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 16,
  },
  // Blob animation styles for web
  ...(Platform.OS === 'web' && {
    blob: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      opacity: 0.7,
      borderRadius: 100,
      filter: 'blur(60px)',
      animation: 'blob 7s infinite',
    },
    blobDelayed2s: {
      animationDelay: '2s',
    },
    blobDelayed4s: {
      animationDelay: '4s',
    },
  }),
}); 