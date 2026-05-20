export const useLocale = () => {
  const { locale, setLocale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const cookieExpires = new Date();
  cookieExpires.setFullYear(cookieExpires.getFullYear() + 1);

  const localeFromCookie = useCookie<string>("locale", {
    default: () => "en",
    expires: cookieExpires,
  });

  const switchLocale = () => {
    const next = locale.value === "en" ? "id" : "en";
    localeFromCookie.value = next;
    setLocale(next);
    navigateTo(switchLocalePath(next));
  };

  return { locale, switchLocale };
};
