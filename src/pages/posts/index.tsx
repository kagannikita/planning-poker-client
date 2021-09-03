import Head from 'next/head'
import { ICharacter, IPost } from '../../interfaces/IPost'
import axios from 'axios'
import { store } from '../../store/store'
import { PostState, setData, setError, setLoading } from '../../store/posts'
import { Post } from '../../components/post/Post'

interface IProps {
	posts: PostState
}
const Posts = ({ posts }: IProps) => {
	const data = (posts.data as IPost).docs

	return (
		<div>
			<Head>
				<title>Posts</title>
			</Head>
			{data.map((post: ICharacter) => {
				return (
					<Post
						key={post._id}
						_id={post._id}
						height={post.height}
						race={post.race}
						gender={post.gender}
						birth={post.birth}
						spouse={post.spouse}
						death={post.death}
						realm={post.realm}
						hair={post.hair}
						name={post.name}
						wikiUrl={post.wikiUrl}
					/>
				)
			})}
		</div>
	)
}
Posts.getInitialProps = async () => {
	try {
		const data = await axios.get<IPost>(`https://the-one-api.dev/v2/character?page=1&limit=20`, {
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
	const posts = store.getState().posts
	return { posts }
}

export default Posts
