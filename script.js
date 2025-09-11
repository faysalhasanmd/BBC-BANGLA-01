const listContainer = document.getElementById("list-container");

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
      e.target.classList.add("border-b-4");
    }
  });
};

loadData();
