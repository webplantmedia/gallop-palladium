import Iconify from '@components/iconify';
import dataEnrichmentIcon from '@iconify/icons-carbon/data-enrichment';
import personIcon from '@iconify/icons-carbon/person';
import emailIcon from '@iconify/icons-carbon/email';
import chatIcon from '@iconify/icons-carbon/chat';
import phoneIcon from '@iconify/icons-carbon/phone';
import devicePhoneMobileIcon from '@iconify/icons-heroicons/device-phone-mobile';
import playFilledAltIcon from '@iconify/icons-carbon/play-filled-alt';
import EnvelopeIcon from '@iconify/icons-heroicons/envelope';
import ChatBubbleBottomCenterTextIcon from '@iconify/icons-heroicons/chat-bubble-bottom-center-text';
import logoLinkedin from '@iconify/icons-carbon/logo-linkedin';
import logoFacebook from '@iconify/icons-carbon/logo-facebook';
import logoTwitter from '@iconify/icons-carbon/logo-twitter';
import logoInstagram from '@iconify/icons-carbon/logo-instagram';
import logoYouTube from '@iconify/icons-carbon/logo-youtube';
import ArrowGrowth20FilledIcon from '@iconify/icons-fluent/arrow-growth-20-filled';
import Chat16Regular from '@iconify/icons-fluent/chat-16-regular';
import dotMarkIcon from '@iconify/icons-carbon/dot-mark';
import InstagramLogo from '@svg/instagram-logo.svg';
// import Image from 'next/image';

