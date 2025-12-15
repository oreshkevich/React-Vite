import {useTheme} from '@/shared/lib/theme/useTheme';
import {Button} from '@/shared/ui/Button/Button';

export const ThemeSwitcher = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <Button onClick={toggleTheme} disabled={false}>
      {theme === 'light' ? '🌞 Светлая' : '🌙 Тёмная'}
    </Button>
  );
};
