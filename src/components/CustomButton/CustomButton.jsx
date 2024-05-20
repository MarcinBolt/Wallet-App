import css from './CustomButton.module.css';

// How to use CustomButton?

// The component takes the following props: type (e.g., button, submit), color (primary or secondary), content (button label), onClick (callback function).

const CustomButton = ({ type, color, content, onClick = null, disabled = false }) => {
  const btnClass = color =>
    `${color === 'primary' ? css.buttonPrimary : color === 'secondary' ? css.buttonSecondary : null}`;

  const handleClick = e => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${btnClass(color)} ${disabled ? css.disabled : ''}`}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
export default CustomButton;
