// HTML form element
const Elform = document.getElementById("form");
const ElFormInp = document.getElementById("js-inp");
const ElFormbtn = document.getElementById("js-formbtn");
const ElSelect = document.getElementById("js-select");

// HTML other Elements
const ElbigInner = document.getElementById("html");
const Elbody = document.getElementById("body");
const Elinner = document.getElementById("js-inner");
const Eltemp = document.getElementById("js-template").content;
const Elbtn = document.getElementById("js-darkmode-btn");
const ElmodeImg = document.getElementById("js-modeImg");
const ElmodeText = document.getElementById("js-mode_text");
const ElburgerMenu = document.getElementById("js-burgerMenu");
const Elmenu = document.getElementById("js-burger-menu");
const Elclose = document.getElementById("js-burger-close");
const EldescJS = document.getElementById("js-desc-wrapper");
const Eltorrentbtn = document.getElementById("js-torrent-download");
const Eltorrentbox = document.getElementById("js-animate-box");

let sum = true;
let data = [...games];
let mode_data = localStorage.getItem("data") === "true";

// SearchFn
function Search() {
    Elform.addEventListener("input", (evt) => {
        evt.preventDefault()
        let searchValue = ElFormInp.value.toLowerCase().trim();
    
        if (searchValue === "") {
            data = [...games]}     
        else {
            data = games.filter(item => {
                return item.title.toLowerCase().includes(searchValue)
        });
    }

    RenderList(data, Elinner);
})};
Search()

// sortBooksFn
ElSelect.addEventListener("change", () => {
    let selectedValue = ElSelect.value;
    sortBooks(selectedValue);
});

function sortBooks(order) {
    if (order === "a-z") {
        games.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "z-a") {
        games.sort((a, b) => b.title.localeCompare(a.title));
    } else if (order === "new-old") {
        games.sort((a, b) => b.year - a.year);
    } else if (order === "old-new") {
        games.sort((a, b) => a.year - b.year);
    } else if (order === "rating-low-high") {
        games.sort((a, b) => a.rating - b.rating);
    } else if (order === "rating-high-low") {
        games.sort((a, b) => b.rating - a.rating);
    };
    
    RenderList(games, Elinner); 
}


// RenderListFn
function RenderList(games, node) {
    node.innerHTML = ""
    const docFrg = document.createDocumentFragment();
    games.forEach(piece => {
        const clone = Eltemp.cloneNode(true);
        clone.querySelector("#js-img").src = piece.img;
        clone.querySelector("#js-tittle").textContent = piece.title;
        clone.querySelector("#js-item-year").textContent = piece.year;
        clone.querySelector("#js-item-pages").textContent = piece.size;
        clone.querySelector("#js-item-language").textContent = piece.rating;
        clone.querySelector("#js-info").href = piece.link;
        docFrg.appendChild(clone);
        });

    node.appendChild(docFrg);
}

RenderList(games, Elinner)


// Dark mode
if (mode_data) {
    ElbigInner.style.colorScheme = "dark"
    Elbody.classList.add("active");
    ElmodeImg.src = "./assets/icons/moon_dark.svg";
    ElmodeText.textContent = "Light mode";
    Elbtn.title = "Yorug' rejim yorqinlikni yoqtiradiganlar uchun"
} else {
    ElbigInner.style.colorScheme = "unset"
    Elbody.classList.remove("active");
    ElmodeImg.src = "./assets/icons/moon_light.svg";
    ElmodeText.textContent = "Dark mode";
    Elbtn.title = "Qorong'i rejim ko'zingiz uchun qulayroq bo'lishi mumkin"
}

Elbtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    mode_data = !mode_data; 

    if (mode_data) {
        ElbigInner.style.colorScheme = "dark"
        Elbody.classList.add("active");
        ElmodeImg.src = "./assets/icons/moon_dark.svg";
        ElmodeText.textContent = "Light mode";
        Elbtn.title = "Yorug' rejim yorqinlikni yoqtiradiganlar uchun"
    } else {
        ElbigInner.style.colorScheme = "unset"
        Elbody.classList.remove("active");
        ElmodeImg.src = "./assets/icons/moon_light.svg";
        ElmodeText.textContent = "Dark mode";
        Elbtn.title = "Qorong'i rejim ko'zingiz uchun qulayroq bo'lishi mumkin"
    }

    localStorage.setItem("data", mode_data); 
});

// burger menu
ElburgerMenu.addEventListener("click", (evt) => {
    evt.preventDefault();
    ElburgerMenu.closest(".header").classList.toggle("open");
  
    if (sum) {
        Elmenu.style.display = "none";
        Elclose.style.display = "block";
        sum = false;
    } else {
        Elmenu.style.display = "block";
        Elclose.style.display = "none";
        sum = true;
    }
  });

// Torrent download btn animation
Eltorrentbtn.addEventListener("click", (evt) => {
    Eltorrentbox.style.display = "block";
    EldescJS.style.paddingBottom = "40px"

    setTimeout(() => {
        Eltorrentbox.style.display = "none";
        if (window.innerWidth < 666) {
            EldescJS.style.padding = "20px";
        } else {
            EldescJS.style.paddingBottom = "0px";
          }
    }, 5000);
});