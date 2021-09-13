import { FC } from 'react'
import { Container, Header as HeaderTitle } from 'semantic-ui-react'
import IssueLobby, { IssueLobbyProps } from '../Issue'
import IssueCreate from '../IssueCreate'

import s from '../lobby.module.scss'

interface IssueContainerProps {
	issues: IssueLobbyProps[]
}

const IssueContainer: FC<IssueContainerProps> = ({ issues }) => {
	return (
		<>
			<HeaderTitle textAlign="center" as="h1">
				Issues:
			</HeaderTitle>
			<Container className={s.itemsContainer}>
				{issues.map((issue) => (
					<IssueLobby key={issue.title} {...issue} />
				))}
				<IssueCreate />
			</Container>
		</>
	)
}

export default IssueContainer
