import { ICharacter } from '../../interfaces/IPost'
import React from 'react'
import Link from 'next/link'
export const Post: React.FC<ICharacter> = ({ ...props }) => {
	return (
		<li key={props._id}>
			<Link passHref href={`/posts/post/[id]`} as={`/posts/post/${props._id}`}>
				<a>{props.name}</a>
			</Link>
			<a href={props.wikiUrl}>{props.wikiUrl}</a>
			<p>Height: {props.height}</p>
			<p>Race: {props.race}</p>
			<p>Gender: {props.gender}</p>
			<p>Spouse: {props.spouse}</p>
			<p>Death: {props.death}</p>
			<p>Realm: {props.realm}</p>
			<p>Hair: {props.hair}</p>
		</li>
	)
}
