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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#1A1A1A',
    zIndex: SPACING.zIndex.header + 1,
    ...(Platform.OS === 'web' && {
      boxShadow: '4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)',
    }),
  },
  mobileMenuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: SPACING.zIndex.header,
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(4px)',
    }),
  },
  mobileMenuContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1A1A1A',
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1A1A1A',
  },
  mobileMenuTitle: {
    color: COLORS.text.light,
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: SPACING.sm,
  },
  mobileMenuItems: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  mobileNavButton: {
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: '#1A1A1A',
  },
  mobileAuthButtons: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: SPACING.md,
    backgroundColor: '#1A1A1A',
  },
}); 