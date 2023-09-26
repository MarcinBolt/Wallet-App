import Button from '@mui/material/Button';

const MainButton = ({ type, content, onClick = null, disabled = false, hasaccent = false }) => {
  const setBgColor = hasaccent => (hasaccent ? `#24CCA7` : `#ffffff`);
  const setColor = hasaccent => (hasaccent ? `#ffffff` : `#4A56E2`);
  const setBorder = hasaccent => (hasaccent ? `#24CCA7` : `#4A56E2`);

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      hasAccent={hasaccent}
      className={css.MainButton}
      sx={{
        backgroundColor: setBgColor(hasaccent),
        color: setColor(hasaccent),
        border: `1px solid ${setBorder(hasaccent)}`,
      }}
    >
      {content}
    </Button>
  );
};

export default MainButton;
