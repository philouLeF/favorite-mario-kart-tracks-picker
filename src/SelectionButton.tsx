type ImageButtonProps = {
  imageSrc: string;
  altText: string;
  onClick: () => void;
};

const SelectionButton: React.FC<ImageButtonProps> = ({
  imageSrc,
  altText,
  onClick,
}) => (
  <button className="p-4" onClick={onClick}>
    <img className="w-64" src={imageSrc} alt={altText} />
  </button>
);

export default SelectionButton;
