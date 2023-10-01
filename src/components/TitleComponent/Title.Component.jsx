import css from './TitleComponent.module.css';

const TitleComponent = ({ text }) => {
  return (
    <div>
      <h2 className={css.statisticsHeader}>{text}</h2>
    </div>
  );
};

export default TitleComponent;
