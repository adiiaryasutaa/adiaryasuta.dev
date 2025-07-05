export const useTheme = () => {
  const colorMode = useColorMode();

  let cookieExpires = new Date();
  cookieExpires.setFullYear(cookieExpires.getFullYear() + 1);

  const theme = useCookie('theme', {
    default: () => 'light',
    watch: true,
    secure: true,
    expires: cookieExpires,
  });

  const switchTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    colorMode.preference = theme.value;
  };

  return { theme, switchTheme };
};