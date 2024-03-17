import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { AppDispatch, RootState } from './Interfaces';
import ArticleInfo from './components/ArticleInfo/ArticleInfo';
import Articles from './components/Articles/Articles';
import Header from './components/Header/Header';
import { articlesAsync } from './state/main/main';

const App = (): JSX.Element => {
  const currentArticleId: number | null = useSelector((state: RootState) => state.main.currentArticleId);
  const rejected: boolean = useSelector((state: RootState) => state.main.rejected);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    dispatch(articlesAsync());
  }, [dispatch]);

  return (
    <div className="app">
      {rejected && <div className="articles__text">Произошла ошибка. Попробуйте позже!</div>}
      {currentArticleId == null && !rejected && <>
        <Header />
        <Articles />
      </>}
      {currentArticleId != null && !rejected && <ArticleInfo />}
    </div>
  );
}

export default App;
