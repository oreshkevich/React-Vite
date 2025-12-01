import React, {useCallback} from 'react';
import styles from './PostLengthFilter.module.scss';

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export const PostLengthFilter: React.FC<Props> = ({value, onChange}) => {
  const onInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value || 0);
      onChange(Number.isNaN(v) ? 0 : v);
    },
    [onChange]
  );

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        Минимальная длина заголовка:
        <input
          className={styles.input}
          type='number'
          min={0}
          value={value}
          onChange={onInput}
        />
      </label>
    </div>
  );
};
