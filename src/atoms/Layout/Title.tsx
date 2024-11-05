interface ITitle {
  text: string;
  count: number | undefined;
}

const Title: React.FC<ITitle> = ({ text, count }) => {
  return (
    <div className="flex mb-4 mt-12">
      <p className="text-[#000] text-4xl ">
        <span>Saytda </span>
        <span>{count} </span>
        <span>{text} </span>
        <span>mövcuddur:</span>
      </p>
    </div>
  );
};

export default Title;
