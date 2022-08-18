import { useEffect } from 'react';

const useNotifyHeight = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const scrollbar = document.querySelector('.scrollbar-view');
      if (scrollbar && self !== top) {
        const panelTitle = document.querySelector('.panel-title');
        const height = `${scrollbar?.scrollHeight + (panelTitle?.clientHeight || 0)}px`;
        window.parent.postMessage(height, '*');
      }
    }, 0);

    return () => clearInterval(interval);
  }, []);
};

export default useNotifyHeight;
