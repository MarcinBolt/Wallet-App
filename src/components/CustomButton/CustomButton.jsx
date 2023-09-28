import css from './CustomButton.module.css';
// color === 'primary' | 'secondary'
const CustomButton = ({ type, content, onClick = null, color }) => {
  const btnClass = color => `${color === 'primary' ? css.buttonPrimary : css.buttonSecondary}`;
  return (
    <button type={type} onClick={onClick} className={btnClass(color)}>
      {content}
    </button>
  );
};
export default CustomButton;
