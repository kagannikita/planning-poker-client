import Head from 'next/head'
import axios from 'axios'
import { IPost } from '../../../interfaces/IPost'
import { store } from '../../../store/store'
import { PostState, setData, setError, setLoading } from '../../../store/posts'
import { Post } from '../../../components/post/Post'
import { NextPageContext } from 'next'

interface IDetailProps {
	post: PostState
}

const PostDetail = ({ post }: IDetailProps) => {
	const data = (post.data as IPost).docs
	return (
		<div>
			<Head>
				<title>Post {data[0]._id}</title>
			</Head>
			<h1>Post {data[0]._id}</h1>
			<Post
				_id={data[0]._id}
				height={data[0].height}
				race={data[0].race}
				gender={data[0].gender}
				birth={data[0].birth}
				spouse={data[0].spouse}
				death={data[0].death}
				realm={data[0].spouse}
				hair={data[0].hair}
				name={data[0].name}
				wikiUrl={data[0].wikiUrl}
			/>
		</div>
	)
}
export const getServerSideProps = async ({ query }: NextPageContext) => {
	try {
		const data = await axios.get<IPost>(`https://the-one-api.dev/v2/character/${query.id}`, {
			headers: {
				Authorization: 'Bearer JHFFU7mcrLa7nO_rtyGc',
				'Content-Type': 'application/json',
			},
			timeout: 10000,
		})
		store.dispatch(setData(data.data))
		store.dispatch(setLoading(false))
	} catch (err) {
		store.dispatch(setError(err as string))
		store.dispatch(setLoading(false))
	}
	const post = store.getState().posts
	return { props: { post } }
}

export default PostDetail
