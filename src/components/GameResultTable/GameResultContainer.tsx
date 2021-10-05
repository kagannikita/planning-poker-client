import React, { FC } from "react";
import { Header } from "semantic-ui-react";
import GameResultTable from "./GameResultTable";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { IssueType } from "src/interfaces/IssueType";
import { GameState } from "src/interfaces/GameTypes";

interface GameResultTableContainerProps {
  issues: IssueType[]
}
 
const GameResultTableContainer: FC<GameResultTableContainerProps> = ({ issues}) => {

  return ( 
    <>
      <Header as='h3' textAlign="center">Game results</Header>
      <GameResultTable issues={issues} />
      <ReactHTMLTableToExcel
        table='issuesTable'
        filename='Issues results'
        sheet='Issues'
        id="btnDownloadIssues"
        buttonText='Download Results'
        className="ui button blue"
      />
    </>
   );
}
 
export default GameResultTableContainer;