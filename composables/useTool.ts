import GitLogo from '@/assets/icons/git.svg';
import GitHubLogo from '@/assets/icons/github.svg';
import VSCodeLogo from '@/assets/icons/vscode.svg';
import IntelliJIdeaLogo from '@/assets/icons/intellijidea.svg';
import CLionLogo from '@/assets/icons/clion.svg';
import PHPStormLogo from '@/assets/icons/phpstorm.svg';
import DataGripLogo from '@/assets/icons/datagrip.svg';
import WebStormLogo from '@/assets/icons/webstorm.svg';
import AndroidStudioLogo from '@/assets/icons/android-studio.svg';
import FigmaLogo from '@/assets/icons/figma.svg';
import type { Tool } from "~/models/tool";

export const useTool = () => {
  return useState('Tool', (): Tool[] => [
    { logo: GitLogo, name: 'Git' },
    { logo: GitHubLogo, name: 'GitHub' },
    { logo: VSCodeLogo, name: 'VS Code' },
    { logo: IntelliJIdeaLogo, name: 'IntelliJ IDEA' },
    { logo: CLionLogo, name: 'CLion' },
    { logo: PHPStormLogo, name: 'PhpStorm' },
    { logo: DataGripLogo, name: 'DataGrip' },
    { logo: WebStormLogo, name: 'WebStorm' },
    { logo: AndroidStudioLogo, name: 'Android Studio' },
    { logo: FigmaLogo, name: 'Figma' },
  ]);
};