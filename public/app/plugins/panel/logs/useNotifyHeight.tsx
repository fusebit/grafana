import { useEffect } from 'react';

const useNotifyHeight = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('running interval');
      const scrollbar = document.querySelector('.scrollbar-view');
      if (scrollbar) {
        const panelTitle = document.querySelector('.panel-title');
        const height = `${scrollbar?.scrollHeight + (panelTitle?.clientHeight || 0)}px`;
        console.log('posting message', height);
        window.parent.postMessage(height, '*');
      }
    }, 0);

    return () => clearInterval(interval);
  }, []);
};

export default useNotifyHeight;
