import { getPage } from './get-page';
import { getPost } from './get-post';
import { getBlogPosts } from './get-blog-posts';
import { getNeighborhood } from './get-neighborhood';
import { getMLSHomes } from './get-mls-homes';
import { getSubBoundaries } from './get-subboundaries';
import { getHome } from './get-home';
import { getArchitect } from './get-architect';
import { getStyle } from './get-style';
import { getEstate } from './get-estate';
import { getCoastToCoast } from './get-coast-to-coast';
import { getMLS } from './get-mls';
import fs from 'fs';
import path from 'path';

export async function getData({ params, postType }) {
  switch (postType) {
    case 'page-post':
      let data = getPagePostData({ params, postType });
      return data;
    case 'post':
      return getPostData({ params, postType });
    case 'neighborhood':
      return getNeighborhoodData({ params, postType });
    case 'home':
      return getHomeData({ params, postType });
    case 'architect':
      return getArchitectData({ params, postType });
    case 'style':
      return getStyleData({ params, postType });
    case 'estate':
      return getEstateData({ params, postType });
    case 'coast-to-coast':
      return getCoastToCoastData({ params, postType });
  }

  if (params?.slug) {
    switch (params.slug) {
      case 'neighborhoods':
      case 'mls':
        return getMLSData({ params, postType });
    }
  }

  return getPageData({ params, postType });
}

async function getPagePostData({ params, postType }) {
  let data = await getPage(params?.slug);
  let post: any = '';

  if (!data?.page) {
    data = await getPost(params?.slug);

    if (!data?.post) {
      let content = '';
      let seo = {};
      let meta = {
        slug: '',
        title: '',
        featuredImage: '',
        postType: '',
        databaseId: 0,
        blog: '',
      };
      return { content, meta, seo };
    }

    post = data.post;
  } else {
    post = data.page;
  }

  let { content, slug, title, featuredImage, seo, databaseId } = post;

  let blog = '';
  if (content?.includes('<gallop-blog-posts')) {
    const blogData = await getBlogPosts();
    if (blogData?.posts?.edges) {
      blog = blogData.posts.edges;
    }
  }

  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    blog: blog,
  };

  return { content, meta, seo };
}

async function getPostData({ params, postType }) {
  const data = await getPost(params?.slug);

  if (!data?.post) {
    let content = '';
    let seo = {};
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: 'post',
      databaseId: 0,
    };
    return { content, meta, seo };
  }

  let { post } = data;
  let { content, slug, title, featuredImage, seo, databaseId } = post;
  let meta = { slug, title, featuredImage, postType: postType, databaseId };

  return { content, meta, seo };
}

async function getNeighborhoodData({ params, postType }) {
  const data = await getNeighborhood(params?.slug);

  if (!data?.neighborhood) {
    let content = '';
    let seo = {};
    let mls = {};
    let neighborhoodBoundaries = '';
    let subNeighborhoodBoundaries = '';
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: 'neighborhood',
      databaseId: 0,
      mls: mls,
      neighborhoodBoundaries: neighborhoodBoundaries,
      subNeighborhoodBoundaries: subNeighborhoodBoundaries,
      neighborhoodChildren: [],
      neighborhoodBottomTier: [],
    };
    return { content, meta, seo };
  }

  let { neighborhood } = data;
  let {
    content,
    slug,
    title,
    featuredImage,
    seo,
    databaseId,
    gallopNeighborhoodIds,
    gallopNeighborhoodChildren,
    gallopNeighborhoodBottomTier,
    gallopNeighborhoodBoundaries,
  } = neighborhood;

  let mls: any = {};
  let subNeighborhoodBoundaries: any = [];
  let neighborhoodChildren: any = [];
  let neighborhoodBottomTier: any = [];

  // we only want to do this extra api fetch if we are loading the block.
  if (content?.includes('<gallop-mls')) {
    const mlsData = await getMLSHomes(gallopNeighborhoodIds, 10);
    const subBoundaries = await getSubBoundaries(
      gallopNeighborhoodIds,
      'query'
    );
    const { neighborhoods: nhood } = subBoundaries;
    if (gallopNeighborhoodChildren) {
      neighborhoodChildren = gallopNeighborhoodChildren.split(',');
      neighborhoodChildren = neighborhoodChildren.map((value: any) => {
        return parseInt(value);
      });
    }
    if (gallopNeighborhoodBottomTier) {
      neighborhoodBottomTier = gallopNeighborhoodBottomTier.split(',');
      neighborhoodBottomTier = neighborhoodBottomTier.map((value: any) => {
        return parseInt(value);
      });
    }
    if (nhood) {
      subNeighborhoodBoundaries = nhood.edges;
    }
    mls = mlsData;
  }

  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    mls: mls,
    neighborhoodBoundaries: gallopNeighborhoodBoundaries,
    subNeighborhoodBoundaries: subNeighborhoodBoundaries,
    neighborhoodChildren,
    neighborhoodBottomTier,
  };

  return { content, meta, seo };
}

