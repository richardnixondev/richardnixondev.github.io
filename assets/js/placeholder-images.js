// Placeholder image for profile
const profileImagePlaceholder = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="#e9ecef"/>
  <text x="150" y="150" font-family="Arial" font-size="50" text-anchor="middle" dominant-baseline="middle" fill="#6c757d">RN</text>
</svg>
`;

// Placeholder images for projects
const projectPlaceholders = {
  ecommerce: `
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#dee2e6"/>
    <text x="150" y="100" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="#6c757d">E-commerce</text>
  </svg>
  `,
  portfolio: `
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#dee2e6"/>
    <text x="150" y="100" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="#6c757d">Portfolio</text>
  </svg>
  `,
  taskManager: `
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#dee2e6"/>
    <text x="150" y="100" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="#6c757d">Task Manager</text>
  </svg>
  `,
  chatApp: `
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#dee2e6"/>
    <text x="150" y="100" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="#6c757d">Chat App</text>
  </svg>
  `,
  weatherApp: `
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#dee2e6"/>
    <text x="150" y="100" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="#6c757d">Weather App</text>
  </svg>
  `,
  authService: `
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#dee2e6"/>
    <text x="150" y="100" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="middle" fill="#6c757d">Auth Service</text>
  </svg>
  `
};

// Create favicon
const favicon = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="16" fill="#0366D6"/>
  <text x="16" y="16" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#ffffff">RN</text>
</svg>
`;

// Export SVGs to files
function exportSVGs() {
  // Create profile image
  const profileSvgBlob = new Blob([profileImagePlaceholder], {type: 'image/svg+xml'});
  const profileUrl = URL.createObjectURL(profileSvgBlob);
  
  // Create project images
  const projectUrls = {};
  for (const [key, svg] of Object.entries(projectPlaceholders)) {
    const blob = new Blob([svg], {type: 'image/svg+xml'});
    projectUrls[key] = URL.createObjectURL(blob);
  }
  
  // Create favicon
  const faviconBlob = new Blob([favicon], {type: 'image/svg+xml'});
  const faviconUrl = URL.createObjectURL(faviconBlob);
  
  return {
    profile: profileUrl,
    projects: projectUrls,
    favicon: faviconUrl
  };
}

// This would be used in a real environment to export the SVGs
// const imageUrls = exportSVGs();
