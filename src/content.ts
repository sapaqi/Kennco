export const links = {
  car: 'https://www.kennco.ie/car-insurance-quote/',
  van: 'https://www.kennco.ie/van-insurance/',
  travel: 'https://www.kennco.ie/travel-insurance/',
  home: '/home-insurance/',
  quote: '/get-a-quote/',
  renew: 'https://www.kennco.ie/renewals/',
  contact: 'https://www.kennco.ie/contact-us/',
  help: '/help-centre/',
  careers: '/careers/',
  meetTheTeam: '/meet-the-team/',
  customerSatisfaction: '/kennco-customer-satisfaction-2025/',
  about: 'https://www.kennco.ie/about-us/',
  documents: '/downloads/',
  blog: 'https://www.kennco.ie/blog/',
  portal: 'https://www.virtualcabinetportal.com/MyPortal/Login?org=kenncounderwritingltd',
  privacy: 'https://www.kennco.ie/privacy-statement/',
  terms: 'https://www.kennco.ie/terms-of-business/',
  complaints: 'https://www.kennco.ie/kennco-complaints-procedure/',
  fees: 'https://www.kennco.ie/fees-and-commissions/',
} as const

export const covers = [
  { name: 'Car', key: 'car', image: 'cover-car', href: '/car-insurance/', width: 640, height: 249 },
  { name: 'Van', key: 'van', image: 'cover-van', href: '/van-insurance/', width: 640, height: 270 },
  { name: 'Travel', key: 'travel', image: 'cover-travel', href: '/travel-insurance/', width: 433, height: 440 },
  { name: 'Home', key: 'home', image: 'cover-home', href: links.home, width: 455, height: 440 },
] as const

// Verbatim review excerpts and names from the supplied homepage, without invented scores or dates.
export const reviews = [
  { name: 'Ruby Murtagh', initials: 'RM', text: 'KennCo Insurance were amazing to deal with. I initially spoke with Aron on the phone and he helped me get a car insurance quote and answered any questions I had. He made the whole process very easy and simple...' },
  { name: "Ed O'Reilly", initials: 'EO', text: "I've been with KennCo Insurance since I returned to Ireland. They have been very responsive to my numerous questions. Very prompt when I request a copy of my insurance documents, always get them..." },
  { name: "Kate O'Connell", initials: 'KO', text: "I was very happy with my experience with KennCo insurance yesterday. Though I wasn't able to get a quote online, I was able to get a quote over the phone. The number was listed on the quote page and I was able to get through to a ..." },
]

// Preserve the approved source text, including the six unfinished placeholder answers.
const faqPlaceholder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
export const faqs = [
  { question: 'Who can purchase this insurance?', answer: 'This insurance is available only to residents of the Republic of Ireland who purchase their cover before they travel.' },
  { question: 'Who are the Insurers?', answer: faqPlaceholder },
  { question: 'Are business trips covered?', answer: faqPlaceholder },
  { question: 'Am I entitled to a discount if I have Private Medical Healthcare?', answer: faqPlaceholder },
  { question: 'Am I covered for any leisure activities?', answer: faqPlaceholder },
  { question: 'Can any children over the age limit or other family relatives be added to the policy?', answer: faqPlaceholder },
  { question: 'Do I need to take my policy with me when travelling?', answer: faqPlaceholder },
]

export const articles = [
  {
    title: '12 Last-Minute Checks Before Your Irish Driving Test',
    category: 'News', date: '24/09/26', dateTime: '2026-09-24',
    excerpt: 'The lead up to your driving test can be a nervous time, and it’s easy to feel like you have a hundred different things to...',
    image: 'news-driving', alt: 'A driving instructor and learner beside a car',
    href: links.blog, linkLabel: 'Read full article',
  },
  {
    title: 'Are E-scooters Legal in Ireland?',
    category: 'Learn', date: '24/09/26', dateTime: '2026-09-24',
    excerpt: 'E-scooters have become a common sight on Irish streets over the past few years, whether it’s for the daily commute or...',
    image: 'news-scooter', alt: 'An electric scooter on a city street',
    href: links.blog, linkLabel: 'Read full article',
  },
  {
    title: 'Is Home Insurance a Legal Requirement in Ireland?',
    category: 'Learn', date: '24/09/26', dateTime: '2026-09-24',
    excerpt: 'When it comes to insurance in Ireland, most of us know that some types are compulsory. For example, you can’t...',
    image: 'news-home', alt: 'A small model house resting in a person’s hand',
    href: 'https://www.kennco.ie/is-home-insurance-a-legal-requirement-in-ireland/', linkLabel: 'Read full article',
  },
]

export const supportLinks = [
  { name: 'Contact Us', href: links.contact, icon: 'phone' },
  { name: 'Policy Downloads', href: links.documents, icon: 'document' },
  { name: 'Fees & Commissions', href: links.fees, icon: 'document' },
  { name: 'Help Centre', href: links.help, icon: 'help' },
  { name: 'Complaints Procedure', href: links.complaints, icon: 'chat' },
  { name: 'User Guide', href: links.documents, icon: 'book' },
] as const

export const guideLinks = [
  { name: 'Car insurance for named drivers', href: 'https://www.kennco.ie/car-insurance-quote/' },
  { name: 'Young driver car insurance', href: 'https://www.kennco.ie/young-drivers-car-insurance/' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Expats car insurance', href: 'https://www.kennco.ie/car-insurance-after-returning-to-ireland/' },
  { name: 'First time driver insurance', href: 'https://www.kennco.ie/young-drivers-car-insurance/' },
]

export const footerGroups = [
  { title: 'Products', items: [...['car', 'van', 'travel', 'home'].map(key => covers.find(cover => cover.key === key)!), { name: 'Business Insurance', href: 'https://www.kennco.ie/professional-indemnity-insurance/' }] },
  { title: 'Quick Links', items: [{ name: 'Make a Claim', href: links.contact }, { name: 'Resume quote', href: links.car }, { name: 'Your Portal', href: links.portal }, { name: 'Customer Survey', href: links.customerSatisfaction }, { name: 'Complaints Procedure', href: links.complaints }] },
  { title: 'About us', items: [{ name: 'Meet the Team', href: links.meetTheTeam }, { name: 'Our Story & Regulatory Status', href: links.about }, { name: 'Careers', href: links.careers }, { name: 'Fees & Commissions', href: links.fees }, { name: 'Capital Providers', href: 'https://www.kennco.ie/capitalproviders/' }] },
  { title: 'Media', items: [{ name: 'Blog', href: '/blog/' }, { name: 'News', href: 'https://www.kennco.ie/category/news/' }, { name: 'Media centre', href: '/media-centre/' }, { name: 'Learn', href: links.blog }] },
]
