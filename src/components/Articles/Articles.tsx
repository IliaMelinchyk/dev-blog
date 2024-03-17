import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IArticle, RootState } from '../../Interfaces';
import './Articles.scss';
import BigArticle from './BigArticle/BigArticle';
import SmallArticle from './SmallArticle/SmallArticle';

const Articles = (): JSX.Element => {
  const articles: IArticle[] = useSelector((state: RootState) => state.main.articles);
  const searchedArticlesIds: number[] | null = useSelector((state: RootState) => state.main.searchedArticlesIds);
  const pending: boolean = useSelector((state: RootState) => state.main.pending);

  const articlesMarkup = useMemo((): JSX.Element => {
    if (pending)
      return <div className="articles__loading" />;

    let articlesToShow: IArticle[] = articles;

    if (searchedArticlesIds != null)
      articlesToShow = articles.filter((article: IArticle) => searchedArticlesIds.includes(article.id));

    if (articlesToShow.length === 0)
      return <div className="articles__text">Статей не найдено.</div>;

    const leftArticlesColumn: JSX.Element[] = [];
    const rightArticlesColumn: JSX.Element[] = [];

    articlesToShow.forEach((article: IArticle, index: number) => {
      if (index === 0) return;

      if (index % 2 === 1) {
        leftArticlesColumn.push(<SmallArticle article={article} key={article.id} />);
        return;
      }

      rightArticlesColumn.push(<SmallArticle article={article} key={article.id} />);
    });

    return <>
      <BigArticle article={articlesToShow[0]} />
      <div className="articles__column">{leftArticlesColumn}</div>
      <div className="articles__column">{rightArticlesColumn}</div>
    </>;
  }, [articles, pending, searchedArticlesIds]);

  return (
    <div className="articles">
      {articlesMarkup}
    </div>
  );
}

export default Articles;
