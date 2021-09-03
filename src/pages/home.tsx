import { Button } from 'semantic-ui-react'
import Router from 'next/router'
import Head from 'next/head'
import { useRef } from 'react'

const Home = () => {
	const nodeRef = useRef(null)
	return (
		<div ref={nodeRef}>
			<Head>
				<title>Home Page</title>
			</Head>
			Home Page
			<Button basic onClick={() => Router.push('/')}>
				Go back to home inline
			</Button>
		</div>
	)
}
export default Home
