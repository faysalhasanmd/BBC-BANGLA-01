const listContainer = document.getElementById("list-container");
const news_Container = document.getElementById("newsContainer");
const bookmarkCard = document.getElementById("bookmark-card");
const bookmarkCount = document.getElementById("bookMarkCount");
const loadingContent = document.getElementById("loadContent");
const newsDatailsModal = document.getElementById("news-datails-modal");
const modalContainer = document.getElementById("modal-container");
let addedBookmarks = [];

const loadData = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const cat = data.categories;
      cate(cat);
    })
    .catch((error) => {
      console.log(error);
    });
};

const cate = (cat) => {
  cat.forEach((category) => {
    listContainer.innerHTML += `
         <li id="${category.id}"
            class="hover:border-b-4 cursor-pointer hover:transition duration-400 border-red-700"
          >
            ${category.title}
          </li>
          `;
  });

  listContainer.addEventListener("click", (e) => {
    const totalLi = document.querySelectorAll("li");
    totalLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });

    if (e.target.localName === "li") {
      loadingContainer();
      e.target.classList.add("border-b-4");
      dataId(e.target.id);
    }
  });
};

const dataId = (catId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${catId}`)
    .then((res) => res.json())
    .then((data) => {
      showCategory(data.articles);
    })
    .catch((error) => {
      console.error(error);
      ErrorHandle();
      alert("something went wrong");
    });
};

const showCategory = (news) => {
  if (news.length === 0) {
    alert("No page Here..!");
    noNeedPage();

    return;
  }
  news_Container.innerHTML = "";
  news.forEach((newsId) => {
    news_Container.innerHTML += `
    <div id="collectId" class="border border-gray-200 rounded-[9px]">
       <div>
       <img src="${newsId.image.srcset[5].url}"/>
       </div>
       <div id="${newsId.id}">
          <h1 class="font-semibold text-[18px] mt-1 p-1">${newsId.title}</h1>
          <h1 class="font-sm p-1">${newsId.time}</h1>
          <Button class="text-[12px] p-1 border border-red-200 rounded-[12px]">BookMark</Button>
          <Button class="text-[12px] p-1 border border-red-200 rounded-[12px]">View Details</Button>
      </div>
    </div>
    `;
  });

  news_Container.addEventListener("click", (e) => {
    if (e.target.innerHTML === "BookMark") {
      handleBookmark(e);
    }
  });

  news_Container.addEventListener("click", (e) => {
    if (e.target.innerText.trim() === "BookMark") {
      handleBookmark(e);
    }
    if (e.target.innerText.trim() === "View Details") {
      handleViewDetails(e);
    }
  });
};

const handleBookmark = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const newId = e.target.parentNode.id;

  if (addedBookmarks.some((b) => String(b.id) === String(newId))) return;

  addedBookmarks.push({
    title: title,
    id: newId,
  });
  showMark(addedBookmarks);
};

const handleViewDetails = (e) => {
  const newId = e.target.parentNode.id;
  console.log(newId);
  // newsDatailsModal.showModal();
  fetch(`https://news-api-fs.vercel.app/api/news/${newId}`)
    .then((res) => res.json())
    .then((data) => {
      showDetails(data.article);
      console.log(data);
    });
};

const showDetails = (article) => {
  newsDatailsModal.showModal();
  modalContainer.innerHTML = `
  <h1>${article.title}</h1>
  <img src="${article.images[0].url}"  />
    <h1>${article.content}</h1>

  `;
  // console.log(article);
};

const showMark = (e) => {
  bookmarkCard.innerHTML = "";
  e.forEach((data) => {
    bookmarkCard.innerHTML += `
    <div class="p-2 border border-gray-300 my-1">
      <h1>${data.title}</h1>
      <button onclick="deleteBookMark('${data.id}')" 
        class="border border-gray-300 p-1 text-sm text-red-700">
        Delete
      </button>
    </div>
    `;
  });
  bookmarkCount.innerHTML = addedBookmarks.length;
};

const deleteBookMark = (bookmarkId) => {
  addedBookmarks = addedBookmarks.filter(
    (bookmark) => String(bookmark.id) !== String(bookmarkId)
  );
  showMark(addedBookmarks);
};

const loadingContainer = () => {
  loadingContent.innerHTML = `<div class="text-black flex items-center">Loading...</div>
`;
};

const ErrorHandle = () => {
  news_Container.innerHTML = `
  <div class="text-black">Something went wrong...</div>
  `;
};

const noNeedPage = () => {
  news_Container.innerHTML = `
  <div class="text-black">Something went wrong...</div>
  `;
};

loadData();
dataId("main");
