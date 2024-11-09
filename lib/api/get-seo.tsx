// import { getPostSeo } from './get-post-seo';
// import { getPageSeo } from './get-page-seo';
// import { getEstateSeo } from './get-estate-seo';
// import { getNeighborhoodSeo } from './get-neighborhood-seo';
// import { getStyleSeo } from './get-style-seo';
// import { getArchitectSeo } from './get-architect-seo';
// import { getCoastToCoastSeo } from './get-coast-to-coast-seo';
// import { getMLSDetailsSeo } from './get-mls-details-seo';
// import { getHomeSeo } from './get-home-seo';

// export async function getSeo({ params, postType }) {
//   switch (postType) {
//     case 'page-post':
//       postType = 'page';
//       const data = getPageSeoData({ params, postType });
//       return data;
//     case 'post':
//       return getPostSeoData({ params, postType });
//     case 'neighborhood':
//       return getNeighborhoodSeoData({ params, postType });
//     case 'home':
//       return getHomeSeoData({ params, postType });
//     case 'architect':
//       return getArchitectSeoData({ params, postType });
//     case 'style':
//       return getStyleSeoData({ params, postType });
//     case 'estate':
//       return getEstateSeoData({ params, postType });
//     case 'coast-to-coast':
//       return getCoastToCoastSeoData({ params, postType });
//     case 'mls-details':
//       return getMLSDetailsSeoData({ params, postType });
//   }

//   return getPageSeoData({ params, postType });
// }

// async function getPostSeoData({ params, postType }) {
//   const data = await getPostSeo(params?.slug);

//   if (!data?.post) {
//     return {};
//   }

//   return data?.post?.seo;
// }
// async function getPageSeoData({ params, postType }) {
//   const data = await getPageSeo(params?.slug);

//   if (!data?.page) {
//     return {};
//   }

//   return data?.page?.seo;
// }
// async function getEstateSeoData({ params, postType }) {
//   const data = await getEstateSeo(params?.slug);

//   if (!data?.estate) {
//     return {};
//   }

//   return data?.estate?.seo;
// }
// async function getCoastToCoastSeoData({ params, postType }) {
//   const data = await getCoastToCoastSeo(params?.slug);

//   if (!data?.coastToCoast) {
//     return {};
//   }

//   return data?.coastToCoast?.seo;
// }
// async function getMLSDetailsSeoData({ params, postType }) {
//   const data = await getMLSDetailsSeo(params?.slug);

//   if (!data) {
//     return {};
//   }

//   return data[0];
// }
// async function getHomeSeoData({ params, postType }) {
//   const data = await getHomeSeo(params?.slug);

//   if (!data?.home) {
//     return {};
//   }

//   return data?.home?.seo;
// }
// async function getStyleSeoData({ params, postType }) {
//   const data = await getStyleSeo(params?.slug);

//   if (!data?.style) {
//     return {};
//   }

//   return data?.style?.seo;
// }
// async function getArchitectSeoData({ params, postType }) {
//   const data = await getArchitectSeo(params?.slug);

//   if (!data?.architect) {
//     return {};
//   }

//   return data?.architect?.seo;
// }
// async function getNeighborhoodSeoData({ params, postType }) {
//   const data = await getNeighborhoodSeo(params?.slug);

//   if (!data?.neighborhood) {
//     return {};
//   }

//   return data?.neighborhood?.seo;
// }
