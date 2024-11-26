import "./blogCategory.scss";
import { Link } from "react-router-dom";

const BlogCategory = (props) =>{
    let category = props.blogData;
    let loading = props.loaded

    const convertString = (input) => {

        const words = input.split('-');
        const capitalizedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return capitalizedWords.join(' ');
    }

    if(loading){
        return (
            <>
                <div className="category">
                    <div className="textLoading"></div>
                    <div className="imageLoading"></div>
                </div>
            </>
        );
    }else{
        return (
            <>
                <Link to={`/blog?category=${category.seo.title}`} >
                    <div className="category">
                        <div className="textLoaded">{convertString(category.title)}</div>
                        <div className={`imageLoaded featured-image_${category.seo.title}`}></div>
                    </div>
                </Link>
            </>
        )
    }
}
export default BlogCategory;