import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, IArticle } from '../../../Interfaces';
import { ReactComponent as Like } from '../../../icons/like.svg';
import { dislike, like } from '../../../state/main/main';
import './Rating.scss';

const Rating = (props: { article: IArticle }): JSX.Element => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const giveLike = useCallback((): void => {
    dispatch(like(props.article.id));
  }, [dispatch, props.article.id]);

  const giveDislike = useCallback((): void => {
    dispatch(dislike(props.article.id));
  }, [dispatch, props.article.id]);

  return (
    <div className="rating">
      <button className="rating__block">
        <Like className={`rating__block-button ${props.article.liked ? "rating__block-button-liked" : ""}`} onClick={giveLike} />
        <div className="rating__block-count">{props.article.likes}</div>
      </button>
      <button className="rating__block">
        <Like className={`rating__block-button rating__block-button-dislike ${props.article.disliked ? "rating__block-button-disliked" : ""}`} onClick={giveDislike} />
        <div className="rating__block-count">{props.article.dislikes}</div>
      </button>
    </div>
  );
}

export default Rating;
