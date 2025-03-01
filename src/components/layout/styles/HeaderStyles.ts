import { StyleSheet, Platform } from 'react-native';
import { COLORS, createGradient } from '../../../theme/colors';
import { SPACING } from '../../../theme/spacing';

// Inject styles into the document if on web
if (Platform.OS === 'web' && typeof document !== 'undefined') {
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
      @media (max-width: ${SPACING.breakpoints.md}px) {
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
        const isMobile = window.innerWidth <= ${SPACING.breakpoints.md};
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
    zIndex: SPACING.zIndex.header,
  },
  // Main header container
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.gradient.via, // Fallback color
    position: 'relative',
    zIndex: SPACING.zIndex.header,
    width: '100%', // Full width on all platforms
    ...(Platform.OS === 'web' && {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.md,
      // For web, we can use actual gradients
      background: createGradient('90deg'),
    }),
  },
  // Inner content container for desktop
  headerInner: {
    width: '100%',
    maxWidth: SPACING.container.xl,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    color: COLORS.text.light,
    fontSize: 24,
    fontWeight: '700',
    marginRight: SPACING.xl,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    ...(Platform.OS !== 'web' && {
      display: 'none',
    }),
  },
  navLinkItem: {
    marginRight: SPACING.xs,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSectionItem: {
    marginRight: SPACING.sm,
  },
  // Desktop buttons container
  desktopButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.sm,
    ...(Platform.OS !== 'web' && {
      display: 'none',
    }),
  },
  desktopButtonItem: {
    marginRight: SPACING.sm,
  },
  // Hamburger menu button
  hamburgerButton: {
    padding: SPACING.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: SPACING.radius.sm,
    marginLeft: SPACING.sm,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  cartButton: {
    marginLeft: SPACING.xs,
    marginRight: SPACING.xs,
    padding: SPACING.sm,
  },
  // Mobile menu styles
  mobileMenu: {
    width: '100%',
    backgroundColor: COLORS.gradient.via,
    overflow: 'hidden',
    ...(Platform.OS === 'web' && {
      background: createGradient('90deg'),
    }),
  },
  mobileMenuContent: {
    padding: SPACING.md,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  mobileNavButton: {
    width: '100%',
    marginVertical: SPACING.xs,
    alignItems: 'flex-start',
  },
  mobileAuthButtons: {
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    paddingTop: SPACING.md,
  },
}); 