/**
 * Stories from the Field — case-study content sourced ONLY from the official PDFs.
 * Do not add facts, locations, quotes, or details that are not supported by those documents.
 */

import lalitaCover from '../assets/images/case-studies/lalita-devi-cover.jpg';
import lalitaDetail from '../assets/images/case-studies/lalita-devi-detail.jpg';
import manishaCover from '../assets/images/case-studies/manisha-cover.jpg';
import manishaDetail from '../assets/images/case-studies/manisha-detail.jpg';
import poojaCover from '../assets/images/case-studies/pooja-cover.jpg';
import poojaDetail from '../assets/images/case-studies/pooja-detail.jpg';
import sumanCover from '../assets/images/case-studies/suman-cover.jpg';

export const storiesFromTheFieldSection = {
  eyebrow: 'Stories from the Field',
  title: 'Stories from the Field',
  description: 'Real journeys of women building enterprises in their communities.',
};

/**
 * @typedef {object} CaseStudy
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} title
 * @property {string} teaser
 * @property {string} summary
 * @property {string} enterprise
 * @property {{ village?: string, block?: string, district?: string, state?: string, display: string }} location
 * @property {string[]} themes
 * @property {boolean} featured
 * @property {{ src: string, alt: string } | null} image
 * @property {{ src: string, alt: string }[]} gallery
 * @property {{ label: string, paragraphs: string[] }[]} sections
 * @property {{ text: string, language?: 'en' | 'hi' }[]} quotes
 * @property {string} pdfUrl
 * @property {string} pdfFileName
 */

