import { IArticle } from '../../../Interfaces';
import { URL_FOR_IMAGE } from '../../../Utils';
import Rating from '../Rating/Rating';
import ReadButton from '../ReadButton/ReadButton';
import './SmallArticle.scss';

const SmallArticle = (props: { article: IArticle }): JSX.Element => {
  return (
    <div className="small-article">
      <img className="small-article__image" src={URL_FOR_IMAGE} alt="placeholder" />
      <div className="small-article__main">
        <div className="small-article__main-title">{props.article.title}</div>
        <div className="small-article__main-buttons">
          <Rating article={props.article} />
          <ReadButton article={props.article} />
        </div>
      </div>
    </div>
  );
}

export default SmallArticle;
