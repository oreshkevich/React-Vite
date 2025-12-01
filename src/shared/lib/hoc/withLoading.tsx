import React from 'react';

interface WithLoadingProps {
  isLoading?: boolean;
}

export function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithLoading: React.FC<P & WithLoadingProps> = ({
    isLoading,
    ...props
  }: WithLoadingProps & P) => {
    if (isLoading) {
      return (
        <div style={{padding: 24, textAlign: 'center'}}>
          <div aria-busy='true'>Загрузка...</div>
        </div>
      );
    }
    return <WrappedComponent {...(props as P)} />;
  };

  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithLoading.displayName = `withLoading(${wrappedName})`;

  return ComponentWithLoading;
}
