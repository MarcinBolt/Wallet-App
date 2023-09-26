import css from './PageContainer.module.css';

const PageContainer = ({ children }) => {
  return <div className={css.pageContainer}>{children}</div>;
};

export default PageContainer;
