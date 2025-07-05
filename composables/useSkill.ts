import HTMLLogo from '@/assets/icons/html.svg';
import CSSLogo from '@/assets/icons/css.svg';
import BootstrapLogo from '@/assets/icons/bootstrap.svg';
import TailwindCSSLogo from '@/assets/icons/tailwindcss.svg';
import JavaScriptLogo from '@/assets/icons/javascript.svg';
import VueLogo from '@/assets/icons/vue.svg';
import PHPLogo from '@/assets/icons/php.svg';
import LaravelLogo from '@/assets/icons/laravel.svg';
import CPPLogo from '@/assets/icons/cpp.svg';
import JavaLogo from '@/assets/icons/java.svg';
import MySQLLogo from '@/assets/icons/mysql.svg';
import AndroidLogo from '@/assets/icons/android.svg';
import FirebaseLogo from '@/assets/icons/firebase.svg';
import type { Skill } from "@/models/skill";

export const useSkill = () => {
  return useState('skills', (): Skill[] => [
    { logo: HTMLLogo, name: 'HTML' },
    { logo: CSSLogo, name: 'CSS' },
    { logo: BootstrapLogo, name: 'Bootstrap' },
    { logo: TailwindCSSLogo, name: 'TailwindCSS' },
    { logo: JavaScriptLogo, name: 'Javascript' },
    { logo: VueLogo, name: 'Vue' },
    { logo: PHPLogo, name: 'PHP' },
    { logo: LaravelLogo, name: 'Laravel' },
    { logo: CPPLogo, name: 'C++' },
    { logo: JavaLogo, name: 'Java' },
    { logo: MySQLLogo, name: 'MySQL' },
    { logo: AndroidLogo, name: 'Android' },
    { logo: FirebaseLogo, name: 'Firebase' },
  ]);
};