/** @type {CaseStudy[]} */
export const caseStudies = [
  {
    id: 'lalita-devi',
    slug: 'lalita-devi',
    name: 'Lalita Devi',
    title: "From Self-Doubt to Self-Reliance: Lalita Devi's Entrepreneurial Journey",
    teaser:
      'A Shiv Self Help Group member from Pohara village whose journey with handmade herbal soaps became a path to confidence, identity, and financial independence.',
    summary:
      'There was a time when Lalita Devi did not go out of her house without thinking, felt uneasy talking to people, and had to ask others for even small amounts of money. Today she speaks with customers, takes part in events, shows her products, and helps other women start their businesses. Her story is not only about making herbal soaps—it is about finding confidence, finding who she is, and becoming financially independent by working together with others.',
    enterprise:
      'Handmade herbal soaps and related cleaning products (including detergent powder and phenyl) with Shiv Self Help Group',
    location: {
      village: 'Pohara village',
      block: 'Raith Block',
      district: 'Kangra district',
      state: 'Himachal Pradesh',
      display: 'Pohara village, Raith Block, Kangra district, Himachal Pradesh',
    },
    themes: [
      'Self-reliance and confidence',
      'SHG entrepreneurship',
      'Handmade herbal products',
      'IIT Delhi training and market exposure',
    ],
    featured: true,
    image: {
      src: lalitaCover,
      alt: 'Lalita Devi seated for a portrait during Project Bharti documentation',
    },
    gallery: [
      {
        src: lalitaCover,
        alt: 'Lalita Devi seated for a portrait during Project Bharti documentation',
      },
      {
        src: lalitaDetail,
        alt: 'Handmade herbal soap products associated with Lalita Devi’s women-led enterprise',
      },
    ],
    sections: [
      {
        label: 'Beginning of the Journey',
        paragraphs: [
          'Lalita Devi lives in Pohara village in Raith Block of Kangra district. She has been part of the Shiv Self Help Group under the National Rural Livelihood Mission (NRLM) since 2013.',
          'The group started making soaps, detergent powder and phenyl about a year ago. Six women came together to create a way to earn money while staying in their village. Before they started the business, none of the women had experience in making cleaning products. They learned through training and began making herbal soaps by hand using ingredients such as goat milk, rice extract, coconut oil, glycerine, rose water and Vitamin E capsules.',
        ],
      },
      {
        label: 'A Business Built on Trust',
        paragraphs: [
          'The group first used the soaps in their own homes to check quality before selling them. Families and neighbours liked the soaps, demand grew through word of mouth, and the group obtained registrations such as Udyam Registration to sell more widely.',
          'The group now sells soaps to individual buyers and in larger quantities, with some customers purchasing as many as 500 soap bars at one time.',
        ],
      },
      {
        label: 'More Than an Income',
        paragraphs: [
          'For Lalita Devi, the biggest achievement is not the number of products sold. It is the confidence she has gained. Before joining the Self Help Group she rarely spoke in public and relied on others whenever money was needed.',
          'Regular meetings, working together and managing the enterprise helped her learn about planning, get loans when needed, and talk confidently with customers. Today she can travel, go to exhibitions, talk to buyers and sell her products without hesitation.',
        ],
      },
      {
        label: 'The Impact of IIT Delhi Training and Market Exposure',
        paragraphs: [
          'The women took part in programmes that strengthened their ability to run businesses. They learned how to present products, package them, talk to customers and sell in the market.',
          'These skills gave them confidence to improve products, sell at exhibitions, and think beyond making products toward building a lasting local business. Entrepreneurship development and capacity-building programmes supported them on this journey.',
        ],
      },
      {
        label: 'Looking Ahead',
        paragraphs: [
          'Lalita Devi dreams of seeing her products reach many more households across Himachal Pradesh and beyond. She hopes to expand production, reach larger markets, and encourage more women to join the enterprise.',
        ],
      },
    ],
    quotes: [
      {
        language: 'en',
        text: 'Do not hesitate to start. Every small step gives you confidence, and confidence changes your life.',
      },
    ],
    pdfUrl: '/case-studies/lalita-devi.pdf',
    pdfFileName: 'lalita-devi-case-study.pdf',
  },
  {
    id: 'manisha',
    slug: 'manisha',
    name: 'Manisha',
    title: 'From Forest Waste to a Future Full of Possibilities: The Journey of Manisha',
    teaser:
      'In Ladwara, Kangra, Manisha leads a women-led enterprise that turns fallen pine needles into eco-friendly handicrafts, livelihoods, and forest-safe opportunity.',
    summary:
      'People used to think that fallen pine needles were trash from the forest. Manisha saw a chance to help people make a living, protect the forest, and show women what they can do. She leads a group of fifteen women who make products from naturally fallen pine needles—creating jobs while caring for the forest at the same time.',
    enterprise: 'Women-led pine needle handicraft enterprise (15 members; more than 20 product types)',
    location: {
      village: 'Ladwara',
      district: 'Kangra district',
      state: 'Himachal Pradesh',
      display: 'Ladwara, Kangra district, Himachal Pradesh',
    },
    themes: [
      'Sustainable livelihoods',
      'Pine needle handicrafts',
      'Women-led enterprise',
      'IIT Delhi Entrepreneurship Development Programme',
    ],
    featured: false,
    image: {
      src: manishaCover,
      alt: 'Manisha holding a handcrafted pine-needle basket from her women-led enterprise',
    },
    gallery: [
      {
        src: manishaCover,
        alt: 'Manisha holding a handcrafted pine-needle basket from her women-led enterprise',
      },
      {
        src: manishaDetail,
        alt: 'Women working together on pine-needle handicrafts in a community setting',
      },
    ],
    sections: [
      {
        label: 'A Small Village, Big Dreams',
        paragraphs: [
          'Ladwara in the Kangra district of Himachal Pradesh is surrounded by hills and forests full of pine trees. Every year, large quantities of pine needles fall on the ground. Most people think these needles are useless, and in summer they can even contribute to forest fires.',
          'Manisha is thirty years old and leads a group of fifteen women who make things from fallen pine needles. Their work helps families earn money and shows that people can make a living by using local resources carefully and working hard.',
        ],
      },
      {
        label: 'Growing Up with Responsibility',
        paragraphs: [
          'Manisha was raised in a family where every expense had to be considered carefully. She completed her Bachelor’s degree and then a Master’s degree in Social Work from IGNOU while working. She worked with a group that helped young girls, women and communities become better leaders.',
          'Meeting village women showed her that many wanted to earn but lacked opportunities. That understanding shaped a guiding question for her journey: if women are willing to work, why can’t work be created within the village itself?',
        ],
      },
      {
        label: 'An Idea Born During Difficult Times',
        paragraphs: [
          'During the COVID-19 pandemic, jobs were unstable and incomes fell. Conversations with women who wanted a way to earn within the village stayed with Manisha. Around that time she learned about the South Asia Women Foundation Fellowship and proposed using pine needles to make environmentally friendly products while creating jobs for women. The idea was accepted, and the fellowship gave her courage to move from planning to action.',
        ],
      },
      {
        label: 'Learning Before Starting',
        paragraphs: [
          'Before starting, Manisha trained for three months with craftspeople already working with pine needles—from collecting and cleaning needles to weaving and finishing products. She then invited women from her village to join. The group grew from eight women to a 15-member group.',
          'They now make more than 20 different items such as baskets, trays, food boxes, keychains, earrings and pen stands, all from naturally fallen pine needles.',
        ],
      },
      {
        label: 'Expanding Beyond the Village',
        paragraphs: [
          'Manisha sought markets through exhibitions, local stores and organisations supporting makers. Products reached stores in Dharamshala, exhibitions at NIFT Kangra, and collaborations with organisations in Dehradun. Larger orders, including handmade pen stands and Rakhi collections, strengthened their confidence.',
        ],
      },
      {
        label: 'Learning Through the IIT Delhi Training',
        paragraphs: [
          'As the business grew, Manisha saw that making products was only one part of running an enterprise. The IIT Delhi Entrepreneurship Development Programme helped her plan, understand the market, and treat her work as a business that could grow.',
          'The training strengthened her confidence to think beyond existing markets. Her enterprise had already moved beyond the village, and entrepreneurship development encouraged her to see these opportunities as part of a larger business journey.',
        ],
      },
      {
        label: 'Taking Local Craft to Wider Markets',
        paragraphs: [
          'Over the years, Manisha and her team turned an idea into a real rural business. Through exhibitions, handicraft fairs and local markets they reached more people, received feedback, and built confidence as a collective example of environmentally grounded, women-led enterprise.',
        ],
      },
    ],
    quotes: [
      {
        language: 'en',
        text: 'If women are willing to work, why can\'t we create work within the village itself?',
      },
      {
        language: 'en',
        text: 'Sometimes the best opportunities are hidden inside the problems we see every day',
      },
      {
        language: 'en',
        text: 'This journey is not only about selling products—it is about creating opportunities, preserving nature, and inspiring more women to believe in their own potential.',
      },
    ],
    pdfUrl: '/case-studies/manisha.pdf',
    pdfFileName: 'manisha-case-study.pdf',
  },
  {
    id: 'pooja',
    slug: 'pooja',
    name: 'Pooja',
    title: 'Growing Together Through Organic Entrepreneurship: The Journey of Pooja',
    teaser:
      'From Naganpat in Dharamshala, Pooja’s women-led Self Help Group builds a local organic enterprise around red rice, black wheat, honey, pickles and more.',
    summary:
      'For Pooja, starting her business was not only about doing something by herself—it was about helping many women at the same time. Her women-led Self Help Group in Naganpat, Dharamshala (Kangra district, Himachal Pradesh) works to bring locally grown organic products to market while creating work and earnings for women in the community.',
    enterprise:
      'Women-led SHG organic products including organic red rice, black wheat, black rice, locally made honey, Kasturi Basmati rice and garlic pickles',
    location: {
      village: 'Naganpat',
      district: 'Kangra district',
      state: 'Himachal Pradesh',
      display: 'Naganpat, Dharamshala, Kangra district, Himachal Pradesh',
    },
    themes: [
      'Organic entrepreneurship',
      'Local resources',
      'Collective SHG enterprise',
      'IIT Delhi Entrepreneurship Development training',
    ],
    featured: false,
    image: {
      src: poojaCover,
      alt: 'Pooja with jars of organic products including red rice, black wheat flour and garlic pickle',
    },
    gallery: [
      {
        src: poojaCover,
        alt: 'Pooja with jars of organic products including red rice, black wheat flour and garlic pickle',
      },
      {
        src: poojaDetail,
        alt: 'Community product showcase linked to Pooja’s organic enterprise journey',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Pooja lives in a village called Naganpat in Dharamshala, in the Kangra district of Himachal Pradesh. She is part of a women-led Self Help Group working to get people to buy products grown locally by women.',
          'The group makes products including organic red rice, black wheat, black rice, locally made honey, Kasturi Basmati rice and garlic pickles. The business started one year ago with the idea of supporting nearby organic products and helping women find work and earn a living.',
        ],
      },
      {
        label: 'The Entrepreneurial Journey',
        paragraphs: [
          'Before selecting products, the group observed changing consumer preferences and conducted informal market research. Increasing awareness about healthy food and organic farming encouraged them to focus on products with growing demand.',
          'Because garlic is widely cultivated in their area, they prepared garlic pickles rather than depending on distant raw materials. Locally grown red rice, black wheat, black rice, honey and Kasturi Basmati became the foundation of the enterprise.',
        ],
      },
      {
        label: 'Business Growth',
        paragraphs: [
          'Although the business is one year old, the journey has been challenging. One difficulty was finding the right machines to process black wheat and speciality rice, because usual machines were damaging the grains. The Cluster Level Federation and block officials helped the group find suitable machines.',
          'At the start, owners and SHG members did much of the cleaning, sorting and preparation themselves before the business was making money. Today the group is introducing products through local markets, government institutions and nearby communities, while aspiring to expand to larger markets.',
        ],
      },
      {
        label: 'Learning Through the IIT Delhi Training',
        paragraphs: [
          'Pooja attended Entrepreneurship Development training conducted by IIT Delhi. She learned that business planning, digital technologies and financial management are important for a community-based enterprise.',
          'Digital literacy sessions encouraged her to explore new ways of promoting products beyond the local area. Financial literacy sessions highlighted the importance of maintaining proper business records of income, expenses, costs and profits.',
        ],
      },
      {
        label: 'Looking Ahead',
        paragraphs: [
          'The enterprise has already made back the money it started with and is moving toward making a profit. Pooja wants to sell to more people, improve product presentation, reach customers outside Himachal Pradesh, and encourage more women in her community to start lasting, environmentally sound enterprises.',
        ],
      },
    ],
    quotes: [
      {
        language: 'en',
        text: 'We wanted to build a business around what our village already had. Instead of searching for opportunities elsewhere, we decided to create value from our own local resources.',
      },
    ],
    pdfUrl: '/case-studies/pooja.pdf',
    pdfFileName: 'pooja-case-study.pdf',
  },
  {
    id: 'shabnam',
    slug: 'shabnam',
    name: 'Shabnam',
    title: 'From Local Resources to Growing Markets: The Entrepreneurial Journey of Shabnam',
    teaser:
      'From Ser Jigas Panchayat, Rajgarh Block, Shabnam builds a food-processing enterprise around Buransh squash, pickles and Sepu Badi with the Jagriti Self Help Group.',
    summary:
      'For Shabnam, entrepreneurship began with the idea that community resources could support a lasting business. She lives in Ser Jigas Panchayat, Rajgarh Block, joined the Jagriti Self Help Group in 2021, and in 2022 began making squash, pickles and Sepu Badi—including Buransh squash made from rhododendron flowers that grow in the nearby hills.',
    enterprise: 'Food processing: Buransh squash, pickles and Sepu Badi (Jagriti Self Help Group; FSSAI-certified labelling)',
    location: {
      village: 'Ser Jigas Panchayat',
      block: 'Rajgarh Block',
      district: 'Not explicitly stated',
      state: 'Himachal Pradesh',
      display: 'Ser Jigas Panchayat, Rajgarh Block, Himachal Pradesh',
    },
    themes: [
      'Local resources',
      'Food processing',
      'Quality and batch records',
      'Digital marketing and IIT Delhi training',
    ],
    featured: false,
    image: null,
    gallery: [],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Shabnam lives in Ser Jigas Panchayat, Rajgarh Block. She joined the Jagriti Self Help Group in 2021 because she wanted to learn new things and become financially self-reliant.',
          'Before food processing, she taught tailoring and made jute bags, crochet items and pine-needle crafts on order for local buyers. In 2022 she started making squash, pickles and Sepu Badi to use local natural resources and help other women earn.',
        ],
      },
      {
        label: 'The Entrepreneurial Journey',
        paragraphs: [
          'Before production, Shabnam and other SHG members received hands-on training in making pickles and squashes. Government programme support helped them buy tools such as a scale, mixer grinder, packaging machine and cookware, with remaining funds used for raw materials.',
          'They first worked on Buransh squash, a drink made from rhododendron flowers that grow naturally in the nearby hills, along with pickles and Sepu Badi from local ingredients. Shabnam focused first on learning production, keeping quality high and building confidence in the products.',
        ],
      },
      {
        label: 'Business Growth',
        paragraphs: [
          'Early challenges included building customer trust. The team first tried products themselves and shared them with friends and family before wider sales. A bottle of squash that first sold for 130 to 150 rupees now sells for 200 rupees a bottle.',
          'Shabnam markets through word of mouth and social media such as Instagram, and keeps records of every batch so customer issues can be traced. Products are sold in villages and in places such as Bilaspur, Nahan and Chandigarh, under the Self Help Group name with certifications such as FSSAI and proper labelling.',
        ],
      },
      {
        label: 'Learning Through the IIT Delhi Training',
        paragraphs: [
          'Shabnam attended the Entrepreneurship Development Programme at IIT Delhi. She learned that business is not limited to making products and must also be managed well and open to new opportunities.',
          'She learned about digital tools such as WhatsApp Business, Amazon, Meesho and other marketplaces; financial record-keeping; formalisation such as Udyam Registration and government support schemes; and the importance of branding, packaging and labelling.',
        ],
      },
      {
        label: 'Applying the Learnings in the Business',
        paragraphs: [
          'She aims to strengthen digital presence, keep systematic digital records of production, sales, expenses and orders, and improve packaging and branding so customers recognise product quality. The programme also increased her confidence to think beyond district-level sales and expand across Himachal Pradesh and gradually to other states.',
        ],
      },
      {
        label: 'Looking Ahead',
        paragraphs: [
          'Shabnam wants to keep adding products, make buying and selling easier, and involve more women in higher-value food processing. For her, the best part is not only business growth but the growing confidence of women in the group through working and learning together.',
        ],
      },
    ],
    quotes: [
      {
        language: 'en',
        text: 'When local resources are combined with determination, skills, and continuous learning, they can create sustainable livelihood opportunities for an entire community.',
      },
      {
        language: 'en',
        text: 'Now my effort will be that I use methods better keep systematic records of my business and also reach my products further, from the local market.',
      },
    ],
    pdfUrl: '/case-studies/shabnam.pdf',
    pdfFileName: 'shabnam-case-study.pdf',
  },
  {
    id: 'suman',
    slug: 'suman',
    name: 'Suman',
    title: "From Homemaker to Entrepreneur: Suman's Journey of Growth and Confidence",
    teaser:
      'From Matnali village in Himachal Pradesh, Suman moved from homemaking to leading a multi-enterprise path in tailoring, dairy and farm-based food processing.',
    summary:
      'Suman, a resident of Matnali village in Himachal Pradesh, is associated with the Shiv Shakti Self Help Group and serves as President of her Village Organization (Gram Sangathan). Before joining the Self Help Group in 2021 she stayed at home, rarely went outside, and was not confident talking to others. Through SHG meetings and community interaction she became more confident and began participating in decisions for her family and community.',
    enterprise:
      'Multi-enterprise livelihood: home-based tailoring; dairy farming and desi ghee; farm-based pickles, jams and chutneys (Shiv Shakti SHG)',
    location: {
      village: 'Matnali village',
      district: 'Not explicitly stated',
      state: 'Himachal Pradesh',
      display: 'Matnali village, Himachal Pradesh',
    },
    themes: [
      'Homemaker to entrepreneur',
      'Community leadership',
      'Multi-enterprise livelihoods',
      'IIT Delhi Entrepreneurship Development Programme',
    ],
    featured: false,
    image: {
      src: sumanCover,
      alt: 'Suman engaged in dairy work as part of her multi-enterprise livelihood journey',
    },
    gallery: [
      {
        src: sumanCover,
        alt: 'Suman engaged in dairy work as part of her multi-enterprise livelihood journey',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Suman lives in Matnali village in Himachal Pradesh. She is associated with the Shiv Shakti Self Help Group (SHG) and serves as the President of her Village Organization (Gram Sangathan).',
          'Before she joined the Self Help Group in 2021, she stayed at home, took care of her family, rarely went outside, and did not know many women nearby. Joining the SHG became a turning point: through regular meetings and community interactions she gradually became more confident, improved communication skills, and started participating in decisions affecting her family and community.',
        ],
      },
      {
        label: 'The Entrepreneurial Journey',
        paragraphs: [
          'Suman started a business to support her family and create a better future for her children, especially as college expenses made dependence on one income difficult.',
          'She first started with tailoring, sewing women’s suits from home. She then moved into dairy farming, buying two cows with a bank loan after learning about it through the Self Help Group. She sells milk and makes about 6 kilograms of pure desi ghee each month, bought by people in Himachal Pradesh and also from Gujarat through personal connections.',
          'She later added pickles, jams and chutneys using fruits and vegetables from her own land—such as amla, galgal, lemon, ginger, chillies, peaches, plums, apricots and apples—buying mainly spices, salt, oil and packaging from the market.',
        ],
      },
      {
        label: 'Business Growth',
        paragraphs: [
          'Suman built each activity step by step: tailoring, then dairy, then food processing. She personally handles almost every stage of production—from harvesting and recipes to packaging and labelling—and labels products with the Self Help Group name, ingredients and freshness information.',
          'She wants to grow the food business further and believes that if more SHG women join her, they can produce more, sell more widely and create steady income for many women.',
        ],
      },
      {
        label: 'Learning Through the IIT Delhi Training',
        paragraphs: [
          'Through the Entrepreneurship Development Programme at IIT Delhi, Suman gained ideas about how small rural enterprises can become more organised and sustainable and how to sell products in the market.',
          'She learned that digital platforms can help show products to more people and find new markets; that financial records of income, expenses, production costs and profits are essential; and that branding, packaging and professional presentation matter even for high-quality products.',
        ],
      },
      {
        label: 'Applying the Learnings in the Business',
        paragraphs: [
          'Suman is focused on improving packaging and display, keeping money records in order, using online tools to talk with customers, expanding pickles, jams, chutneys and dairy products, and involving more women from her Self Help Group.',
        ],
      },
      {
        label: 'Looking Ahead',
        paragraphs: [
          'Suman believes learning never ends. She wants to keep improving products, strengthen market presence, gradually reach customers beyond her local area, and build a larger women-led enterprise where every SHG member can contribute, earn and grow together.',
        ],
      },
    ],
    quotes: [
      {
        language: 'en',
        text: 'Through the support of her Self Help Group, continuous learning, and determination, Suman transformed herself from a homemaker into a confident entrepreneur and community leader',
      },
    ],
    pdfUrl: '/case-studies/suman.pdf',
    pdfFileName: 'suman-case-study.pdf',
  },
];

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((study) => study.slug === slug) || null;
}

export function getFeaturedCaseStudy() {
  return caseStudies.find((study) => study.featured) || caseStudies[0];
}

export function getSupportingCaseStudies() {
  const featured = getFeaturedCaseStudy();
  return caseStudies.filter((study) => study.id !== featured.id);
}
