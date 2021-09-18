import React, { FC } from 'react'
import { Button, Grid, GridRow, Header as HeaderTitle } from 'semantic-ui-react'
import MemberItem from '../Lobby/MemberItem'
import { Role } from '../../interfaces/LobbyTypes'

// interface DealerLayouGameProps {
//
// }

const DealerLayouGame: FC = () => {
	return (
		<>
			<Grid columns="3">
				<Grid.Row>
					<HeaderTitle as="h1">lobby PAge</HeaderTitle>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<HeaderTitle as="h3">Scram master</HeaderTitle>
						<MemberItem firstName="Max" lastName="Yazykov" role={Role.dealer} id="asd" />
						{/* {players.map((dealer) => {
              if (dealer.role === Role.dealer) {
                return <MemberItem key={dealer.id} {...(dealer as IPlayer)} />
              }
              return
            })} */}
					</Grid.Column>
					<Grid.Column verticalAlign="bottom" width="10">
						<Button negative floated="right">
							Stop game
						</Button>
					</Grid.Column>
				</Grid.Row>
				<Grid columns="1">
					<Grid.Column width="14">
						<HeaderTitle as="h2">Issues:</HeaderTitle>
						{/* <Issue title={"issue 1"} priority={"low"} id="1" type="game" />
              <Issue title={"issue 1"} priority={"low"} id="2" type="game" />
              <Issue title={"issue 1"} priority={"low"} id="3" type="game" /> */}
					</Grid.Column>
					<Grid.Column>
						<GridRow>
							<Button color="blue">Run Round</Button>
						</GridRow>
					</Grid.Column>
				</Grid>
			</Grid>
		</>
	)
}

export default DealerLayouGame
