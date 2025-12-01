import React, {useCallback, useState} from 'react';
import styles from './CommentList.module.scss';

export interface Comment {
  id: number;
  author: string;
  text: string;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({comments}) => {
  const [openIds, setOpenIds] = useState<Record<number, boolean>>({});

  const toggle = useCallback((id: number) => {
    setOpenIds((prev) => ({...prev, [id]: !prev[id]}));
  }, []);

  if (!comments || comments.length === 0) {
    return <div className={styles.empty}>Нет комментариев</div>;
  }

  return (
    <ul className={styles.list}>
      {comments.map((c) => {
        const isOpen = !!openIds[c.id];
        return (
          <li key={c.id} className={styles.item}>
            <div className={styles.row}>
              <b>{c.author}</b>
              <button
                className={styles.toggle}
                onClick={() => toggle(c.id)}
                aria-expanded={isOpen}
              >
                {isOpen ? 'Свернуть' : 'Развернуть'}
              </button>
            </div>

            {isOpen && <p className={styles.text}>{c.text}</p>}
          </li>
        );
      })}
    </ul>
  );
};
