import { writable } from 'svelte/store';
import type { MovieLatestList } from '$lib/typeDefs/MovieLatest.type';
import { browser } from '$app/environment';

const WATCH_LATER_LIMIT = 10;

type BookmarkStore = {
  watchLater: MovieLatestList['items'];
  isShowWatchLater : boolean
};

const storedValue = browser ? localStorage.getItem('bookmarks') : null;
export const initialBookmarks: BookmarkStore = storedValue ? JSON.parse(storedValue) : { watchLater: [] ,isShowWatchLater : false };

function createBookmarkStore() {
  const { subscribe, update } = writable(initialBookmarks);

  return {
    subscribe,
    addToWatchLater: (movie: MovieLatestList['items'][number]) => {
      if (!browser) return;
      
      update(state => {
        if (state.watchLater.some(m => m._id === movie._id)) {
          return state;
        }
        
        let newWatchLater = [...state.watchLater, movie];
        if (newWatchLater.length > WATCH_LATER_LIMIT) {
          newWatchLater = newWatchLater.slice(1); // Remove oldest item
        }

        const newState = {
          ...state,
          watchLater: newWatchLater
        };
        localStorage.setItem('bookmarks', JSON.stringify(newState));
        return newState;
      });
    },
    removeFromWatchLater: (movieId: string) => {
      if (!browser) return;
      
      update(state => {
        const newState = {
          ...state,
          watchLater: state.watchLater.filter(m => m._id !== movieId)
        };
        localStorage.setItem('bookmarks', JSON.stringify(newState));
        return newState;
      });
    },
    toggleWatchList : () => {
      if (!browser) return false;
      update(state => {
        const newState = {...state , isShowWatchLater : !state.isShowWatchLater}
        return newState
      })
    },
    isInWatchLater: (movieId: string) => {
      if (!browser) return false;
      
      let result = false;
      subscribe(state => {
        result = state.watchLater.some(m => m._id === movieId);
      })();
      return result;
    }
  };
}

export const bookmarkStore = createBookmarkStore(); 