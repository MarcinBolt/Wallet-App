import SvgIcon from '@mui/material/SvgIcon';
import css from './EditButton.module.css';

const EditButton = ({ id, onClick }) => {
  return (
    <>
      <button type="button" id={id} className={css.editBtn} onClick={onClick}>
        <SvgIcon
          viewBox="0 0 32 32"
          sx={{
            width: '12px',
            height: '12px',
            padding: '0px',
          }}
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="2.7429"
            d="M24 13.334l-5.333-5.333M3.333 28.667l4.513-0.502c0.551-0.061 0.827-0.092 1.085-0.175 0.229-0.074 0.446-0.178 0.647-0.311 0.226-0.149 0.422-0.345 0.814-0.737l17.608-17.608c1.473-1.473 1.473-3.861 0-5.333s-3.861-1.473-5.333 0l-17.608 17.608c-0.392 0.392-0.588 0.588-0.737 0.814-0.132 0.201-0.237 0.418-0.311 0.647-0.083 0.258-0.114 0.533-0.175 1.085l-0.501 4.513z"
          ></path>
        </SvgIcon>
        <p className={css.text}>Edit</p>
      </button>
    </>
  );
};

export default EditButton;
