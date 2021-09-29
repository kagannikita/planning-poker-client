import cls from './MemberGameStatus.module.scss'

import React from 'react'

type MemberGameStatusProps = {
	// gameStatus: string,
	// name: string
}

const MemberGameStatus: React.FC<MemberGameStatusProps> = ({}: MemberGameStatusProps) => {
	return <p className={cls.MemberGameStatus}>In progress</p>
}

export default MemberGameStatus
