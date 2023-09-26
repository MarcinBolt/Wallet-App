import css from './ButtonDelete.module.css';

const ButtonDelete = ({ handleClick }) => {
  return (
    <button type="button" className={css.ButtonDelete} onClick={handleClick}>
      Delete
    </button>
  );
};

export default ButtonDelete;
