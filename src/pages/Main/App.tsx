import Layout from "../../layout/Layout";
import GridOfDemocrafis from "../../components/Main/GridOfDemocrafis";
import { useState } from "react";

function App() {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Layout>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center text-3xl text-center">
          <p className="relative bottom-20 bg-[#210442] px-5 py-3 rounded text-white">
            Məlumatlar yüklənir..
          </p>
        </div>
      ) : (
        <div className="w-full flex items-start justify-start mt-6 pb-12 flex-col">
          <p className="text-3xl text-[#000] font-semibold mb-3 leading-[36px] text-nowrap text-left ">
            Pilgrim EDU MMC şirkətinin
            <br />
            sisteminin ümumi statistik göstəriciləri 📈
          </p>
          <GridOfDemocrafis setLoading={setLoading} />
        </div>
      )}
    </Layout>
  );
}

export default App;
