import {useEffect} from "react";
import {Button} from "../components/Button";
import img from '../img/homepage-img.jpg';
import logo from '../img/logo.svg';
import {Link, useNavigate} from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Homepage";
    }, []);

    const handleClick = () => {
        navigate('/game-select');
    }
    return (
        <>
        <div className={"flex justify-center w-full h-5/6 pt-5 pb-16 px-12 bg-lotion home"}>
            <div className={"flex flex-col justify-center items-center container w-80 h-full home__container"}>
                <div className={"flex flex-col w-full h-50 justify-center items-center  home__text-container"}>
                    <h1 className={"text-3xl font-bold text-center mb-2.5 text-container__title"}>
                        About the project
                    </h1>
                    <h2 className={"text-xl font-bold text-center mb-2.5 opacity-60 text-container__subtitle"}>
                        The ultimate quiz game for Star Wars fans!
                    </h2>
                    <p className={"text-lg text-center mb-5 text-container__description"}>
                        Built with React JS and Tailwind CSS, this game tests your knowledge of the Star Wars universe. Use your Jedi mind tricks wisely to emerge victorious. All information in this game are sourced from the official Star Wars API (swapi). Gather your friends and put your Star Wars knowledge to the test with Jedi Mind Trick. May the Force be with you!
                    </p>
                    <Button width={"w-80"} radius={"rounded-3xl"} bg={"bg-black"} bem={"text-container__button"} text={"Start the game"} onClick={handleClick}/>
                </div>
                <div className={"flex flex-col justify-center items-center mt-10 h-80 w-80 overflow-hidden rounded-3xl home__image-container"}>
                    <img src={img} alt={"Jedi Mind Trick"} className={"w-full h-full object-cover image-container__image"}/>
                </div>
            </div>
        </div>
        <div className={"flex justify-center items-center w-full bg-smoky-black h-1/6 home__footer"}>
            <div className={"flex justify-between items-center w-full h-full p-12 container footer__container"}>
                <div className={"flex flex-col justify-start items-start h-full footer__left-container"}>
                    <h3 className={"text-lg font-bold text-white  text-left-container__title"}>
                        Sitemap
                    </h3>
                    <ul className={"flex flex-col justify-start items-start w-full h-full ml-5 text-white text-left-container__list"}>
                        <li className={"hover:opacity-60 duration-300 text-left-container__list-item"}>
                            <Link to={"#"} className={"text-left-container__list-item-link"}>
                                Home
                            </Link>
                        </li>
                        <li className={"hover:opacity-60 duration-300 text-left-container__list-item"}>
                            <Link to={"#"} className={"text-left-container__list-item-link"}>
                                Game
                            </Link>
                        </li>
                        <li className={"hover:opacity-60 duration-300 text-left-container__list-item"}>
                            <Link to={"#"} className={"text-left-container__list-item-link"}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={"flex justify-end items-center w-36 h-36 footer__right-container"}>
                    <img src={logo} alt={"Star Wars Logo"} className={"w-full h-full right-container__image"}/>
                </div>
            </div>
        </div>
        </>
    );
}