export const _profile = [
  {
    title: 'Secrets of Success',
    subTitle: 'Your Interest is Our Passion',
    icon: <Iconify className="w-5 h-5" icon={personIcon} />,
    children: [
      {
        title: 'About Page',
        subTitle:
          'Some of the secrets allowing Douglas Newby to bring unparalleled success to clients buying or selling a home.',
        href: '/about/',
        alignTop: true,
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Preservation & Revitalization',
        subTitle:
          'Preservation and revitalization success propels Douglas Newby to identify and illumniate neighborhoods, architects, archtiecturally significant homes, and homes that make us happy.',
        href: '/preservation-accomplishments/',
        alignTop: true,
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Mission',
        href: '/about/motivation/',
        alignTop: true,
        subTitle:
          'If you are passionate about architecture, design and real value, then we share an interest.',
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Shared Values',
        href: '/about/vision/',
        alignTop: true,
        subTitle:
          'We recognize a home that makes you happy is the foundation of a neighborhood and city.',
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Approach',
        href: '/about/approach/',
        alignTop: true,
        subTitle: 'Finding long-term real value in a home you will love.',
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Representing You',
        href: '/about/results/',
        alignTop: true,
        subTitle:
          'Graceful negotiations that achieves results that exceeds your hopes and expectations.',
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Origins',
        href: '/about/origins/',
        alignTop: true,
        subTitle:
          'Architecture, art, and community filled the aesthic life of Douglas Newby which underpins his evalution of homes.',
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Clients',
        href: '',
        alignTop: true,
        subTitle:
          '"Whenever I meet someone who is really smart, I know they will enjoy working with Douglas Newby."',
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Vision',
        subTitle:
          'Douglas Newby is precient when it comes to identifing neighorhood that will increasingly flourish.',
        href: '/about/vision/',
        alignTop: true,
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
      {
        title: 'Media and Articles',
        subTitle:
          'Writing about homes, neighborhoods, and architects, allows me to better help buyers make an inspired decision on a home.',
        href: '/articles/',
        alignTop: true,
        icon: (
          <div className="w-5 h-5 flex items-center shrink-0 justify-center">
            <Iconify className="text-primary-main w-2 h-2" icon={dotMarkIcon} />
          </div>
        ),
      },
    ],
  },
  {
    title: 'Instagram',
    subTitle:
      "A Dallas insider's personal interpretation of Dallas life and the connection to the history of the city.",
    icon: <Iconify className="w-5 h-5" icon={logoInstagram} />,
    children: [
      {
        title: 'Follow Douglas Newby',
        subTitle: '',
        href: 'https://www.instagram.com/douglasnewby/',
        icon: (
          <div className="bg-[#ffffff] rounded-sm w-12 h-12 rounded-sm flex items-center justify-center ">
            <img
              src="/instagram-logo.png"
              className="w-6 h-6 aspect-square rounded-sm object-cover object-center"
            />
          </div>
        ),
      },
      {
        title: 'Ford and Cece',
        subTitle:
          'Ford and Cece are in the house when you see a yellow Corvette...',
        href: 'https://www.instagram.com/p/CocXQ-muEY9/',
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2023/02/329682550_1323979635050667_3112259716060430616_n-300x225.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            width={300}
            height={225}
            //quality={100}
            alt="Ford and Cece"
          />
        ),
      },
      {
        title: 'Orbit of Jim Young',
        subTitle:
          'Jim Young, 40th employee of EDS, is presented first ever Texas Business Hall of Fame...',
        href: 'https://www.instagram.com/p/CmEQthpO5J-/',
        alignTop: true,
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2022/12/319058754_534372511710594_6300974679450040590_n-240x300.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            alt="Orbit of Jim Young"
            width={240}
            height={300}
            //quality={100}
          />
        ),
      },
      {
        title: 'Architectural Focus',
        subTitle:
          'For 25 years, the Dallas Architecture Forum has focused on Dallas, regional, national, and international architects...',
        href: 'https://www.instagram.com/p/CltLjmAOBWf/',
        alignTop: true,
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2022/12/318033922_509028311255625_1313783635063128887_n-300x225.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            width={300}
            height={225}
            alt="Architectural Focus@DallasArchForum @AlterStudio @HockerDesign"
            //quality={100}
          />
        ),
      },
    ],
  },
  {
    title: 'Blog Articles',
    subTitle: 'Insights, Musings, Reflections on Dallas',
    icon: <Iconify className="w-5 h-5" icon={dataEnrichmentIcon} />,
    children: [
      {
        title: 'DouglasNewby.com',
        subTitle: 'See Over 100 Blog Articles',
        href: 'https://douglasnewby.com/',
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2022/01/favicon-7.png"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            width={512}
            height={512}
            //quality={100}
            alt="Douglas Newby Favicon"
          />
        ),
      },
      {
        title: 'How Architect Designed Homes Can Outperform the Market',
        // subTitle: 'DouglasNewby.com',
        href: 'https://douglasnewby.com/2023/01/how-architect-designed-homes-can-outperform-the-market/',
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2020/04/Drane-5543-DNiExt-IMG_9098-retouched-300x225.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            width={300}
            height={225}
            //quality={100}
            alt="Home Designed by Architect Max Levy"
          />
        ),
      },
      {
        title: 'Organic Urbanism is the Cure for New Urbanism',
        // subTitle: 'DouglasNewby.com',
        href: 'https://douglasnewby.com/2020/06/organic-urbanism-is-the-cure-for-new-urbanism/',
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2022/06/Organic-IMG_6313-4902-Tremont-300x225.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            width={300}
            height={225}
            alt="4902 Tremont"
            //quality={100}
          />
        ),
      },
      {
        title:
          'Architecturally Significant Homes in Dallas are Best Collection in Country',
        // subTitle: 'DouglasNewby.com',
        href: 'https://douglasnewby.com/2022/11/architecturally-significant-homes-in-dallas-are-best-collection-in-country/',
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2022/11/IMG_3702-300x225.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            width={300}
            height={200}
            //quality={100}
            alt="Highland Park Residence by AlterStudio Architecture"
          />
        ),
      },
    ],
  },
  {
    title: 'YouTube',
    subTitle:
      'Enjoy videos curated by Douglas Newby with over 24,000 subscribers.',
    icon: <Iconify className="w-5 h-5" icon={logoYouTube} />,
    children: [
      {
        title: 'Subscribe to Architecturally Significant Homes Channel',
        subTitle: '',
        href: 'https://www.youtube.com/c/ArchitecturallySignificantHomes',
        icon: (
          <div className="bg-[#FF0000] rounded-sm w-12 h-12 rounded-sm flex items-center justify-center ">
            <Iconify
              className="w-7 h-7 text-white w-8 h-8"
              icon={logoYouTube}
            />
          </div>
        ),
      },
      {
        title: 'Finest Estate Home, Crespi Hicks Estate',
        subTitle: '14.2 Million Views',
        href: 'https://www.youtube.com/watch?v=qQkYis9Q6TY',
        alignTop: true,
        icon: (
          <div className="w-12 h-12 relative">
            <img
              src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/19305/Hollow-Way-10000-3259-300x200.jpg"
              className="w-12 aspect-square rounded-sm object-cover object-center"
              width={300}
              height={200}
              alt="Architect Maurice Fatio Designed Estate Home"
              //quality={100}
            />
            <span className="w-full inset-0 absolute flex items-center justify-center">
              <Iconify
                icon={playFilledAltIcon}
                className="w-6 h-6 text-white/70"
              />
            </span>
          </div>
        ),
      },
      {
        title: 'Dallas Modern Home Selected by AIA',
        subTitle: '874K Views',
        // subTitle: 'DouglasNewby.com',
        href: 'https://www.youtube.com/watch?v=cCKN9CD7W6A',
        alignTop: true,
        icon: (
          <div className="w-12 h-12 relative">
            <img
              src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2696/Braewood-40-425-300x200.jpg"
              className="w-12 aspect-square rounded-sm object-cover object-center"
              alt="Bedroom With Open View in Ogelsby Greene Designed Home"
              width={300}
              height={200}
              //quality={100}
            />
            <span className="w-full inset-0 absolute flex items-center justify-center">
              <Iconify
                icon={playFilledAltIcon}
                className="w-6 h-6 text-white/70"
              />
            </span>
          </div>
        ),
      },
      {
        title:
          'Mayflower Estates Neighborhood has Dallas Estate Homes and Midcentury Design',
        subTitle: '31K Views',
        href: 'https://www.youtube.com/watch?v=PTbemGaC9zQ',
        alignTop: true,
        icon: (
          <div className="w-12 h-12 relative">
            <img
              src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/37785/smitharc_LAKEHURST-RES_8-300x193.jpg"
              className="w-12 aspect-square rounded-sm object-cover object-center"
              alt="International Modern and Texas Modern Are Expressed"
              width={300}
              height={193}
              //quality={100}
            />
            <span className="w-full inset-0 absolute flex items-center justify-center">
              <Iconify
                icon={playFilledAltIcon}
                className="w-6 h-6 text-white/70"
              />
            </span>
          </div>
        ),
      },
    ],
  },
  {
    title: 'LinkedIn',
    subTitle:
      'Real estate broker specializing in architecturally significant homes in the finest neighborhoods.',
    icon: <Iconify className="w-5 h-5" icon={logoLinkedin} />,
    children: [
      {
        title: 'Connect with Douglas Newby',
        subTitle: '',
        href: 'https://www.linkedin.com/in/douglasnewby/',
        icon: (
          <div className="bg-[#0077b5] rounded-sm w-12 h-12 rounded-sm flex items-center justify-center ">
            <Iconify
              className="w-7 h-7 text-white w-8 h-8"
              icon={logoLinkedin}
            />
          </div>
        ),
      },
      {
        title: 'How Architect Designed Homes Can Outperform the Market',
        subTitle: '31 Likes · 5 Comments',
        href: 'https://www.linkedin.com/posts/douglasnewby_how-your-architect-designed-home-can-outperform-activity-7018249649484349440-Ayty?utm_source=share&utm_medium=member_desktop',
        alignTop: true,
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2020/04/Drane-5543-DNiExt-IMG_9098-retouched-300x225.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            alt="Home Designed by Architect Max Levy"
            width={300}
            height={225}
            //quality={100}
          />
        ),
      },
      {
        title: 'Orbit of Jim Young',
        subTitle: '127 Likes · 15 Comments',
        href: 'https://www.linkedin.com/posts/douglasnewby_jimyoung-texasbusinesshalloffame-eds-activity-7008072401284452352-lpcL?utm_source=share&utm_medium=member_desktop',
        alignTop: false,
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2022/12/IG-Orbit-of-Jim-Young-IMG_4047-H-240x300.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            alt="Orbit of Jim Young"
            width={240}
            height={300}
            //quality={100}
          />
        ),
      },
      {
        title:
          'Architecturally Significant Homes in Dallas are Best Collection in Country',
        subTitle: '31 Likes · 3 Comments',
        href: 'https://www.linkedin.com/posts/douglasnewby_architecturally-significant-homes-in-dallas-activity-6998031200531480576-adzw?utm_source=share&utm_medium=member_desktop',
        alignTop: true,
        icon: (
          <img
            src="https://architecturallysignificant.dougnewby.com/wp-content/uploads/2022/11/IMG_3702-300x225.jpg"
            className="w-12 aspect-square rounded-sm object-cover object-center"
            width={300}
            height={225}
            //quality={100}
            alt="Highland Park Residence by AlterStudio Architecture"
          />
        ),
      },
    ],
  },
];
export const _cta = [
  {
    title: 'Call - (214) 522-1000',
    href: 'tel:2145221000',
    icon: <Iconify className="w-5 h-5 shrink-0" icon={phoneIcon} />,
  },
  {
    title: 'Text - (214) 505-9999',
    href: 'tel:2145059999',
    icon: (
      <Iconify
        className="w-5 h-5 shrink-0"
        icon={ChatBubbleBottomCenterTextIcon}
      />
    ),
  },
  {
    title: 'Email Douglas',
    href: 'mailto:dnewby@dougnewby.com',
    icon: <Iconify className="w-5 h-5 shrink-0" icon={EnvelopeIcon} />,
  },
];

