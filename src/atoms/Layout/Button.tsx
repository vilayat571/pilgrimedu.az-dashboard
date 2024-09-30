import { IQuestions, TQuestions } from "../../types/QuestionsType";

const Button: React.FC<{
  text: string;
  data:IQuestions & {_id:string},
  func:  (_id: TQuestions<string>) => void;
  style: TQuestions<string>;
}> = ({ text, func, style, data }) => {
  return (
    <button onClick={() => func(data._id)} className={style}>
      {text}
    </button>
  );
};

export default Button;
