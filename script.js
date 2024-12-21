document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("header button");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const loadMoreButton = document.getElementById("load-more");
  const modalError = document.getElementById("modalError");
  const modalClose = document.getElementById("modalClose");
  const galleryBlur = document.querySelector(".gallery");

  const showModal = () => {
    modalError.style.display = "block";
    galleryBlur.classList.add("blur");
  };

  modalClose.addEventListener("click", () => {
    modalError.style.display = "none";
    galleryBlur.classList.remove("blur");
  });

  const initialDisplayCount = 10;
  let currentlyDisplayedCount = initialDisplayCount;
  let currentFilter = "all";

  const lightbox = document.getElementById("lightbox");
  let currentIndex = 0;
  const lightboxImg = document.createElement("img");
  lightbox.appendChild(lightboxImg);

  // Initially show only the first 10 images in the All tab
  galleryItems.forEach((item, index) => {
    if (index >= initialDisplayCount) {
      item.style.display = "none";
    }

    item.querySelector(".expand").addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = item.querySelector("img").src;
      currentIndex = index;
    });
  });

  const showImage = (index) => {
    if (index < 0) {
      index = galleryItems.length - 1;
    }
    if (index >= galleryItems.length) {
      index = 0;
    }
    lightboxImg.src = galleryItems[index].querySelector("img").src;
    currentIndex = index;
  };

  document.getElementById("lightbox-next").addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  document.getElementById("lightbox-prev").addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const activeButton = document.querySelector("header button.active");
      if (activeButton) {
        activeButton.classList.remove("active");
      }
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      currentFilter = filter;
      currentlyDisplayedCount = initialDisplayCount;

      galleryItems.forEach((item, index) => {
        if (filter === "all") {
          item.style.display =
            index < currentlyDisplayedCount ? "block" : "none";
        } else if (item.getAttribute("data-category") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  loadMoreButton.addEventListener("click", () => {
    if (currentFilter !== "all") {
      showModal();
      return;
    }

    let itemsDisplayed = 0;
    galleryItems.forEach((item, index) => {
      if (item.style.display === "none" && currentFilter === "all") {
        item.style.display = "block";
        itemsDisplayed++;
      }
      if (itemsDisplayed >= 5) {
        currentlyDisplayedCount += 5;
        return false;
      }
    });

    // If there are no more items to display
    if (itemsDisplayed === 0) {
      showModal();
    }
  });
});
