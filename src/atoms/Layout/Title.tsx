interface ITitle {
  text: string;
  dat: number | undefined | string | null;
}

const Title: React.FC<ITitle> = ({ text, dat }) => {
  return (
    <div className="flex mb-8">
      <p className="text-[#3C3C3C] text-3xl ">
        <span>{text}</span>
        <span>{dat}</span>
      </p>
    </div>
  );
};

export default Title;
