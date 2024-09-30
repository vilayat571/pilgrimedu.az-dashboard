interface ITitle {
  text: string;
  dat: number | undefined | string | null;
}

const Title: React.FC<ITitle> = ({ text, dat }) => {
  return (
    <div className="flex mb-8 mt-12">
      <p className="text-[#000] text-4xl ">
        <span>{text}</span>
        <span>{dat}</span>
      </p>
    </div>
  );
};

export default Title;
