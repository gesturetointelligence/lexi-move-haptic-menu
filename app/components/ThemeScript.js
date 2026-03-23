export default function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const themeMode = localStorage.getItem('theme-mode') || 'system';
        let theme;

        if (themeMode === 'system') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
          theme = themeMode;
        }

        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.colorScheme = theme;
      } catch (e) {
        console.error('Failed to set initial theme:', e);
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}
