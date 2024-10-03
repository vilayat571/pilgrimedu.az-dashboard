import Layout from "../../layout/Layout";
import GridOfDemocrafis from "../../components/Main/GridOfDemocrafis";

function App() {
  return (
    <Layout>
      <div className="w-full flex items-start justify-start mt-6 pb-12 flex-col">
        <p className="text-3xl text-[#000] font-semibold mb-3 leading-[36px] text-nowrap text-left ">
          Pilgrim EDU MMC şirkətinin
          <br />
          sisteminin ümumi statistik göstəriciləri 📈
        </p>
        <GridOfDemocrafis />
      </div>
    </Layout>
  );
}

export default App;
