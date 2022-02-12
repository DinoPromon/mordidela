import Axios from "@api";
import React, { useEffect, useState } from "react";

import { HomeContainer } from "./styled";

type Teste = {
  uuid: string;
};

const Home: React.FC = () => {
  const [testes, setTestes] = useState<Teste[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetchTest(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  async function fetchTest(isComponentMounted: boolean) {
    const response = await Axios.get<string[]>("/teste");
    console.log(response.data);
    if (isComponentMounted) setTestes(response.data.map((uuid) => ({ uuid } as Teste)));
  }

  return (
    <HomeContainer>
      {testes.map((teste, index) => (
        <img
          key={teste.uuid + index}
          src={`/images/teste/${teste.uuid}.png`}
          alt={"teste"}
          loading="lazy"
        />
      ))}
    </HomeContainer>
  );
};

export default Home;
