import React, { FC } from 'react'
import { Table } from 'semantic-ui-react'
import { IssueType } from '../../interfaces/IssueType'

interface GameResultTable {
	issues: IssueType[]
}

const GameResultTable: FC<GameResultTable> = ({ issues }): JSX.Element => {
	return (
		<Table celled id="issuesTable">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Issue</Table.HeaderCell>
					<Table.HeaderCell>Priority</Table.HeaderCell>
					<Table.HeaderCell>Score</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{issues?.map((iss) => (
					<Table.Row key={iss.id}>
						<Table.Cell>{iss.name}</Table.Cell>
						<Table.Cell>{iss.priority}</Table.Cell>
						<Table.Cell>{iss.score}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>

			<Table.Footer>
				<Table.Row>
					<Table.HeaderCell>Total: {issues?.length}</Table.HeaderCell>
					<Table.HeaderCell />
					<Table.HeaderCell />
				</Table.Row>
			</Table.Footer>
		</Table>
	)
}

export default GameResultTable
