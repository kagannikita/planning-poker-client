import  { FC,  } from "react";
import { Button, Modal } from "semantic-ui-react";
import { KickPlayer } from "./DealerLayout/DealerLayout";

interface ModalKickPlayerByDealerProps {
  playerId: string,
  playerName: string,
  kickMemberHandler: (playerId: string) => void,
  isOpen: boolean
  setKickPlayer: React.Dispatch<React.SetStateAction<KickPlayer>>
}

const ModalKickPlayerByDealer: FC<ModalKickPlayerByDealerProps> 
  = ({ kickMemberHandler, playerId, playerName, isOpen, setKickPlayer }) => {

  	const closeHandler = () => {
  		setKickPlayer({
  			modalIsOpen: false,
  			playerName: '',
				id: ''
  		})
  	}
  	const handlerKick = () => {
  		kickMemberHandler(playerId)
			closeHandler()
  	}

  	return (
  		<Modal
  			size="tiny"
  			open={isOpen}
  			onClose={closeHandler}
  		>
  			<Modal.Header>Kick player?</Modal.Header>
  			<Modal.Content>
  				<p>Are you really want to remove player <b>{playerName}</b> from game session?</p>
  			</Modal.Content>
  			<Modal.Actions>
  				<Button negative onClick={closeHandler} >
          No
  				</Button>
  				<Button positive onClick={handlerKick}>
          Yes
  				</Button>
  			</Modal.Actions>
  		</Modal>);
  }

export default ModalKickPlayerByDealer;