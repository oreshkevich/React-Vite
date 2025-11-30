import React from 'react';
import styles from './PostCard.module.scss';

interface PostCardProps {
  title: string;
  body: string;
}

export const PostCard: React.FC<PostCardProps> = ({title, body}) => {
  return (
    <div className={styles.postCard}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </div>
  );
};
