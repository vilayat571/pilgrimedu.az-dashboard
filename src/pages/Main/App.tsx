import Layout from "../../layout/Layout";
import GridOfDemocrafis from "../../components/Main/GridOfDemocrafis";

function App() {
  return (
    <Layout>
      <div className="w-full flex items-start justify-start pr-24  flex-col">
        <p className="text-3xl text-[#000] font-semibold mb-6 mt-8 text-left ">
          Pilgrim EDU MMC <br /> saytının demokrafik göstəriciləri!
        </p>
        <GridOfDemocrafis />
      </div>
    </Layout>
  );
}

export default App;
