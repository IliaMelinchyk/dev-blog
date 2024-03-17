import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IArticle, IArticleFromResponse, IMainState } from "../../Interfaces";
import { MAX_RANDOM_LIKES_OR_DISLIKES, URL_FOR_ARTICLES } from "../../Utils";

const initialState: IMainState = {
  articles: [],
  searchedArticlesIds: null,
  currentArticleId: null,
  pending: false,
  rejected: false
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    clearSearchedArticlesIds: (state) => {
      state.searchedArticlesIds = null;
    },
    setCurrentArticleId: (state, action: PayloadAction<number | null>) => {
      state.currentArticleId = action.payload;
      state.searchedArticlesIds = null;
    },
    like: (state, action: PayloadAction<number>) => {
      const articleToLike: IArticle | undefined = state.articles.find((article: IArticle) => article.id === action.payload);

      if (articleToLike == null) return;

      if (articleToLike.liked) articleToLike.likes--;
      else articleToLike.likes++;

      articleToLike.liked = !articleToLike.liked;

      if (articleToLike.disliked) {
        articleToLike.dislikes--;
        articleToLike.disliked = false;
      }
    },
    dislike: (state, action: PayloadAction<number>) => {
      const articleToDislike: IArticle | undefined = state.articles.find((article: IArticle) => article.id === action.payload);

      if (articleToDislike == null) return;

      if (articleToDislike.disliked) articleToDislike.dislikes--;
      else articleToDislike.dislikes++;

      articleToDislike.disliked = !articleToDislike.disliked;

      if (articleToDislike.liked) {
        articleToDislike.likes--;
        articleToDislike.liked = false;
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IMainState>) => {
    builder
      .addCase(articlesAsync.pending, (state: IMainState) => {
        state.rejected = false;
        state.pending = true;
      })
      .addCase(articlesAsync.fulfilled, (state: IMainState, action: PayloadAction<IArticle[]>) => {
        state.articles = action.payload;
        state.rejected = false;
        state.pending = false;
      })
      .addCase(articlesAsync.rejected, (state: IMainState) => {
        state.rejected = true;
        state.pending = false;
      })
      .addCase(searchArticlesAsync.pending, (state: IMainState) => {
        state.rejected = false;
        state.pending = true;
      })
      .addCase(searchArticlesAsync.fulfilled, (state: IMainState, action: PayloadAction<number[]>) => {
        state.searchedArticlesIds = action.payload;
        state.pending = false;
        state.rejected = false;
      })
      .addCase(searchArticlesAsync.rejected, (state: IMainState) => {
        state.pending = false;
        state.rejected = true;
      });
  }
});

export const articlesAsync = createAsyncThunk(
  "main/articlesAsync",
  async () => {
    const response: Response = await fetch(URL_FOR_ARTICLES);
    const tempArticles: IArticleFromResponse[] = await response.json();
    const articles: IArticle[] = tempArticles.map((article: IArticleFromResponse) => {
      return {
        ...article,
        likes: Math.floor(Math.random() * MAX_RANDOM_LIKES_OR_DISLIKES),
        dislikes: Math.floor(Math.random() * MAX_RANDOM_LIKES_OR_DISLIKES),
        liked: false,
        disliked: false
      };
    });

    return articles;
  }
);

export const searchArticlesAsync = createAsyncThunk(
  "main/searchArticlesAsync",
  async (searchQuery: string) => {
    const url: string = `${URL_FOR_ARTICLES}?title=${searchQuery}`;
    const response: Response = await fetch(url);
    const tempArticles: IArticleFromResponse[] = await response.json();
    const articleIds: number[] = tempArticles.map((article: IArticleFromResponse) => article.id);

    return articleIds;
  }
);

export const { clearSearchedArticlesIds, setCurrentArticleId, like, dislike } = mainSlice.actions;

export default mainSlice.reducer;