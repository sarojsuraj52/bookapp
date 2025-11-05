const arr = [
  [
    "jfkfkkflf",
    {
      author: "Dhdhd",
      currentPage: 55,
      endDate: "",
      genre: "Fantasy",
      pages: 55,
      publicationDate: "2023-04-14",
      publisher: "Dushe",
      readingStatus: "Reading",
      source: "Purchased",
      startDate: "2023-04-13",
      title: "Checking",
    },
  ],
  [
    "jgjrmekeif",
    {
      author: ["Valmiki", "Ramayan"],
      currentPage: "",
      endDate: "",
      genre: ["Juvenile Fiction"],
      pages: 0,
      preview:
        "http://books.google.co.in/books?id=h46YPwAACAAJ&dq=wolf&hl=&cd=1&source=gbs_api",
      publicationDate: "2008-04-03",
      publisher: "OUP Oxford",
      readingStatus: "Unread",
      source: "Google Books",
      startDate: "",
      title: "Ramayan",
    },
  ],
];

const selectedBook = {
  accessInfo: {
    country: 'IN',
    viewability: 'NO_PAGES',
    embeddable: false,
    publicDomain: false,
    textToSpeechPermission: 'ALLOWED',
    // ... other properties of accessInfo
  },
  etag: '56CmijlVQsY',
  id: 'VIC8OgAACAAJ',
  kind: 'books#volume',
  saleInfo: {
    country: 'IN',
    saleability: 'NOT_FOR_SALE',
    isEbook: false,
    // ... other properties of saleInfo
  },
  selfLink: 'https://www.googleapis.com/books/v1/volumes/VIC8OgAACAAJ',
  volumeInfo: {
    allowAnonLogging: false,
    authors: ['Valmiki', 'Ramayan'],
    averageRating: 1,
    canonicalVolumeLink: 'https://books.google.com/books/about/Valmiki_Ramayan.html?hl=&id=VIC8OgAACAAJ',
    categories: ['Fiction'],
    contentVersion: 'preview-1.0.0',
    imageLinks: {
      smallThumbnail: 'http://books.google.com/books/content?id=VIC8OgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
      thumbnail: 'http://books.google.com/books/content?id=VIC8OgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      // ... other properties of imageLinks
    },
    industryIdentifiers: [
      // ... array of industryIdentifiers objects
    ],
    infoLink: 'http://books.google.co.in/books?id=VIC8OgAACAAJ&dq=Valmiki+Ramayan&hl=&source=gbs_api',
    language: 'hi',
    maturityRating: 'NOT_MATURE',
    pageCount: 162,
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
      // ... other properties of panelizationSummary
    },
    previewLink: 'http://books.google.co.in/books?id=VIC8OgAACAAJ&dq=Valmiki+Ramayan&hl=&cd=1&source=gbs_api',
    printType: 'BOOK',
    publishedDate: '2021',
    publisher: 'Rajpal and Sons',
    ratingsCount: 2,
    readingModes: {
      text: false,
      image: false,
      // ... other properties of readingModes
    },
    title: 'Ramayan',
    // ... other properties of volumeInfo
  }
};


function searchBooks(query, data) {
  return data.filter((item, index) => {
    const book = item[1];
    return (
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
  });
}
console.log(searchBooks("book1", arr));
