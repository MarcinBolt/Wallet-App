import css from './CustomButton.module.css';

// How to use CustomButton?

// The component takes the following props: type (e.g., button, submit), color (primary or secondary), content (button label), onClick (callback function).

const CustomButton = ({ type, color, content, onClick = null }) => {
  const btnClass = color =>
    `${ color === 'primary' ? css.buttonPrimary : color === 'secondary' ? css.buttonSecondary : null }`;
  return (
    <button type={type} onClick={onClick} className={btnClass(color)}>
      {content}
    </button>
  );
};
export default CustomButton;
