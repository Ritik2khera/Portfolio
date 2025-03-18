/**
 * Scrolls to the specified section with smooth animation
 * @param sectionId The ID of the section to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  
  if (element) {
    // Get the navbar height to offset the scroll position
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Checks if an element is in the viewport
 * @param element The element to check
 * @param offset Optional offset to consider (default: 0)
 * @returns Boolean indicating if the element is in viewport
 */
export const isInViewport = (element: HTMLElement, offset: number = 0): boolean => {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight - offset) &&
    rect.bottom >= offset &&
    rect.left <= window.innerWidth &&
    rect.right >= 0
  );
};

/**
 * Gets the current active section based on scroll position
 * @param sectionIds Array of section IDs to check
 * @param offset Optional offset from the top (default: 100px)
 * @returns The ID of the active section or null if none is active
 */
export const getActiveSection = (sectionIds: string[], offset: number = 100): string | null => {
  for (const id of sectionIds) {
    const section = document.getElementById(id);
    
    if (section && isInViewport(section, offset)) {
      return id;
    }
  }
  
  return null;
}; 