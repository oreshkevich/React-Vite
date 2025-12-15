import React, {ReactNode} from 'react';

interface ItemListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export const ItemList = <T,>({items, renderItem}: ItemListProps<T>) => {
  return <>{items.map(renderItem)}</>;
};
