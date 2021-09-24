import React from 'react'
import { Form, Header } from 'semantic-ui-react'

type MainFormProps = {
	lobbyID: string
	modalHandler: (formName: string) => void
	setLobbyID: React.Dispatch<React.SetStateAction<string>>
	findLobby: (lobbyID: string) => Promise<void>
}

const MainForm: React.FC<MainFormProps> = ({ modalHandler, lobbyID, setLobbyID, findLobby }: MainFormProps) => {
	return (
		<>
			<Form id="form" className="center aligned">
				<Header as="h2" className="heading" size="huge">
					Start your <span className="form-label__span">planning</span>:
				</Header>
				<Form.Group inline widths="two">
					<label htmlFor="new game" className="header__main">
						Create session:
					</label>
					<Form.Button className="input" color="blue" onClick={() => modalHandler('Create new game')}>
						Start new game
					</Form.Button>
				</Form.Group>
				<Header as="h2" className="heading" size="huge">
					OR:
				</Header>
				<Form.Group inline widths="one">
					<label htmlFor="connect to lobby" className="header__main">
						Connect to lobby by <span className="form-label__span">URL</span>:
					</label>
					<div className="ui action input">
						<input
							type="text"
							value={lobbyID}
							onChange={(e) => setLobbyID(e.target.value)}
							placeholder="Connect to session:"
						/>
						<button onClick={() => findLobby(lobbyID)} className="ui blue button">
							Connect
						</button>
					</div>
				</Form.Group>
			</Form>
		</>
	)
}

export default MainForm
