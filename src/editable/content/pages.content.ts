import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated bookmarks, collections, and resources',
      description: 'Discover hand-picked bookmarks, organized collections, and useful resources through a clean, distraction-free browsing experience.',
      openGraphTitle: 'Curated bookmarks, collections, and resources',
      openGraphDescription: 'A curated home for bookmarks, collections, and resources worth saving and sharing.',
      keywords: ['bookmarks', 'curated collections', 'resource library', 'saved links', 'content discovery'],
    },
    hero: {
      badge: 'Curated bookmarks & resources',
      title: ['A curated home for', 'bookmarks, collections & resources.'],
      description: 'Discover hand-picked links, organized collections, and reference-worthy resources — all in one clean, fast place built for finding what matters.',
      primaryCta: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryCta: { label: 'Search resources', href: '/search' },
      searchPlaceholder: 'Search bookmarks, collections, and resources',
      focusLabel: 'Focus',
      featureCardBadge: 'freshly curated',
      featureCardTitle: 'The newest saved resources lead the homepage.',
      featureCardDescription: 'Recently added bookmarks and collections stay at the center of the experience.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and connecting different kinds of content.',
      paragraphs: [
        'This site brings together article-style reading, visual browsing, and structured discovery so visitors can move naturally between different content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start curating',
      title: 'Save it, organize it, and make it easy to find again.',
      description: 'Add a bookmark, build a collection, or share a resource — and help others discover the links worth keeping.',
      primaryCta: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to save and rediscover the web.',
    description: `${slot4BrandConfig.siteName} is built to make bookmarks, collections, and resources feel like one organized, easy-to-browse library.`,
    paragraphs: [
      'Instead of letting useful links pile up and disappear, the platform keeps curated bookmarks grouped, labelled, and easy to move through.',
      'Whether you arrive looking for a single resource or a whole collection, you can keep discovering related links without losing the thread.',
    ],
    values: [
      {
        title: 'Curation-first experience',
        description: 'We prioritize clarity, structure, and signal over noise so the resources worth keeping rise to the top.',
      },
      {
        title: 'Organized collections',
        description: 'Bookmarks and resources are grouped into clean collections so discovery feels natural and intentional.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear pages to help visitors find genuinely useful links faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
