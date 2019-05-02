import React, { useEffect, useContext } from 'react';
import FeedItem from '../../panel/components/FeedItem';
import FeedPanel, { FeedProps, FeedList } from '../../panel/components/FeedPanel';
import { DNPost } from '../reducer';
import dnTheme from '../theme';
import { FeedSettingsContext } from '../../settings/context';

export interface DNFeedPanelProps extends FeedProps {
  title: never;
  readonly stories: ReadonlyArray<DNPost>;
  fetchPosts(pullSize: number): void;
  startFeedRefresh(refreshIval: number, pullSize: number): void;
  stopFeedRefresh(): void;
}

const DNFeedPanel: React.SFC<DNFeedPanelProps> = props => {
  const { refreshInterval, pullSize } = useContext(FeedSettingsContext);

  useEffect(() => {
    props.fetchPosts(pullSize);
    props.startFeedRefresh(refreshInterval, pullSize);

    return props.stopFeedRefresh;
  }, []);

  return (
    <FeedPanel {...props} title="Designer News" theme={dnTheme}>
      <FeedList>
        {props.stories.map((post, idx) =>
          <li key={idx}>
            <FeedItem
              id={post.id}
              index={idx + 1} key={post.id}
              title={post.title}
              url={post.url || post.dnLink}
              upvotes={post.voteCount}
              author={post.author}
              commentCount={post.commentCount}
              commentLink={post.dnLink}
            />
          </li>,
        )}
      </FeedList>
    </FeedPanel>
  );
};

export default DNFeedPanel;
