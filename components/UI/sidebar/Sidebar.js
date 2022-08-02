import { ListGroup } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import classes from './Sidebar.module.scss';
import SearchInput from '../inputs/SearchInput';

const BackgroundOverlay = dynamic(() => import('../Overlay'), {
  ssr: false,
});

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: 'fas fa-chart-line text-primary',
    path: '/dashboard',
  },
  {
    label: 'Settings',
    icon: 'fas fa-user-cog text-primary',
    path: '/settings',
  },
];

const Sidebar = ({ openSidebar, closeSidebar, navHeight }) => {
  const { theme } = useTheme();

  return (
    <>
      {openSidebar && (
        <BackgroundOverlay
          closeSidebar={closeSidebar}
          navHeight={navHeight}
          zIndex={999}
        />
      )}
      <Sidebar.Wrapper theme={theme} openSidebar={openSidebar}>
        <Sidebar.Head
          theme={theme}
          closeSidebar={closeSidebar}
          navHeight={navHeight}
        />
        <SearchInput navHeight={navHeight} />
        <ListGroup variant={`flush`}>
          <Sidebar.Items
            theme={theme}
            sidebarItems={sidebarItems}
            navHeight={navHeight}
          />
        </ListGroup>
      </Sidebar.Wrapper>
    </>
  );
};

export default Sidebar;

Sidebar.Wrapper = ({ children, theme, openSidebar }) => {
  return (
    <div
      className={`${classes.sidebarWrapper} ${
        openSidebar ? classes.sidebarOpen : ''
      } bg-${theme.type} shadow`}
    >
      {children}
    </div>
  );
};

Sidebar.Head = ({ theme, closeSidebar, navHeight }) => {
  return (
    <div
      className={`p-3 bg-${theme.type} d-flex justify-content-between align-items-center`}
      style={{
        borderBottom: `1px solid ${theme.primary}`,
        fontSize: '1.2rem',
        boxSizing: 'border-box',
        height: `${navHeight}px`,
      }}
      onClick={closeSidebar}
    >
      <span className="fw-bold">Actions</span>
      <i
        className="fas fa-times text-primary"
        style={{ cursor: 'pointer' }}
      ></i>
    </div>
  );
};

Sidebar.Items = ({ sidebarItems, theme, navHeight }) => {
  return sidebarItems.map((item) =>
    item.path ? (
      <Link href={item.path} key={item.label}>
        <a style={{ textDecoration: 'none' }}>
          <ListGroup.Item
            action
            className={`bg-${theme.type} p-3 d-flex justify-content-between align-items-center`}
            style={{
              color: theme.fontColor,
            }}
          >
            {item.label}
            {item.icon && <i className={`${item.icon}`}></i>}
          </ListGroup.Item>
        </a>
      </Link>
    ) : (
      <ListGroup.Item
        key={item.label}
        action
        className={`bg-${theme.type} p-3 d-flex justify-content-between align-items-center`}
        style={{
          color: theme.fontColor,
          height: `${navHeight}px`,
        }}
        onClick={item.handler}
      >
        {item.label}
        {item.icon && <i className={`${item.icon}`}></i>}
      </ListGroup.Item>
    )
  );
};
