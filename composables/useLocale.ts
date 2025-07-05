export const useLocale = () => {
  const { locale, setLocale } = useI18n();

  let cookieExpires = new Date();
  cookieExpires.setFullYear(cookieExpires.getFullYear() + 1);

  const localeFromCookie = useCookie<string>('locale', {
    default: () => 'en',
    watch: true,
    secure: true,
    expires: cookieExpires,
  });

  setLocale(localeFromCookie.value);

  const switchLocale = () => {
    localeFromCookie.value = locale.value === 'en' ? 'id' : 'en';

    setLocale(localeFromCookie.value);
  };

  return { locale, switchLocale };
};