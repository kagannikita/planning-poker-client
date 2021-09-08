import cls from './footer.module.scss'

import React from 'react'

const Footer: React.FC = () => {
	return (
		<footer className={cls.footer}>
			<a href="https://github.com/kagannikita/planning-poker-client" className={cls['footer-link']}>
				Poker Planning on GitHub
			</a>
			<p className={cls['description']}>&copy;Team 2021</p>
			<ul className={cls['contact-list']}>
				<li className={cls['contact-item']}>
					<a href="https://github.com/kagannikita" className={cls['contact-link']}>
						<div className={cls['contact-ico']} />
						Kagannikita
					</a>
				</li>
				<li className={cls['contact-item']}>
					<a href="https://github.com/nectire" className={cls['contact-link']}>
						<div className={cls['contact-ico']} />
						Nectire
					</a>
				</li>
				<li className={cls['contact-item']}>
					<a href="https://github.com/vitebsk121" className={cls['contact-link']}>
						<div className={cls['contact-ico']} />
						Alexandr Demchenko
					</a>
				</li>
			</ul>
		</footer>
	)
}

export default Footer
