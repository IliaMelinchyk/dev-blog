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
    searchArticles: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.searchedArticlesIds = null;
        return;
      }

      const searchedArticles: IArticleFromResponse[] = state.articles.filter((article: IArticleFromResponse) => article.title.toLowerCase().includes(action.payload.toLowerCase()));
      state.searchedArticlesIds = searchedArticles.map((article: IArticleFromResponse) => article.id);
    }
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
        likes: Math.floor(Math.random() * (MAX_RANDOM_LIKES_OR_DISLIKES + 1)),
        dislikes: Math.floor(Math.random() * (MAX_RANDOM_LIKES_OR_DISLIKES + 1)),
        liked: false,
        disliked: false
      };
    });

    return articles;
  }
);

export const { setCurrentArticleId, like, dislike, searchArticles } = mainSlice.actions;

export default mainSlice.reducer;