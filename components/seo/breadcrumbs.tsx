import { replaceWordPressUrl, replaceWordPressUrl2 } from '@utils/tools';

export default function GetBreadcrumbsList(
  seo: any,
  breadcrumbs: any[],
  type: string
) {
  let itemListElements: any[] = [];
  let BreadcrumbList = {};

  if (breadcrumbs && breadcrumbs?.length !== 0) {
    breadcrumbs.forEach(function (item: any, index: any) {
      item = {
        '@type': type == 'breadcrumbs' ? 'ListItem' : 'ChildItem',
        position: index + 1,
        name: item?.post_title,
        item: replaceWordPressUrl2(item.href),
      };
      itemListElements.push(item);
    });
    BreadcrumbList = {
      '@type': type == 'breadcrumbs' ? 'BreadcrumbList' : 'ChildrenList',
      '@id':
        replaceWordPressUrl(seo.opengraphUrl) +
        (type == 'breadcrumbs' ? '#Breadcrumb' : '#Children'),
      itemListElement: itemListElements,
    };
  }

  return BreadcrumbList;
}
