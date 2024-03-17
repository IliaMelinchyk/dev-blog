import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IArticle, RootState } from '../../Interfaces';
import { URL_FOR_IMAGE } from '../../Utils';
import { ReactComponent as Back } from '../../icons/back.svg';
import { setCurrentArticleId } from '../../state/main/main';
import Rating from '../Articles/Rating/Rating';
import './ArticleInfo.scss';

const ArticleInfo = (): JSX.Element => {
  const articles: IArticle[] = useSelector((state: RootState) => state.main.articles);
  const currentArticleId: number | null = useSelector((state: RootState) => state.main.currentArticleId);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const back = useCallback((): void => {
    dispatch(setCurrentArticleId(null));
  }, [dispatch]);

  const currentArticle = useMemo((): IArticle | undefined => {
    return articles.find((article: IArticle) => article.id === currentArticleId);
  }, [articles, currentArticleId]);

  return (
    <div className="article-info">
      <div className="article-info__header">
        <div className="article-info__header-button" onClick={back}>
          <Back className="article-info__header-back" />
          <div className="article-info__header-text">Вернуться к статьям</div>
        </div>
        {currentArticle != null && <Rating article={currentArticle} />}
      </div>
      {currentArticle != null && <div className="article-info__main">
        <div className="article-info__main-title">{currentArticle.title}</div>
        <div className="article-info__main-bottom">
          <img className="article-info__main-bottom-image" src={URL_FOR_IMAGE} alt="placeholder" />
          <div className="article-info__main-bottom-body">{currentArticle.body}</div>
        </div>
      </div>}
    </div>
  );
}

export default ArticleInfo;
