import React, { FC } from "react";
import { Container } from "semantic-ui-react";
import DealerLayouGame from "src/components/Game/DealerPageName";

interface GamePageProps {
  
}
 
const GamePage: FC<GamePageProps> = () => {
  return ( 
    <>
      <Container>
        <DealerLayouGame />
      </Container>
    </>
   );
}
 
export default GamePage;