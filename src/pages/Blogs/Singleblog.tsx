import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";

const Singleblog = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div>erfr</div>

      <button onClick={() => navigate(-1)}>Geri dönün</button>
    </Layout>
  );
};

export default Singleblog;
