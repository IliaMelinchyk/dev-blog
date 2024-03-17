import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Interfaces';
import { searchArticles } from '../../state/main/main';
import './Header.scss';

const Header = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const searchByTitle = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    dispatch(searchArticles(e.currentTarget.value));
  }, [dispatch]);

  return (
    <div className="header">
      <div className="header__name">Блог</div>
      <div className="header__text">Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи</div>
      <input className='header__search' type='search' placeholder="Поиск по названию статьи" onChange={searchByTitle} />
    </div>
  );
}

export default Header;
