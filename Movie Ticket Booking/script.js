const theatreContainer = document.querySelector(".theatre-container");
const unoccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const countElement = document.getElementById("selected-seat-count");
const totalPriceElement = document.getElementById("total-price");

const movieSelect = document.getElementById("movie");
let selectedMovieTicketPrice = +movieSelect.value; // Same as const ticketPrice = parseInt(movieSelect.value);

// Gets data from localStorage and populates UI on page load/refresh. This is an IIFE
(function populateUI() {
  const selectedSeatIndices = JSON.parse(
    localStorage.getItem("selectedSeatIndices")
  );
  if (selectedSeatIndices && selectedSeatIndices.length > 0) {
    unoccupiedSeats.forEach((unoccupiedSeat, index) => {
      if (selectedSeatIndices.indexOf(index) > -1) {
        unoccupiedSeat.classList.add("selected");
      }
    });
  }

  const selectedMovieindex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieindex) {
    movieSelect.selectedIndex = selectedMovieindex;
  }

  countElement.innerText = selectedSeatIndices.length;
  selectedMovieTicketPrice = +movieSelect.value;
  totalPriceElement.innerText =
    selectedSeatIndices.length * selectedMovieTicketPrice;
})();

function updateSelectedSeatCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatCount = selectedSeats.length;

  const selectedSeatIndices = [...selectedSeats].map((selectedSeat) =>
    [...unoccupiedSeats].indexOf(selectedSeat)
  );

  localStorage.setItem(
    "selectedSeatIndices",
    JSON.stringify(selectedSeatIndices)
  );

  countElement.innerText = selectedSeatCount;
  totalPriceElement.innerText = selectedSeatCount * selectedMovieTicketPrice;
}

function saveMovieDataToLocalStorage(movieIndex, movieTicketPrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMovieTicketPrice", movieTicketPrice);
}

// Change Event on `Select` tag
movieSelect.addEventListener("change", (e) => {
  selectedMovieTicketPrice = +e.target.value;
  saveMovieDataToLocalStorage(e.target.selectedIndex, e.target.value);
  updateSelectedSeatCount();
});

// Click Event on Seats
theatreContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedSeatCount();
  }
});
