import Button from '@mui/material/Button';

export default function ModalButton({
  type,
  content,
  onClick = null,
  disabled = false,
  hasaccent = false,
}) {
  const setBgColor = hasaccent => (hasaccent ? `#24CCA7` : `#ffffff`);
  const setColor = hasaccent => (hasaccent ? `#ffffff` : `#4A56E2`);
  const setBorder = hasaccent => (hasaccent ? `#24CCA7` : `#4A56E2`);

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      hasAccent={hasaccent}
      sx={{
        textTransform: 'uppercase',
        backgroundColor: setBgColor(hasaccent),
        color: setColor(hasaccent),
        border: `1px solid ${setBorder(hasaccent)}`,
        width: '300px',
        height: '50px',
        borderRadius: '20px',

        cursor: 'pointer',
        '&:hover:not(:disabled)': {
          boxShadow: '8px 8px 24px 0px rgba(66, 68, 90, 1)',
        },
        '&:disabled': {
          opacity: 0.35,
        },
      }}
    >
      {content}
    </Button>
  );
}
