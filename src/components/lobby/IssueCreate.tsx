import React, { useState } from 'react'
import { Button, Card } from 'semantic-ui-react'

const IssueCreate = () => {
	const [isModalOpen, setModalOpen] = useState(false)
	setModalOpen(isModalOpen)
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
