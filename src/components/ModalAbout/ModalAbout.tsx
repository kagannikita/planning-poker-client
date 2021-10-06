import React, { FC } from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import { TAboutModalState } from '../header/header'
import cls from './ModalAbout.module.scss'
import logoPic from '../../../public/images/main_logo.png'
import mainFormPic from '../../../public/images/about_mainForm-pic.png'
import formLinkPic from '../../../public/images/about__mainForm-link.png'
import issuePic from '../../../public/images/about_lobbyIssue-pic.png'
import issueFilePic from '../../../public/images/about_lobbyIssueFile-pic.png'
import settingsPic from '../../../public/images/about_lobbySettings-pic.png'
import gameMenuPic from '../../../public/images/about_gameMenu.png'
import gameCards from '../../../public/images/about_gameCards.png'

type ModalAboutType = {
	aboutModalState: TAboutModalState
	setAboutModalState: React.Dispatch<React.SetStateAction<TAboutModalState>>
}

const ModalAbout: FC<ModalAboutType> = ({ aboutModalState, setAboutModalState }) => {
	return (
		<Modal
			open={aboutModalState.isOpen}
			dimmer={aboutModalState.dimmer}
			onClose={() => setAboutModalState({ isOpen: false, dimmer: undefined })}
		>
			<Modal.Header>About Planning Poker</Modal.Header>
			<Modal.Content image id="modalAboutContentBox">
				<div className={cls.modalItem}>
					<Image className={cls.itemPic} size="large" src={logoPic.src} wrapped />
					<Modal.Description>
						<p className={cls.itemDescription}>
							Learn more about
							<a target="_blank" rel="noreferrer" href="https://ru.scrum-time.com/infobase/planning-poker.php">
								{' '}
								Planning Poker{' '}
							</a>
						</p>
					</Modal.Description>
				</div>
				<div className={cls.modalItem}>
					<Modal.Description>
						<p className={cls.itemDescription}>To create a new game session, use the start game button [1]</p>
						<p className={cls.itemDescription}>
							To connect to an existing gaming session, insert a link to the lobby [2] and use the Connect to lobby
							button [3]
						</p>
					</Modal.Description>
					<Image className={cls.itemPic} size="large" src={mainFormPic.src} wrapped />
				</div>
				<div className={cls.modalItem}>
					<Image className={cls.itemPic} size="large" src={formLinkPic.src} wrapped />
					<Modal.Description>
						<p className={cls.itemDescription}>You can find a link to the game in the created lobby</p>
					</Modal.Description>
				</div>
				<div className={cls.modalItem}>
					<Modal.Description>
						<p className={cls.itemDescription}>
							You can add your issues manually [1] or use the automatic addition of issues from the file [2]
						</p>
					</Modal.Description>
					<Image className={cls.itemPic} size="large" src={issuePic.src} wrapped />
				</div>
				<div className={cls.modalItem}>
					<Image className={cls.itemPic} size="large" src={issueFilePic.src} wrapped />
					<Modal.Description>
						<p className={cls.itemDescription}>The contents of the issues file should be in this format</p>
					</Modal.Description>
				</div>
				<div className={cls.modalItem}>
					<Modal.Description>
						<p className={cls.itemDescription}>Set your settings for the game [1]</p>
						<p className={cls.itemDescription}>Choose a card cover or upload your own [2]</p>
						<p className={cls.itemDescription}>Edit the game cards to fit your goals [3]</p>
					</Modal.Description>
					<Image className={cls.itemPic} size="large" src={settingsPic.src} wrapped />
				</div>
				<div className={cls.modalItem}>
					<Image className={cls.itemPic} size="large" src={gameMenuPic.src} wrapped />
					<Modal.Description>
						<p className={cls.itemDescription}>Your Issues are available for management here [1]</p>
						<p className={cls.itemDescription}>These are the game controls [2]</p>
						<p className={cls.itemDescription}>
							This is the field with the results of the game. After the end of the game you will be able to download the
							results in excel format [3]
						</p>
						<p className={cls.itemDescription}>
							This is a field with players in the game. Here you can vote to exclude a player from the game (if there
							are 4 or more players) or if you are a dealer, immediately exclude a player. [4]
						</p>
					</Modal.Description>
				</div>
				<div className={cls.modalItem}>
					<Modal.Description>
						<p className={cls.itemDescription}>
							When the round starts, select the card you want or you can skip a move. When all the players vote or the
							time of the round ends, you will see the average voting results.
						</p>
					</Modal.Description>
					<Image className={cls.itemPic} size="large" src={gameCards.src} wrapped />
				</div>
				<div className={[cls.modalItem, cls.modalFooter].join(' ')}>
					<Modal.Description>
						<p className={cls.modalDescription}>GOOD LUCK!</p>
					</Modal.Description>
				</div>
			</Modal.Content>
			<Modal.Actions>
				<Button className="input" color="blue" onClick={() => setAboutModalState({ isOpen: false, dimmer: undefined })}>
					Close
				</Button>
			</Modal.Actions>
		</Modal>
	)
}

export default ModalAbout
