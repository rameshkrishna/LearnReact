interface BtnProps {
  link: string;
  btxtxt: string;
}

function Button({ link, btxtxt }: BtnProps) {
  return (
    <>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button type="button" className="btn btn-primary">
          {btxtxt}
        </button>
      </a>
    </>
  );
}

export default Button;
