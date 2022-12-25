import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

import '../style/header.scss';

import logo from '../img/logo.svg';
export const Header = () => {
	return (
		<header className={'bg-black header'}>
			<div className={'flex p-5 justify-between items-center container mx-auto header__container'}>
				<span className={'w-1/3 container__spacer'}></span>
				<span className={'flex justify-center items-center w-1/3 container__logo-container'}><img src={logo} alt={'logo'} className={'logo-container__logo'}/></span>
				<span className={'flex items-center justify-end w-1/3 container__hamburger-container'}>
					<FontAwesomeIcon icon={faBars} className={'text-white hamburger-container__hamburger'}/>
				</span>
			</div>
		</header>
	);
}