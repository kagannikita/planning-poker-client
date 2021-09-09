import Link from 'next/link'
import Head from 'next/head'

const Page404 = () => {
	return (
		<div className="error-page">
			<Head>
				<title>404 Page Not Found</title>
			</Head>
			<div className="error-block">
				<h1>404 Error</h1>
				<h2>Page Not Found</h2>
				<p>
					Please{' '}
					<Link passHref href="/">
						<a>Go back</a>
					</Link>{' '}
					to safety
				</p>
			</div>
		</div>
	)
}
export default Page404
