import Button from '@mui/material/Button';
import css from './ButtonDelete.module.css';

const ButtonDelete = () => {
  return (
    <Button variant="contained" className={css.ButtonDelete}>
      Delete
    </Button>
  );
};

export default ButtonDelete;
