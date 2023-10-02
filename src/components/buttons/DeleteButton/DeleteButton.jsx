import css from './DeleteButton.module.css'

const DeleteButton = ({ onClick }) => {
  return (
    <>
      <button className={css.deleteButton} type="button" onClick={onClick}>Delete</button>
    </>
  );
};

export default DeleteButton