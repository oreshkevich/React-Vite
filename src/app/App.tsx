import {MainLayout} from '@/shared/layouts/MainLayout';
import {PostList} from '@/widgets/PostList/PostList';
import {useState} from 'react';
import {Modal} from '@/shared/ui/Modal/Modal';
import {ThemeSwitcher} from '@/features/ThemeSwitcher/ui/ThemeSwitcher';
import {Button} from '@/shared/ui/Button/Button';
const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <ThemeSwitcher />
      <Button onClick={() => setOpen(true)}>О проекте</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>О проекте</h2>
        <p>Демонстрационное приложение на React</p>
      </Modal>
      <PostList />
    </MainLayout>
  );
};

export default App;
