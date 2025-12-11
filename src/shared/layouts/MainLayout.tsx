import {Header} from '@/widgets/LayoutHeader/Header';
import {Footer} from '@/widgets/LayoutFooter/Footer';
import {NavLink, Outlet} from 'react-router-dom';
import {Button} from '../ui/Button/Button';

export const MainLayout = () => {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header />

      <div style={{display: 'flex', gap: 10, margin: 20}}>
        <NavLink to='/posts'>
          <Button>Посты</Button>
        </NavLink>
        <NavLink to='/posts/1'>
          <Button>Пост #1</Button>
        </NavLink>
        <NavLink to='/users/1/posts'>
          <Button>Посты пользователя</Button>
        </NavLink>
        <NavLink to='/users/1/albums'>
          <Button>Альбомы</Button>
        </NavLink>
        <NavLink to='/albums/1/photos'>
          <Button>Фото</Button>
        </NavLink>
        <NavLink to='/users/1/todos'>
          <Button>Задачи</Button>
        </NavLink>
      </div>

      <main style={{padding: 20, flex: 1}}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
