import css from './Button.module.css';

const MainButton = ({ type, content, onClick = null, idDisabled = false, hasAccent = false }) => {
  const setBgColor = hasAccent => (hasAccent ? `#24CCA7` : `#ffffff`);
  const setColor = hasAccent => (hasAccent ? `#ffffff` : `#4A56E2`);
  const setBorder = hasAccent => (hasAccent ? `#24CCA7` : `#4A56E2`);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={idDisabled}
      hasAccent={hasAccent}
      className={css.Button}
      sx={{
        backgroundColor: setBgColor(hasAccent),
        color: setColor(hasAccent),
        border: `1px solid ${setBorder(hasAccent)}`,
      }}
    >
      {content}
    </button>
  );
};

export default MainButton;