async function getHomeData({ params, postType }) {
  const data = await getHome(params?.slug);

  if (!data?.home) {
    let content = '';
    let seo = {};
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: 'home',
      databaseId: 0,
      gallopHomeNeighborhoodSlug: '',
      gallopHomeStyleId: '',
    };
    return { content, meta, seo };
  }

  let { home } = data;
  let {
    content,
    slug,
    title,
    featuredImage,
    seo,
    databaseId,
    gallopHomeNeighborhoodSlug,
    gallopHomeStyleId,
  } = home;
  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    gallopHomeNeighborhoodSlug,
    gallopHomeStyleId,
  };

  return { content, meta, seo };
}

async function getArchitectData({ params, postType }) {
  const data = await getArchitect(params?.slug);

  if (!data?.architect) {
    let content = '';
    let seo = {};
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: 'architect',
      databaseId: 0,
      gallopArchitectParentSlug: '',
    };
    return { content, meta, seo };
  }

  let { architect } = data;
  let {
    content,
    slug,
    title,
    featuredImage,
    seo,
    databaseId,
    gallopArchitectParentSlug,
  } = architect;
  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    gallopArchitectParentSlug,
  };

  return { content, meta, seo };
}

async function getStyleData({ params, postType }) {
  const data = await getStyle(params?.slug);

  if (!data?.style) {
    let content = '';
    let seo = {};
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: 'style',
      databaseId: 0,
      gallopStyleParentSlug: '',
    };
    return { content, meta, seo };
  }

  let { style } = data;
  let {
    content,
    slug,
    title,
    featuredImage,
    seo,
    databaseId,
    gallopStyleParentSlug,
  } = style;
  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    gallopStyleParentSlug,
  };

  return { content, meta, seo };
}

async function getEstateData({ params, postType }) {
  const data = await getEstate(params?.slug);

  if (!data?.estate) {
    let content = '';
    let seo = {};
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: 'estate',
      databaseId: 0,
      gallopEstateParentSlug: '',
    };
    return { content, meta, seo };
  }

  let { estate } = data;
  let {
    content,
    slug,
    title,
    featuredImage,
    seo,
    databaseId,
    gallopEstateParentSlug,
  } = estate;
  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    gallopEstateParentSlug,
  };

  return { content, meta, seo };
}

async function getCoastToCoastData({ params, postType }) {
  const data = await getCoastToCoast(params?.slug);

  if (!data?.coastToCoast) {
    let content = '';
    let seo = {};
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: 'coast-to-coast',
      databaseId: 0,
      gallopCoastToCoastParentSlug: '',
    };
    return { content, meta, seo };
  }

  let { coastToCoast } = data;
  let {
    content,
    slug,
    title,
    featuredImage,
    seo,
    databaseId,
    gallopCoastToCoastParentSlug,
  } = coastToCoast;
  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    gallopCoastToCoastParentSlug,
  };

  return { content, meta, seo };
}

async function getMLSData({ params, postType }) {
  const data = await getMLS(params?.slug);

  if (!data?.page) {
    let content = '';
    let seo = {};
    let mls = {};
    let neighborhoodBoundaries = '';
    let subNeighborhoodBoundaries = '';
    let neighborhoods = '';
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: '',
      databaseId: 0,
      blog: '',
      mls: mls,
      neighborhoodBoundaries: neighborhoodBoundaries,
      subNeighborhoodBoundaries: subNeighborhoodBoundaries,
      neighborhoodChildren: [],
      neighborhoodBottomTier: [],
    };
    return { content, meta, seo };
  }

  let { page, neighborhoods } = data;
  let mls: any = {};
  let neighborhoodChildren: any = [];
  let neighborhoodBottomTier: any = [];

  neighborhoods?.edges.map((n: any) => {
    neighborhoodChildren.push(parseInt(n.node.databaseId));
    neighborhoodBottomTier.push(parseInt(n.node.databaseId));
  });

  const filePath = path.join(process.cwd(), '_data/_dallas-boundary.txt');
  const neighborhoodBoundaries = fs.readFileSync(filePath, 'utf8');
  const dallasEdge = {
    node: {
      databaseId: 6,
      excerpt: '',
      featuredImage: {},
      slug: 'neighborhoods',
      title: 'Dallas',
      gallopNeighborhoodBoundaries: neighborhoodBoundaries,
    },
  };

  let { content, slug, title, featuredImage, seo, databaseId } = page;
  let blog = '';

  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    blog: blog,
    neighborhoodBoundaries,
    subNeighborhoodBoundaries: [dallasEdge, ...neighborhoods?.edges],
    neighborhoodChildren,
    neighborhoodBottomTier,
    neighborhoods,
  };

  return { content, meta, seo };
}

async function getPageData({ params, postType }) {
  const data = await getPage(params?.slug);

  if (!data?.page) {
    let content = '';
    let seo = {};
    let meta = {
      slug: '',
      title: '',
      featuredImage: '',
      postType: '',
      databaseId: 0,
      blog: '',
    };
    return { content, meta, seo };
  }

  let { page } = data;
  let { content, slug, title, featuredImage, seo, databaseId } = page;
  let blog = '';

  if (content?.includes('<gallop-blog-posts')) {
    const blogData = await getBlogPosts();
    if (blogData?.posts?.edges) {
      blog = blogData.posts.edges;
    }
  }

  let meta = {
    slug,
    title,
    featuredImage,
    postType: postType,
    databaseId,
    blog: blog,
  };

  return { content, meta, seo };
}
