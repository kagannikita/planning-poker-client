import React, { useState } from 'react'
import { Button, Card } from 'semantic-ui-react'

interface IssueCreateState {
	isModalOpen: boolean
}

const IssueCreate = () => {
	const [isModalOpen, setModalOpen] = useState(false)
	return (
		<Card centered>
			<Card.Content>
				<Card.Header>Create Issue:</Card.Header>
				<Card.Meta />
				<Card.Description>
					<Button size="mini" floated="right">
						Add
					</Button>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}
// class IssueCreate extends React.Component<{}, IssueCreateState> {
// 	state = {
// 		isModalOpen: false,
// 	}
//
// 	render() {
// 		return (
// 			<Card centered>
// 				<Card.Content>
// 					<Card.Header>Create Issue:</Card.Header>
// 					<Card.Meta/>
// 					<Card.Description>
// 						<Button size="mini" floated="right">
// 							Add
// 						</Button>
// 					</Card.Description>
// 				</Card.Content>
// 			</Card>
// 		)
// 	}
// }

export default IssueCreate
