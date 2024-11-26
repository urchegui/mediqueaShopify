import { useEffect, useState } from "react"
import "./article.scss";
import { IoClose } from "react-icons/io5";

const Article = (props) => {
    const [articleInfo, setArticleInfo] = useState(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setArticleInfo(props.data)
    }, [articleInfo])

    useEffect(() => {
        document.body.classList.toggle("no-scroll", expanded);
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [expanded]);

    const toggleVisibility = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            {articleInfo && (
                <div className='article' onClick={() => toggleVisibility()}>
                    <img src={articleInfo.image?.src} alt={articleInfo.title} />
                    <p>{articleInfo.title}</p>
                    <div className={`article-expanded ${expanded ? "open" : ""}`}>
                        <IoClose onClick={() => toggleVisibility()} />
                        <div className="article-expanded_wrapper" dangerouslySetInnerHTML={{ __html: articleInfo.contentHtml }}></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Article