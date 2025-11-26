import {ReactNode} from 'react';
import {Header} from '@/widgets/LayoutHeader/Header';
import {Footer} from '@/widgets/LayoutFooter/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <div>
      <Header />
      <main style={{padding: 20}}>{children}</main>
      <Footer />
    </div>
  );
};
