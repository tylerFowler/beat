import { ActionType } from 'typesafe-actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import * as API from './api';
import { RedditPost } from './interface';
import {
  Actions, fetchSubreddit as fetchSubredditAction, fetchSubredditError, refreshSubreddit,
} from './actions';

function* fetchSubreddit(action: ActionType<typeof fetchSubredditAction>) {
  const { sub, feed } = action.meta;

  try {
    const subPosts: RedditPost[] = yield call(API.fetchSubreddit, sub, feed, action.payload.pullSize);
    yield put(refreshSubreddit(sub, feed, subPosts));
  } catch (error) {
    yield put(fetchSubredditError(sub, feed, error));
  }
}

export default function* rootSaga() {
  yield takeEvery(Actions.FetchSub, fetchSubreddit);
}
