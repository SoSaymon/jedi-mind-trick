import {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";

import '../styles/header.scss';

import logo from '../img/logo.svg';

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	}
	return (
		<header className={'bg-smoky-black header'}>
			<div className={'flex justify-between items-center p-5 mx-auto container header__container'}>
				<span className={'w-1/3 container__spacer'}></span>
				<span className={'flex justify-center items-center w-1/3 container__logo-container'}><img src={logo} alt={'logo'} className={'logo-container__logo'}/></span>
				<span className={'flex items-center justify-end w-1/3 container__hamburger-container'}>
					<FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className={'text-lotion hamburger-container__hamburger'} onClick={toggleMenu}/>
				</span>
			</div>
		</header>
	);
}