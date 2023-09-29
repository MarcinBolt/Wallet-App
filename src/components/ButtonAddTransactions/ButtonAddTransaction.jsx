import css from './ButtonAddTransaction.module.css';
export const ButtonAddTransaction = ({ onClick }) => {
  return (
    <>
      <button className={css.openModal} onClick={onClick} />
    </>
  );
};
