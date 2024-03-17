import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, IArticle } from '../../../Interfaces';
import { setCurrentArticleId } from '../../../state/main/main';
import './ReadButton.scss';

const ReadButton = (props: { article: IArticle }): JSX.Element => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const readArticle = useCallback((): void => {
    dispatch(setCurrentArticleId(props.article.id));
  }, [dispatch, props.article.id]);

  return (
    <button className="read-button" onClick={readArticle}>Читать далее</button>
  );
}

export default ReadButton;