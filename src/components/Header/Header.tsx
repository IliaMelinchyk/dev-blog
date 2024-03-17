import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Interfaces';
import { SEARCH_DELAY_MILLISECONDS } from '../../Utils';
import { clearSearchedArticlesIds, searchArticlesAsync } from '../../state/main/main';
import './Header.scss';

const Header = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pending: boolean = useSelector((state: RootState) => state.main.pending);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const tryToStartSearchTimer = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (searchTimeoutRef.current != null) clearTimeout(searchTimeoutRef.current);
  
    const value: string = e.currentTarget.value;

    if (value.length === 0) {
      dispatch(clearSearchedArticlesIds());
      return;
    }

    searchTimeoutRef.current = setTimeout((): void => {
      if (searchQuery !== value) setSearchQuery(value);
    }, SEARCH_DELAY_MILLISECONDS);
  }, [dispatch, searchQuery]);

  const stopIfPending = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (searchTimeoutRef.current != null) clearTimeout(searchTimeoutRef.current);

    if (pending) e.preventDefault();
  }, [pending]);

  useEffect((): () => void => {
    return () => {
      if (searchTimeoutRef.current != null) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  useEffect((): void => {
    if (searchQuery.length === 0) return;

    dispatch(searchArticlesAsync(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <div className="header">
      <div className="header__name">Блог</div>
      <div className="header__text">Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи</div>
      <input className='header__search' type='search' placeholder="Поиск по названию статьи" onKeyUp={tryToStartSearchTimer} onKeyDown={stopIfPending} />
    </div>
  );
}

export default Header;
