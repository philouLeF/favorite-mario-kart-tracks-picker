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
  <button
    className="p-4 hover:shadow-yellow-500 focus:shadow-yellow-500"
    onClick={onClick}
  >
    <img className="w-64" src={imageSrc} alt={altText} />
  </button>
);

export default SelectionButton;
