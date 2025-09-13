const listContainer = document.getElementById("list-container");
const news_Container = document.getElementById("newsContainer");
const bookmarkCard = document.getElementById("bookmark-card");
let addedBookmarks = [];

const loadData = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const cat = data.categories;
      cate(cat);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
};

const cate = (cat) => {
  cat.forEach((category) => {
    // console.log(category);
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
      // console.log(e.target.id);
      e.target.classList.add("border-b-4");
      dataId(e.target.id);
    }
  });
};

const dataId = (catId) => {
  console.log(catId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${catId}`)
    .then((res) => res.json())
    .then((data) => {
      showCategory(data.articles);
    });
};

const showCategory = (news) => {
  // console.log(news);
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
          <Button class="font-sm p-1.5 border border-red-200 rounded-[12px]">BookMark</Button>
      </div>
    </div>

    `;
  });

  news_Container.addEventListener("click", (e) => {
    if (e.target.innerHTML === "BookMark") {
      handleBookmark(e);
    }
  });
};

const handleBookmark = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const newId = e.target.parentNode.id;
  addedBookmarks.push({
    title: title,
    id: newId,
  });
  showMark(addedBookmarks);
};

const showMark = (e) => {
  console.log(addedBookmarks);
  bookmarkCard.innerHTML = "";
  e.forEach((data) => {
    bookmarkCard.innerHTML += `
    <div class="p-2 border border-gray-300 my-1"><h1>${data.title}</h1>
    <Button onclick="deleteBookMark('${data.id}')" class="border border-gray-300 p-1 text-sm text-red-700">Delete</Button>
    </div>

    `;
  });
};

const deleteBookMark = (bookmarkId) => {
  addedBookmarks = addedBookmarks.filter(
    (bookmark) => bookmark.id !== bookmarkId
  );
  addedBookmarks = addedBookmarks;
  showMark(addedBookmarks);
};

loadData();
dataId("main");
