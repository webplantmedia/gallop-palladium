import { useEffect } from 'react';
import { state } from '@state';

// ----------------------------------------------------------------------

export default function useScrolledSidebar() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const grid = document.getElementById('grid');
      const sidebar = document.getElementById('sidebar');
      let dynamicTop = 0;
      if (grid && sidebar) {
        let sidebarHeight = 0,
          menuHeight = 176 + 40;

        const onScroll = () => {
          sidebarHeight =
            sidebar.offsetHeight + menuHeight - state.windowHeight;
          // console.log(state.offsetTop + ' > ' + sidebarHeight);
          if (state.offsetTop > sidebarHeight) {
            // console.log('scrolled');
            /*if (state.scrollingDirection == 'up') {
              if (state.lastScrollingDirection == 'down') {
                dynamicTop = state.offsetTop - sidebarHeight;
                sidebar.style.position = 'relative';
                sidebar.style.top = dynamicTop + 'px';
                sidebar.style.removeProperty('bottom');
                grid.style.removeProperty('align-items');
              }
            } else {
              grid.style.alignItems = 'flex-end';
              sidebar.style.position = 'sticky';
              sidebar.style.removeProperty('top');
              sidebar.style.bottom = '40px';
						}*/
            grid.style.alignItems = 'flex-end';
            sidebar.style.position = 'sticky';
            sidebar.style.removeProperty('top');
            sidebar.style.bottom = '40px';
          } else {
            grid.style.removeProperty('align-items');
            sidebar.style.removeProperty('position');
            sidebar.style.removeProperty('bottom');
            sidebar.style.removeProperty('top');
            // document.body.classList.remove('scrolled-sidebar');
          }
        };
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
      }
    }
  }, []);
}
