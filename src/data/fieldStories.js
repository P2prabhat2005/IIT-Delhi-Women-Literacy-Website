/**
 * Additional Stories from the Field — sourced ONLY from the official PDFs
 * provided for Beena, Poonam, Bimla, Deepika, Shilpa, Happy, and Suman (Hamirpur).
 * Do not add facts, locations, quotes, or details that are not supported by those documents.
 */

import beenaCover from '../assets/images/case-studies/beena-cover.jpg';
import bimlaCover from '../assets/images/case-studies/bimla-cover.jpg';
import deepikaCover from '../assets/images/case-studies/deepika-cover.jpg';
import happyCover from '../assets/images/case-studies/happy-cover.jpg';
import poonamCover from '../assets/images/case-studies/poonam-cover.jpg';
import shilpaCover from '../assets/images/case-studies/shilpa-cover.jpg';
import sumanHamirpurCover from '../assets/images/case-studies/suman-hamirpur-cover.jpg';

/** @type {import('./caseStudies.js').CaseStudy[]} */
export const additionalCaseStudies = [
  {
    id: 'beena',
    slug: 'beena',
    name: 'Beena',
    title: 'From Household Enterprise to Business Confidence: A Journey of Learning and Growth',
    teaser:
      'From Shimla, Beena built a ghee enterprise with SHG savings and used financial and digital literacy training to price, record, and grow her business.',
    summary:
      'Beena from Shimla, Himachal Pradesh started producing and selling ghee around 2020 with financial assistance from SHG savings, to support her family and maintain a stable livelihood. Financial and digital literacy training helped her calculate the true cost of production, keep clearer records, understand GST registration, and diversify into pickles. After the training she shared what she learned with other women in her village.',
    enterprise: 'Ghee production and pickles, started with SHG savings around 2020',
    location: {
      district: 'Shimla',
      state: 'Himachal Pradesh',
      display: 'Shimla, Himachal Pradesh',
    },
    themes: [
      'Household enterprise',
      'Costing and pricing',
      'Financial records',
      'GST registration',
    ],
    featured: false,
    homepageSupporting: false,
    image: {
      src: beenaCover,
      alt: 'Beena seated indoors holding a jar of desi ghee from her household enterprise',
    },
    gallery: [
      {
        src: beenaCover,
        alt: 'Beena seated indoors holding a jar of desi ghee from her household enterprise',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Beena lives in Shimla, Himachal Pradesh. She started her business to support her family and meet the financial needs of a stable livelihood.',
          'Around 2020 she began producing and selling ghee with financial assistance from savings offered through her Self Help Group. In the mountain regions around her, ghee is an important and commonly sold product.',
        ],
      },
      {
        label: 'Learning Through Financial and Digital Literacy Training',
        paragraphs: [
          'The financial and digital literacy training was useful for her in several parts of the business. One was calculating the actual cost of production. Earlier she was not adding the cost of her own hard work and time; after the training she realised that production cost must include all relevant costs to arrive at an accurate price.',
          'She also learned about cost effectiveness—what quantity must be offered at what price so that both customer and seller benefit. This understanding helped her calculate business costs and profits more accurately.',
          'Earlier she had an understanding of cashbook and balance sheet but was not maintaining systematic financial records. After the training she realised the importance of clear, detailed records so that business activity can be tracked and improved where needed.',
        ],
      },
      {
        label: 'Formalisation, Online Reach and Diversification',
        paragraphs: [
          'She also understood the value of taking the business online beyond the local area and reaching a wider customer base. She applied for GST registration and learned about the registration compliances associated with it, including the dos and don’ts of formal registration processes.',
          'She diversified into pickles as another source of income. During the training she also learned about packaging, labelling and marketing. Having begun to implement what she learned, she aspires to learn more through advanced training on business practices.',
        ],
      },
      {
        label: 'Sharing Knowledge',
        paragraphs: [
          'After returning to the village from the training, Beena shared the knowledge with other women so that they could also benefit. Her journey represents that women can become strong entrepreneurs when they are provided with opportunities to learn and grow.',
        ],
      },
    ],
    quotes: [],
    pdfUrl: '/case-studies/beena.pdf',
    pdfFileName: 'beena-case-study.pdf',
  },
  {
    id: 'poonam',
    slug: 'poonam',
    name: 'Poonam Chauhan',
    title: 'From a Traditional Delicacy to a Growing Brand: A Journey of Innovation and Collective Entrepreneurship',
    teaser:
      'From Narkanda, Poonam Chauhan turned a wedding-table idea—moddi—into Kotgarh Kitchen, a women-led brand of locally processed food.',
    summary:
      'Poonam Chauhan from Narkanda, Himachal Pradesh began her entrepreneurial journey in December 2022 with the idea of producing moddi, a cultural cuisine she saw served at a wedding. That idea led to Kotgarh Kitchen, a brand dedicated to locally processed food products. After returning from Delhi to her village, she joined a Self Help Group in May 2022 and formed a group of around 18–20 women. Financial and digital literacy training helped the group use Instagram for promotion, while NRLM support opened festival and exhibition markets.',
    enterprise: 'Kotgarh Kitchen: locally processed food products including moddi (collective of around 18–20 women)',
    location: {
      village: 'Narkanda',
      state: 'Himachal Pradesh',
      display: 'Narkanda, Himachal Pradesh',
    },
    themes: [
      'Collective entrepreneurship',
      'Local food products',
      'Digital marketing',
      'NRLM market access',
    ],
    featured: false,
    homepageSupporting: true,
    image: {
      src: poonamCover,
      alt: 'Portrait of Poonam Chauhan, founder of Kotgarh Kitchen in Narkanda',
    },
    gallery: [
      {
        src: poonamCover,
        alt: 'Portrait of Poonam Chauhan, founder of Kotgarh Kitchen in Narkanda',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Poonam Chauhan lives in Narkanda, Himachal Pradesh. She graduated with a B.Sc. and later a B.Ed., and had been living in Delhi. After returning to her village she encountered limited employment opportunities and began looking for other livelihood options.',
          'She learned about Self Help Groups and joined one in May 2022. She started her entrepreneurial journey in December 2022 with a small idea of producing a cultural cuisine named moddi, after seeing it served to guests at a wedding. She asked why moddi should remain limited to the local region, and that thought laid the foundation for Kotgarh Kitchen, a brand dedicated to producing and selling locally processed food products.',
        ],
      },
      {
        label: 'Collective Entrepreneurship',
        paragraphs: [
          'Poonam believed in collective entrepreneurship and formed a group of around 18–20 women who shared a vision of building a powerful and sustainable business. Most activities are carried out collectively with the help of smaller teams within the SHG. She continues to be known as the founder of the Kotgarh Kitchen brand and encourages other women to participate in it.',
        ],
      },
      {
        label: 'Challenges and Market Access',
        paragraphs: [
          'One of the biggest hurdles was the lack of financial resources. She invested her own savings into the business and later took her investment back when the business started making enough profits.',
          'Marketing the product outside the local region was also difficult. The National Rural Livelihood Mission (NRLM) helped by giving the group opportunities to participate in summer festivals and exhibitions, which helped them promote products to a wider audience. Marketing continues to be a challenge, which she is handling by promoting products through online marketplaces such as Amazon, where she is soon going to have her first product listing.',
          'Another challenge is keeping costs within an acceptable range, because inputs for raw materials have to be procured from outside the village, which makes the product costlier.',
        ],
      },
      {
        label: 'Learning Through Financial and Digital Literacy Training',
        paragraphs: [
          'The training of financial and digital literacy helped the group strengthen its marketing capabilities by making them aware of Instagram as a product-promoting tool. After the training the group made promotional posts for one of their products; customer enquiries started coming as soon as they posted.',
          'They acknowledged that this training helped them acquire the skill; otherwise they might not have used it so soon. As soon as she and her team learned the skill, they also taught other women—reflecting her vision of collective entrepreneurship and community development.',
        ],
      },
      {
        label: 'Looking Ahead',
        paragraphs: [
          'Poonam is optimistic about Kotgarh Kitchen. Her journey is presented as an example of how innovation and collective action can transform a traditional household product into a business opportunity, combining local knowledge with modern business practices to preserve cultural heritage and generate livelihood.',
        ],
      },
    ],
    quotes: [],
    pdfUrl: '/case-studies/poonam.pdf',
    pdfFileName: 'poonam-case-study.pdf',
  },
  {
    id: 'bimla',
    slug: 'bimla',
    name: 'Bimla',
    title: 'From Household Enterprise to Business Confidence: A Journey of Learning and Growth',
    teaser:
      'From Shimla, Bimla started a ghee enterprise around 2020 with SHG savings and used literacy training to strengthen costing, records, and formalisation.',
    summary:
      'Bimla from Shimla, Himachal Pradesh started producing and selling ghee around 2020 with financial assistance from SHG savings. Financial and digital literacy training helped her include her own labour in production costs, keep systematic records, understand GST registration, and diversify into pickles. After returning from the training she shared the knowledge with other women in her village.',
    enterprise: 'Ghee production and pickles, started with SHG savings around 2020',
    location: {
      district: 'Shimla',
      state: 'Himachal Pradesh',
      display: 'Shimla, Himachal Pradesh',
    },
    themes: [
      'Household enterprise',
      'Costing and pricing',
      'Financial records',
      'GST registration',
    ],
    featured: false,
    homepageSupporting: false,
    image: {
      src: bimlaCover,
      alt: 'Bimla seated indoors holding a jar of desi ghee from her household enterprise',
    },
    gallery: [
      {
        src: bimlaCover,
        alt: 'Bimla seated indoors holding a jar of desi ghee from her household enterprise',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Bimla lives in Shimla, Himachal Pradesh. She started her business to support her family and meet the financial needs of a stable livelihood.',
          'Around 2020 she began producing and selling ghee with financial assistance from savings offered through her Self Help Group. In the mountain regions around her, ghee is an important and commonly sold product.',
        ],
      },
      {
        label: 'Learning Through Financial and Digital Literacy Training',
        paragraphs: [
          'The financial and digital literacy training was useful for her in several parts of the business. One was calculating the actual cost of production. Earlier she was not adding the cost of her own hard work and time; after the training she realised that production cost must include all relevant costs to arrive at an accurate price.',
          'She also learned about cost effectiveness—what quantity must be offered at what price so that both customer and seller benefit. This understanding helped her calculate business costs and profits more accurately.',
          'Earlier she had an understanding of cashbook and balance sheet but was not maintaining systematic financial records. After the training she realised the importance of clear, detailed records so that business activity can be tracked and improved where needed.',
        ],
      },
      {
        label: 'Formalisation, Online Reach and Diversification',
        paragraphs: [
          'She also understood the value of taking the business online beyond the local area and reaching a wider customer base. She applied for GST registration and learned about the registration compliances associated with it, including the dos and don’ts of formal registration processes.',
          'She diversified into pickles as another source of income. During the training she also learned about packaging, labelling and marketing. Having begun to implement what she learned, she aspires to learn more through advanced training on business practices.',
        ],
      },
      {
        label: 'Sharing Knowledge',
        paragraphs: [
          'After returning to the village from the training, Bimla shared the knowledge with other women so that they could also benefit. Her journey represents that women can become strong entrepreneurs when they are provided with opportunities to learn and grow.',
        ],
      },
    ],
    quotes: [],
    pdfUrl: '/case-studies/bimla.pdf',
    pdfFileName: 'bimla-case-study.pdf',
  },
  {
    id: 'deepika',
    slug: 'deepika',
    name: 'Deepika',
    title: 'From Adversity to Achievement: An Entrepreneurial Journey of Resilience',
    teaser:
      'From Dharamshala, Deepika of Raashi SHG runs a pickle enterprise and the Himira canteen—building livelihood after years of family hardship.',
    summary:
      'Deepika, aged 50, is a resident of Dharamshala, Himachal Pradesh and an active member of Raashi SHG. She manages a pickle business and a canteen allotted to her in 2022. After years of family hardship she joined the SHG in 2018, learned to make pickles, sheera and badia, and later received Rs 50,000 under an SHG scheme. Entrepreneurship training strengthened her use of digital payments, packaging, branding and written records.',
    enterprise: 'Pickle enterprise and Himira canteen at Rajiv Gandhi College (Raashi SHG)',
    location: {
      district: 'Dharamshala',
      state: 'Himachal Pradesh',
      display: 'Dharamshala, Himachal Pradesh',
    },
    themes: [
      'Resilience',
      'Pickle enterprise',
      'Digital payments',
      'Record keeping',
    ],
    featured: false,
    homepageSupporting: false,
    image: {
      src: deepikaCover,
      alt: 'Deepika standing outdoors in Dharamshala during Project Bharti documentation',
    },
    gallery: [
      {
        src: deepikaCover,
        alt: 'Deepika standing outdoors in Dharamshala during Project Bharti documentation',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Deepika, aged 50, is a resident of Dharamshala, Himachal Pradesh and an active member of Raashi SHG. Even after facing many personal and financial challenges, she manages her own pickle business while also operating a canteen, which helps her earn a stable livelihood for herself and her family.',
          'From a young age she learned hard work and family responsibility. After the unexpected demise of her father, who ran a small grocery store, she had to leave studies after 8th standard so that she could run the family store for her three younger siblings while her elder brothers had gone to Mumbai for work.',
          'After marriage, challenges continued as her husband struggled with alcohol addiction and the family had limited financial resources. She started rearing cows to sell milk and other dairy products. Another breakdown came when her two-room house collapsed and the family was forced to create a shelter using mud bricks. Later her husband was detected with a serious heart condition and could not work, so she became the sole breadwinner. In 2015 her husband died due to brain hemorrhage when their three children were studying in Class 7, 9 and 10. She was determined to make her children graduate, which she successfully achieved.',
        ],
      },
      {
        label: 'The Entrepreneurial Journey',
        paragraphs: [
          'The turning point came when she joined the SHG in 2018 and learned to make pickles, sheera and badia, which became the foundation of her entrepreneurship. She manages the business on her own, and SHG members support her with production activities in return for wages.',
          'In the early stages she faced a lack of finance, which she overcame with assistance of Rs 50,000 under the SHG scheme offered by the block, enabling her to purchase necessary raw material.',
          'In 2022 the opening of Himira canteen at Rajiv Gandhi College was allotted to her by the block administration. She now manages both the canteen and her pickle business. She gives credit for her success to the block development officer and Chameli Madam, who continuously guided her. Challenges still arise, including a recent shortage of LPG cylinders that made her consider discontinuing the business, but she managed it.',
        ],
      },
      {
        label: 'Learning Through Entrepreneurship Training',
        paragraphs: [
          'The training of entrepreneurship improved her business and personal capabilities. She learned to use digital payment applications such as Google Pay and PhonePe. Earlier she feared using smartphones for financial transactions; now she feels confident, handling them well and requiring assistance from her children only occasionally.',
          'Earlier she was selling products without a label and was unaware of necessary testing procedures. After the training she understood packaging and branding. She also began keeping written records of savings, expenses and profit. She was encouraged to use Instagram Business for expansion and is still learning social media as a marketing tool, while understanding its significance for upgrading the business. She also gained self-confidence, especially in using mobile technology.',
        ],
      },
      {
        label: 'Looking Ahead',
        paragraphs: [
          'Her future vision is to expand her business and to learn more about management of business risks and financial losses. Through her journey she learned that going out of the comfort zone and learning continuously can give a transformative shift to one’s life.',
        ],
      },
    ],
    quotes: [
      {
        language: 'hi',
        text: 'dusri mahilaon ko mai ye sandesh dena chahti hu hm soche ki hm garibi mai pade rahe to aisa nahi hai, bahar nikal k bahut kuch seekh jata hai insan, ghar mai hi rehti agar mai ye soch k ki mera kuch ni hona mera gharwala chala gaya hai to jhadu pocha hi kar rahi hoti ghar mai abhi mai aise jee leti hu ki mera apna kaam hai, mai khud kar rhi hu, to mai ye hi bolti hu ladies ko niklo bahar, mai ye bhi hahti hu ki ladies mere pas aae mera kaam seekhe aur aage apna kam kre to ghar mai vaise hi kama skte hai wo.',
      },
    ],
    pdfUrl: '/case-studies/deepika.pdf',
    pdfFileName: 'deepika-case-study.pdf',
  },
  {
    id: 'shilpa',
    slug: 'shilpa',
    name: 'Shilpa',
    title: 'From Local Enterprise to Wider Recognition: A Journey of Confidence and Growth',
    teaser:
      'From Shimla, Shilpa and her husband built a tents and electronics enterprise, expanding beyond the village after joining NRLM in 2014.',
    summary:
      'Shilpa from Shimla, Himachal Pradesh moved to a village after marriage in 2008 and, seeing limited livelihood options, started entrepreneurship with her husband in 2010 in tents and an electronics shop. After joining NRLM in 2014 they expanded outside the village. Financial and digital literacy training helped her understand GST compliances, systematic record keeping, marketing, packaging and labelling.',
    enterprise: 'Tents business and electronics shop, expanded with NRLM support from 2014',
    location: {
      district: 'Shimla',
      state: 'Himachal Pradesh',
      display: 'Shimla, Himachal Pradesh',
    },
    themes: [
      'Family enterprise',
      'NRLM',
      'GST and records',
      'Community recognition',
    ],
    featured: false,
    homepageSupporting: false,
    image: {
      src: shilpaCover,
      alt: 'Portrait of Shilpa, entrepreneur from Shimla associated with a tents and electronics enterprise',
    },
    gallery: [
      {
        src: shilpaCover,
        alt: 'Portrait of Shilpa, entrepreneur from Shimla associated with a tents and electronics enterprise',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Shilpa from Shimla, Himachal Pradesh got married in 2008 and moved to a village. After marriage she realised that the village did not have stable livelihood options: income could come either from owning a business or through daily wage earning, because that location did not have cash-crop opportunities.',
          'Seeing the financial status and needs of the family, she and her husband decided to start entrepreneurship in 2010. The decision was a practical need for Shilpa and her family. They are involved in the business of tents and also own an electronics shop.',
        ],
      },
      {
        label: 'Growth Through NRLM',
        paragraphs: [
          'They first operated at a small scale across the local village area only. After joining the National Rural Livelihood Mission (NRLM) in 2014, they were able to expand outside the village as well. She started to get opportunities available for entrepreneurs, understood how to utilise government schemes for business expansion, and gained confidence through business communications. NRLM acted as an enabler of business growth.',
          'Husband and wife work collectively: he mainly focuses on marketing and promotions; she primarily focuses on store maintenance with a team of people; field visits and business communication are handled by both together.',
        ],
      },
      {
        label: 'Confidence and Community Recognition',
        paragraphs: [
          'There was resistance in her village for women to go out of the house without asking permission, so taking risks and starting a business as a woman was difficult. Shilpa felt hesitant to go out and interact with people, but her family supported and encouraged her. Gradually she built confidence and independence, and the success of the business made people in her village and outside it change their perceptions and give her respect.',
          'Another significant challenge was the lack of finance, for which they used their own savings and bank credit.',
        ],
      },
      {
        label: 'Learning Through Financial and Digital Literacy Training',
        paragraphs: [
          'The financial and digital literacy training helped her understand registration-related compliances especially for GST, systematic record keeping including cashbook and balance sheet, marketing, packaging and labelling. It assisted her in understanding how to sell products and promote them professionally.',
          'She was already using an Instagram page and word of mouth for promotion, but after the training she understood how to complement this promotional effort with other significant aspects of the business. She now aspires to participate in more advanced training to strengthen and grow her business.',
        ],
      },
    ],
    quotes: [],
    pdfUrl: '/case-studies/shilpa.pdf',
    pdfFileName: 'shilpa-case-study.pdf',
  },
  {
    id: 'happy',
    slug: 'happy',
    name: 'Happy',
    title: 'From Passion to Prosperity: Strengthening an Entrepreneurial Journey through Financial and Digital Literacy',
    teaser:
      'From Shimla, Happy turned knitting and stitching from a 2009 livelihood into a stronger enterprise through NRLM support and literacy training.',
    summary:
      'Happy from Shimla, Himachal Pradesh started her entrepreneurial journey in 2009 in knitting and stitching. She is also an active member of an NGO working on plastic-waste reduction. Limited finance and a manually operated knitting machine constrained expansion until NRLM support helped her purchase a motorized knitting machine. Financial and digital literacy training improved her costing, digital payments, and awareness of online marketplaces such as ONDC, Meesho and Amazon.',
    enterprise: 'Knitting and stitching enterprise, strengthened with a motorized knitting machine through NRLM',
    location: {
      district: 'Shimla',
      state: 'Himachal Pradesh',
      display: 'Shimla, Himachal Pradesh',
    },
    themes: [
      'Knitting and stitching',
      'NRLM',
      'Product costing',
      'Digital payments',
    ],
    featured: false,
    homepageSupporting: false,
    image: {
      src: happyCover,
      alt: 'Happy working at a motorized knitting machine as part of her stitching enterprise',
    },
    gallery: [
      {
        src: happyCover,
        alt: 'Happy working at a motorized knitting machine as part of her stitching enterprise',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Happy from Shimla, Himachal Pradesh started her entrepreneurial journey in 2009 in knitting and stitching, converting a hobby into a business. Apart from her own business, she is an active member of an NGO working on reduction of plastic waste, creating awareness in the community about the dos and don’ts of plastic-waste management.',
          'In the early stages she had a manually operated knitting machine which confined her production capacity. She struggled to expand because of limited financial resources and lack of understanding about business expansion strategies. Her aspiration to become financially independent encouraged her to continue. She purchased a motorized knitting machine with financial assistance received through the National Rural Livelihood Mission (NRLM), which increased production capacity and operations.',
        ],
      },
      {
        label: 'Family and Community Support',
        paragraphs: [
          'A significant role in her entrepreneurial journey was played by her family. Her in-laws, her husband who works as a driver, and block administrative staff motivated her to continue. This constant support made her feel confident about being an entrepreneur and financially independent.',
        ],
      },
      {
        label: 'Learning Through Financial and Digital Literacy Training',
        paragraphs: [
          'The training gave her a new perspective on calculating product costs. Earlier she calculated only the basic expenses of making the product and ignored other important costs. After the training she realised that product cost must also include the value of her own time along with direct and indirect costs, which improved her pricing decisions.',
          'She was hesitant to use digital payment applications such as Google Pay, but after the training she understood online financial transactions, overcame her fear, and now confidently performs digital transactions for her business. She also became aware of becoming an online seller on platforms such as ONDC, Meesho and Amazon, and understood the importance of using such marketplaces to reach a broader customer base.',
        ],
      },
      {
        label: 'Looking Ahead',
        paragraphs: [
          'Beyond technical knowledge, she now feels more confident about boosting her business and is equipped with financial mechanisms and digital tools. She continues to lead her business and motivate other women to become financially independent.',
        ],
      },
    ],
    quotes: [],
    pdfUrl: '/case-studies/happy.pdf',
    pdfFileName: 'happy-case-study.pdf',
  },
  {
    id: 'suman-hamirpur',
    slug: 'suman-hamirpur',
    name: 'Suman',
    title: 'A Helping Hand to the Family: Building Confidence through Entrepreneurship and Financial Literacy',
    teaser:
      'From Hamirpur, Suman built knitting, stitching, dairy and badiya enterprises so she could contribute to family income and support other women.',
    summary:
      'Suman from Hamirpur, Himachal Pradesh studied till class 10 and had an interest in knitting and stitching. After marriage she began seeing this skill as a business opportunity. She joined a Self Help Group formally in 2021 and started entrepreneurship in November of the same year, later diversifying into dairy farming and badiya. Financial and digital literacy training strengthened her record keeping, UPI payments, and interest in ONDC.',
    enterprise: 'Knitting and stitching, dairy farming (milk), and badiya; SHG member since 2021',
    location: {
      district: 'Hamirpur',
      state: 'Himachal Pradesh',
      display: 'Hamirpur, Himachal Pradesh',
    },
    themes: [
      'Family contribution',
      'Knitting and stitching',
      'Digital marketing',
      'Financial records',
    ],
    featured: false,
    homepageSupporting: false,
    image: {
      src: sumanHamirpurCover,
      alt: 'Portrait of Suman from Hamirpur, associated with knitting, stitching and dairy enterprise',
    },
    gallery: [
      {
        src: sumanHamirpurCover,
        alt: 'Portrait of Suman from Hamirpur, associated with knitting, stitching and dairy enterprise',
      },
    ],
    sections: [
      {
        label: 'Background',
        paragraphs: [
          'Suman from Hamirpur, Himachal Pradesh aspired to become an earning member of the family—contributing financially as well as fulfilling household responsibilities. For her, entrepreneurship was not just about income; it was about becoming financially independent and creating opportunities for other women.',
          'Having studied till class 10, she always had an interest in knitting and stitching, but before marriage her work was limited to the local neighbourhood. After marriage she began seeing this skill as a business opportunity and focused on expanding it to a larger customer base.',
          'She joined the Self Help Group formally in 2021 and started her entrepreneurial journey in November of the same year. Along with knitting and stitching, she diversified by doing dairy farming to sell milk and also learned to prepare badiya for sale. Although her husband works as a driver and earns enough to run the family, she aspired to become a helping hand, share family responsibilities, and become financially independent.',
        ],
      },
      {
        label: 'Building Trust and Markets',
        paragraphs: [
          'When she started, one challenge was lack of trust regarding the purity and quality of her products. People hesitated to purchase from her. With continuous effort she built credibility, overcame this challenge, and started making good sales. Satisfied customers recommended the products to others, and the business gained acceptance and recognition.',
          'Earlier she delivered products only to the local nearby area. After joining the SHG she learned about online marketing and digital platforms such as WhatsApp and Instagram Business to promote products and reach a larger customer base. This took her business beyond the locality.',
        ],
      },
      {
        label: 'Learning Through Financial and Digital Literacy Training',
        paragraphs: [
          'The training of financial and digital literacy strengthened her systematic record keeping. It made her realise the importance of well-documented records to make sound financial decisions. Sessions on cashbook and balance sheet were valuable; she now regularly maintains financial records, which is also useful because block offices require well-documented records for official purposes.',
          'Another significant area was the UPI-based digital payment system, which made transactions faster and safer for herself and her customers. She was also happy and excited to know about ONDC as a digital marketplace and wishes to learn more about it to do business on the platform.',
        ],
      },
      {
        label: 'Looking Ahead',
        paragraphs: [
          'Today Suman encourages other women who want to pursue entrepreneurship but are not confident enough to initiate. Whenever she meets such women, she encourages them to step forward, learn new skills, join SHGs and explore entrepreneurship.',
        ],
      },
    ],
    quotes: [],
    pdfUrl: '/case-studies/suman-hamirpur.pdf',
    pdfFileName: 'suman-hamirpur-case-study.pdf',
  },
];
