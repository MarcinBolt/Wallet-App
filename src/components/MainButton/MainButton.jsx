import css from './Button.module.css';
// color === 'primary' | 'secondary'
const MainButton = ({ type, content, onClick = null, color }) => {
  const btnClass = color => `${color === 'primary' ? css.buttonPrimary : css.buttonSecondary}`;
  return (
    <button type={type} onClick={onClick} className={btnClass(color)}>
      {content}
    </button>
  );
};
export default MainButton;
