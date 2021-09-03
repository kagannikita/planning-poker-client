import Link from 'next/link'
import Head from 'next/head'
const Page404 = () => {
	return (
		<div>
			<Head>
				<title>404 Not Found</title>
			</Head>
			<h1>404 Error Not Found</h1>
			<p>
				Please{' '}
				<Link passHref href="/">
					<a>Go back</a>
				</Link>
				to safety
			</p>
		</div>
	)
}
export default Page404