export const _follow = [
  {
    href: 'https://www.instagram.com/douglasnewby/',
    icon: <img src="/instagram-logo.png" className="w-5 h-5" />,
  },
  {
    href: 'https://www.youtube.com/c/ArchitecturallySignificantHomes',
    icon: <Iconify icon={logoYouTube} className="text-[#ff0000] w-6 h-6" />,
  },
  {
    href: 'https://www.linkedin.com/in/douglasnewby/',
    icon: <Iconify icon={logoLinkedin} className="text-[#0077b5] w-6 h-6" />,
  },
];

export const _about = [
  {
    name: 'Testimonials',
    href: 'testimonials',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Motivation',
    href: 'motivation',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Vision',
    href: 'vision',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Understanding Neighborhoods',
    href: 'understanding-neighborhoods',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Profile of Douglas Newby',
    href: 'profile',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Joy in the Process and Result',
    href: 'process-and-result',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Architecturally Significant Homes',
    href: 'architectually-significant-homes',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Origins',
    href: 'origins',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Case Studies',
    href: 'case-studies',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Preservation Accomplishments',
    href: 'preservation-accomplishments',
    icon: <Iconify icon={Chat16Regular} />,
  },
  {
    name: 'Neighborhood Revitalization Success',
    href: 'neighborhood-revitalization',
    icon: <Iconify icon={Chat16Regular} />,
  },
];

export const _sidebarAbout =
  'Douglas Newby knows the potential inventory of architecturally significant homes and the nuances of neighborhoods in Highland Park better than any real estate agent in Dallas. Understanding inventory is more than relying on MLS or “hip pockets.” It is approaching the market as if every home in Dallas is for sale. When a buyer looks for a home from that perspective, they are not constrained by a random slice of what is presently on the market or hoping something better will magically come on the market. A traditional approach leaves economics and aesthetics to chance. For decades Douglas Newby has identified architecturally significant homes and helped clients select neighborhoods in good locations that make them happy.';

export const _sidebarAboutDMH =
  'Douglas Newby is the realtor that knows the potential inventory of architecturally significant modern homes and the best location, neighborhoods, and sites. Understanding the inventory of modern homes is more than relying on what is offered for sale in MLS or even being aware of “hip pockets.” It is approaching the market as if every modern home in Dallas is for sale. When a buyer looks for a home from that perspective, they are not constrained by a random slice of what is presently on the market or hoping something better will magically come on the market. A common approach of finding a modern home leaves economics and aesthetics to chance. For decades, Douglas Newby has identified architecturally significant modern homes and helped clients select the home that makes an aesthetic statement and makes them happy living in the home.';
