'use client';

import { proxy, useSnapshot, subscribe } from 'valtio';

type MLSProxy = {
  page: number;
  address: string;
  price: { min: number; max: number };
  acres: { min: number; max: number };
  builtYear: { min: number; max: number };
  bedrooms: number;
  bathrooms: number;
  style: string;
  neighborhoods: string;
  propertyType: string;
  sort: string;
  features: string;
};

const state = proxy({
  offsetTop: 0,
  windowHeight: 0,
  lastOffsetTop: 0,
  isScrolling: false,
  dialogOpen: false,
  mlsSidebarOpen: false,
  lightboxOpen: false,
  dynamicSidebarOpen: false,
  dynamicSidebar: { type: '', id: 0, content: {}, route: '' },
  lightboxIndex: 0,
  imageIndex: -1,
  scrollingDirection: 'down',
  lastScrollingDirection: 'down',
  mapFullscreen: false,
  isLoggedIn: false,
});
const mlsState = proxy<MLSProxy>({
  page: 1,
  address: '',
  price: { min: 1, max: Infinity },
  acres: { min: 0, max: Infinity },
  builtYear: { min: 0, max: Infinity },
  bedrooms: 0,
  bathrooms: 0,
  style: '',
  neighborhoods: 'significant-neighborhoods',
  propertyType: 'all-homes',
  sort: 'price-high-to-low',
  features: '',
});

export { state, mlsState, useSnapshot, subscribe, proxy };
