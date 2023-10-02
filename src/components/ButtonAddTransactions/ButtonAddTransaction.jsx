import SvgIcon from '@mui/material/SvgIcon';
import css from './ButtonAddTransaction.module.css';
export const ButtonAddTransaction = ({ onClick }) => {
  return (
    <>
      <button className={css.button} onClick={onClick}>
        <SvgIcon
          viewBox="0 0 24 24"
          sx={{ width: '44px', height: '44px', padding: '0px' }}
        >
          <path d="M0 6h18v11H6V6z" fill="white" />
          <path
            fill="#24CCA7"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
          />
        </SvgIcon>
      </button>
    </>
  );
};
