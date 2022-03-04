//hiding and showing listing  form
const addListingModal = document.getElementById("addListingContainer");
const listingFormBtn = document.getElementById("listing-form-btn");
const exitModalBtns = document.querySelectorAll(".exit-modal");

const updateListingBtn = document.querySelector(".edit-btn");
const updateListingModal = document.querySelectorAll(".updateListingContainer");
if (listingFormBtn) {
  listingFormBtn.addEventListener("click", (e) => {
    addListingModal.classList.toggle("hidden");
    $(".updateListingContainer").addClass("hidden");
  });
}
//mobile menu toggle
$(".toggle-button-menu").click(() => {
  $(".mobile-navigation").toggleClass("show-mobile-menu");
  console.log("clikced");
});
//todo  we need to set id for every form so that i can check if the id matches then i can do the show based on id
if (updateListingBtn) {
  $.each($(".edit-btn"), function (index, button) {
    $(this).click(function () {
      $.each($(".updateListingContainer"), function (idx, container) {
        container.classList.add("hidden");

        if (
          container.getAttribute("data-update-listing-id") ===
          button.getAttribute("data-listing-id")
        ) {
          container.classList.toggle("hidden");
        }
      });
    });
  });
}

exitModalBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    addListingModal.classList.add("hidden");
    updateListingModal.forEach((modal) => {
      modal.classList.add("hidden");
    });
  });
});

//Handling Updating and deleting listings
$(".del-btn").click(function () {
  axios
    .delete(`/listings`, {
      params: {
        id: `${$(".del-btn").attr("data-listing-id")}`,
      },
    })
    .then((response) => {
      console.log(response);
      if (response.data.sucess) {
        location.replace("/profile");
      }
    })
    .then((cb) => {
      let div = document.createElement("div");
      div.className = "container";
      div.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Listing was removed successfully
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
                `;
      $(div).insertAfter($(".addListing-container"));
    })
    .catch((err) => {
      console.log(err);
    });
});

//update req
$(".update-form").submit(function (e) {
  e.preventDefault();
  axios
    .put(`/listings/?id=${$(".edit-btn").attr("data-listing-id")}`, {
      data: {
        body: $(this).serializeArray(),
      },
    })
    .then((response) => {
      console.log(response);
      if (response.data.sucess) {
        let div = document.createElement("div");
        div.className = "container";
        div.innerHTML = `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                  Listing was updated successfully
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
              `;
        $(div).insertAfter($(".addListing-container"));
        location.replace("/profile");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
