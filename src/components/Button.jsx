/* eslint-disable react/prop-types */
import "./sidenavbar.scss";

const Button = (props) => {
    const icon = props.icon;
    const image = props.image;
    const text = props.text;
    const buttonClasses = props.isActive ? 'active' : 'not-active';

    return (
        <>
        {icon != undefined ?
            <button className={`sidenav ${buttonClasses}`} type="button" >{icon}{text}</button>
            : 
            <button className={`sidenav ${buttonClasses}`} type="button" ><img className="anki_btn" src={image} />{text}</button>
        }
        </>
    )
}
export default Button;