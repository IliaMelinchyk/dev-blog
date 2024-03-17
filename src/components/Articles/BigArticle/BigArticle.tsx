import { IArticle } from '../../../Interfaces';
import { URL_FOR_IMAGE } from '../../../Utils';
import Rating from '../Rating/Rating';
import ReadButton from '../ReadButton/ReadButton';
import './BigArticle.scss';

const BigArticle = (props: { article: IArticle }): JSX.Element => {
  return (
    <div className="big-article">
      <img className="big-article__image" src={URL_FOR_IMAGE} alt="placeholder" />
      <div className="big-article__main">
        <div className="big-article__main-header">
          <div className="big-article__main-header-title">{props.article.title}</div>
          <Rating article={props.article} />
        </div>
        <div className="big-article__main-body">{props.article.body}</div>
        <div className="big-article__main-read">
          <ReadButton article={props.article} />
        </div>
      </div>
    </div>
  );
}

export default BigArticle;
