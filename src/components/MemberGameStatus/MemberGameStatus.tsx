import cls from './MemberGameStatus.module.scss'

import React from 'react'
import { GameState } from '../../interfaces/GameTypes'

type MemberGameStatusProps = {
	gameStatus: GameState
	cardValue: string
}

const MemberGameStatus: React.FC<MemberGameStatusProps> = ({ gameStatus, cardValue }: MemberGameStatusProps) => {
	let value = 'No answer'
	if (gameStatus === GameState.init) {
		value = 'Waiting'
	}
	if (gameStatus === GameState.started) {
		if (cardValue) {
			value = 'Ready'
		} else {
			value = 'In progress'
		}
	}
	if (gameStatus === GameState.roundFinished && cardValue) {
		value = cardValue
	}
	return <div className={[cls.MemberGameStatus, 'heading'].join(' ')}>{value}</div>
}

export default MemberGameStatus
