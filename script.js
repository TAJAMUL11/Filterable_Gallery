document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("header button");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const loadMoreButton = document.getElementById("load-more");
  const HideButton = document.getElementById("hide-more");

  // Initially show only the first 10 images
  const initialDisplayCount = 10;
  let currentlyDisplayedCount = initialDisplayCount;
  galleryItems.forEach((item, index) => {
    if (index >= initialDisplayCount) {
      item.style.display = "none";
    }
  });

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const activeButton = document.querySelector(".active");
      activeButton.classList.remove("active");
      e.target.classList.add("active");

      const filter = button.getAttribute("data-filter");
      currentlyDisplayedCount = initialDisplayCount;
      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          if (currentlyDisplayedCount > 0) {
            item.style.display = "block";
            currentlyDisplayedCount--;
          } else {
            item.style.display = "none";
          }
        } else {
          item.style.display = "none";
        }
      });
    });
  });
  // Load more functionality
  loadMoreButton.addEventListener("click", () => {
    let itemsDisplayed = 0;
    galleryItems.forEach((item, index) => {
      if (item.style.display === "none") {
        item.style.display = "block";
        itemsDisplayed++;
      }
      if (itemsDisplayed >= 5) {
        // Load 5 more items at a time
        return false;
      }
    });
  });
});
