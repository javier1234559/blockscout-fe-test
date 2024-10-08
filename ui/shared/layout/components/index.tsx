import dynamic from 'next/dynamic';

import Footer from 'ui/snippets/footer/Footer';
import TopRow from 'ui/snippets/topBar/TopBar';

import Container from './Container';
import Content from './Content';
import MainArea from './MainArea';
import MainColumn from './MainColumn';
import NavBar from './NavBar';
const SideBar = dynamic(() => import('./SideBar'), {
  ssr: false,
});

export {
  Container,
  Content,
  MainArea,
  SideBar,
  NavBar,
  MainColumn,
  Footer,
  TopRow,
};

// Container
//    TopRow
//    MainArea
//       SideBar
//       MainColumn
//          Content
//    Footer
