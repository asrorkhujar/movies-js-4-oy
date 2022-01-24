const elResult = document.querySelector('.movies__result');
const elList = document.querySelector('.movies__list');

const elMovieInfoModal = document.querySelector('.modal-movie-info');

//SEARCH FORM
const elFilmsSearchForm = document.querySelector('.js-movie-search-form');
const elFilmsSelect = document.querySelector('.select');

// const elMovieSearchInput = elMovieSearchForm.querySelector('.js-movie-search-input');
// const elMinYearInput = elMovieSearchForm.querySelector('.js-start-year-input');
// const elMaxYearInput = elMovieSearchForm.querySelector('.js-end-year-input');
// const elSortSelect = elMovieSearchForm.querySelector('.js-sort-select');

const youtubeLink = 'https://www.youtube-nocookie.com/embed/';
elResult.textContent = movies.length;

// FUNCTIONS
const generateGenres = function (movies) {
  const uniqueGenres = [];
  movies.forEach(movie => {
    movie.categories.forEach(category => {
      if (!uniqueGenres.includes(category)) {
        uniqueGenres.push(category);
      }
      uniqueGenres.sort();
    });
  });
  uniqueGenres.forEach(category => {
    let newFilmOption = document.createElement('option')

    newFilmOption.value = category;
    newFilmOption.textContent = category;

    elFilmsSelect.appendChild(newFilmOption);
  });
};

function getHoursStringFromMinutes(minutes) {
  return `${Math.floor(minutes / 60)} hrs ${minutes % 60} mins`;
}

elFilmsSearchForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const filteredCategory = [];

  for (let movie of movies) {
    if (elFilmsSelect.value === 'All' || movie.categories.includes(elFilmsSelect.value)) {
      filteredCategory.push(movie);
    }
  }

  if (filteredCategory.length > 0) {
    elList.innerHTML = null;
    elResult.innerHTML = filteredCategory.length;
    renderFilms(filteredCategory, elList);
  } else {
    elList.innerHTML = '<div class="col-12">No film found</div>';
  }
});

const renderFilms = function (filmsArray, element) {
  filmsArray.forEach(movie => {
    //CREATE ELEMENTS
    let newItemMovie = document.createElement('li');
    let newCard = document.createElement('div');
    let newImg = document.createElement('img');
    let newCardBody = document.createElement('div');
    let newCardTitle = document.createElement('h3');
    let newCardDate = document.createElement('p');
    let newCardRating = document.createElement('p');
    let newCardCategory = document.createElement('p');
    let newCardDuration = document.createElement('p');
    let newCardBtnWrapper = document.createElement('div');
    let newCardBtn = document.createElement('a');
    let newCardBtnMoreInfo = document.createElement('button');

    newCardBtnMoreInfo.dataset.uniqueId = movie.imdbId;

    //MORE INFO MODAL
    let newMoreInfoModal = document.createElement('div');
    newMoreInfoModal.setAttribute('class', 'movie-info-modal modal fade');
    newMoreInfoModal.setAttribute('id', 'more-info-modal');
    let newMoreInfoModalDialog = document.createElement('div');
    newMoreInfoModalDialog.setAttribute('class', 'modal-dialog modal-xl');
    let newMoreInfoModalContent = document.createElement('div');
    newMoreInfoModalContent.setAttribute('class', 'modal-content');
    let newMoreInfoModalBody = document.createElement('div');
    newMoreInfoModalBody.setAttribute('class', 'modal-body');
    let newMoreInfoModalBodyTopRow = document.createElement('div');
    newMoreInfoModalBodyTopRow.setAttribute('class', 'row align-items-center mb-3');
    let newMoreInfoModalBodyTopRowCol5 = document.createElement('div');
    newMoreInfoModalBodyTopRowCol5.setAttribute('class', 'col-lg-5');
    let newMoreInfoModalTitle = document.createElement('h3');
    newMoreInfoModalTitle.setAttribute('class', 'movie-info-modal__title mb-md-0');
    let newMoreInfoModalBodyTopRowCol7 = document.createElement('div');
    let newMoreInfoModalBodyTopRowCol7Wrapper = document.createElement('div');
    newMoreInfoModalBodyTopRowCol7Wrapper.setAttribute('class', 'd-flex flex-wrap small');
    newMoreInfoModalBodyTopRowCol7.setAttribute('class', 'col-lg-7');
    let newMoreInfoModalBodyTopRowRatingWrapper = document.createElement('span');
    newMoreInfoModalBodyTopRowRatingWrapper.setAttribute('class', 'd-flex align-items-center me-3');
    let newMoreInfoModalBodyTopRowRatingImg = document.createElement('img');
    newMoreInfoModalBodyTopRowRatingImg.setAttribute('class', 'me-1');
    newMoreInfoModalBodyTopRowRatingImg.setAttribute('src', '../../img/icon-star.svg');
    newMoreInfoModalBodyTopRowRatingImg.setAttribute('width', '16');
    newMoreInfoModalBodyTopRowRatingImg.setAttribute('height', '16');
    let newMoreInfoModalBodyTopRowRating = document.createElement('span');
    newMoreInfoModalBodyTopRowRating.setAttribute('class', 'movie-info-modal__rating');
    let newMoreInfoModalBodyTopRowYearWrapper = document.createElement('span');
    newMoreInfoModalBodyTopRowYearWrapper.setAttribute('class', 'd-flex align-items-center me-3');
    let newMoreInfoModalBodyTopRowYearImg = document.createElement('img');
    newMoreInfoModalBodyTopRowYearImg.setAttribute('class', 'me-1');
    newMoreInfoModalBodyTopRowYearImg.setAttribute('src', '../../img/icon-calendar-event.svg');
    newMoreInfoModalBodyTopRowYearImg.setAttribute('width', '16');
    newMoreInfoModalBodyTopRowYearImg.setAttribute('height', '16');
    let newMoreInfoModalBodyTopRowYear = document.createElement('span');
    newMoreInfoModalBodyTopRowYear.setAttribute('class', 'movie-info-modal__year');
    let newMoreInfoModalBodyTopRowDurationWrapper = document.createElement('span');
    newMoreInfoModalBodyTopRowDurationWrapper.setAttribute('class', 'd-flex align-items-center');
    let newMoreInfoModalBodyTopRowDurationImg = document.createElement('img');
    newMoreInfoModalBodyTopRowDurationImg.setAttribute('class', 'me-1');
    newMoreInfoModalBodyTopRowDurationImg.setAttribute('src', '../../img/icon-clock.svg');
    newMoreInfoModalBodyTopRowDurationImg.setAttribute('width', '16');
    newMoreInfoModalBodyTopRowDurationImg.setAttribute('height', '16');
    let newMoreInfoModalBodyTopRowDuration = document.createElement('span');
    newMoreInfoModalBodyTopRowDuration.setAttribute('class', 'movie-info-modal__duration');
    let newMoreInfoModalBodyBottomRow = document.createElement('div');
    newMoreInfoModalBodyBottomRow.setAttribute('class', 'row');
    let newMoreInfoModalBodyBottomRowCol5 = document.createElement('div');
    newMoreInfoModalBodyBottomRowCol5.setAttribute('class', 'col-lg-5 mb-3 mb-lg-0');
    let newMoreInfoModalBodyBottomRowIframeWrapper = document.createElement('div');
    newMoreInfoModalBodyBottomRowIframeWrapper.setAttribute('class', 'ratio ratio-16x9');
    let newMoreInfoModalBodyBottomRowIframe = document.createElement('iframe');
    newMoreInfoModalBodyBottomRowIframe.setAttribute('class', 'movie-info-modal__iframe d-block w-100 border-0 rounded');
    newMoreInfoModalBodyBottomRowIframe.setAttribute('src', youtubeLink + movie.youtubeId);
    newMoreInfoModalBodyBottomRowIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    let newMoreInfoModalBodyBottomRowCol7 = document.createElement('div');
    newMoreInfoModalBodyBottomRowCol7.setAttribute('class', 'col-lg-7');
    let newMoreInfoModalCategories = document.createElement('p');
    newMoreInfoModalCategories.setAttribute('class', 'movie-info-modal__categories');
    let newMoreInfoModalSummary = document.createElement('p');
    newMoreInfoModalSummary.setAttribute('class', 'movie-info-modal__summary');
    let newMoreInfoModalImdbLinkWrapper = document.createElement('div');
    let newMoreInfoModalImdbLink = document.createElement('a');
    newMoreInfoModalImdbLink.setAttribute('class', 'movie-info-modal__imdb-link');
    newMoreInfoModalImdbLink.setAttribute('href', `https://www.imdb.com/title/${movie.imdbId}`);
    newMoreInfoModalImdbLink.setAttribute('target', '_blank');

    elList.addEventListener('click', (evt) => {
      if (evt.target.matches(".js-more-info-button")) {
        let moreInfoBtnId = evt.target.dataset.uniqueId;

        let foundMovieModalInfo = movies.find((movie) => {
          return moreInfoBtnId === movie.imdbId
        })
        newMoreInfoModalTitle.textContent = foundMovieModalInfo.title;
        newMoreInfoModalBodyTopRowRating.textContent = foundMovieModalInfo.imdbRating;
        newMoreInfoModalBodyTopRowYear.textContent = foundMovieModalInfo.year;
        newMoreInfoModalBodyTopRowDuration.textContent = getHoursStringFromMinutes(foundMovieModalInfo.runtime);
        newMoreInfoModalCategories.textContent = `Categories: ${foundMovieModalInfo.categories.join(', ')}`;
        newMoreInfoModalSummary.textContent = foundMovieModalInfo.summary;
        newMoreInfoModalImdbLink.textContent = 'Show on IMDb';
      }
    })
    //SET ATTRIBUTE
    newItemMovie.setAttribute('class', 'movies__item col-sm-6 col-md-4 mb-4');
    newCard.setAttribute('class', 'card movies__card h-100');
    newImg.setAttribute('class', 'card-img-top');
    newImg.setAttribute('src', movie.smallThumbnail);
    newCardBody.setAttribute('class', 'card-body d-flex flex-column');
    newCardTitle.setAttribute('class', 'card-title');
    newCardDate.setAttribute('class', 'mb-1');
    newCardRating.setAttribute('class', 'mb-1 text-success');
    newCardCategory.setAttribute('class', 'mb-1');
    newCardDuration.setAttribute('class', 'mb-3 text-danger fw-bold');
    newCardBtnWrapper.setAttribute('class', 'mt-auto d-flex flex-column');
    newCardBtn.setAttribute('class', 'btn btn-secondary text-white mt-auto btn-sm mb-2');
    newCardBtn.setAttribute('target', '_blank');
    newCardBtn.setAttribute('href', youtubeLink + movie.youtubeId);
    newCardBtnMoreInfo.setAttribute('class', 'js-more-info-button btn btn-info text-white btn-sm');
    newCardBtnMoreInfo.setAttribute('type', 'button');
    newCardBtnMoreInfo.setAttribute('data-bs-toggle', 'modal');
    newCardBtnMoreInfo.setAttribute('data-bs-target', '#more-info-modal');

    //TEXT CONTENT
    newCardTitle.textContent = movie.title;
    newCardDate.textContent = `Release date: ${movie.year}`;
    newCardRating.textContent = `IMDb rating: ${movie.imdbRating}`;
    newCardCategory.textContent = `Categories: ${movie.categories.join(', ')}`;
    newCardDuration.textContent = `Duration: ${getHoursStringFromMinutes(movie.runtime)}`;
    newCardBtn.textContent = 'Watch Trailer';
    newCardBtnMoreInfo.textContent = 'More info';

    //APPEND CHILD
    elList.appendChild(newItemMovie);
    newItemMovie.appendChild(newCard);
    newCard.appendChild(newImg);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardDate);
    newCardBody.appendChild(newCardRating);
    newCardBody.appendChild(newCardCategory);
    newCardBody.appendChild(newCardDuration);
    newCardBody.appendChild(newCardBtnWrapper);
    newCardBtnWrapper.appendChild(newCardBtn);
    newCardBtnWrapper.appendChild(newCardBtnMoreInfo);

    //APPEND CHILD MORE INFO MODAL
    elMovieInfoModal.appendChild(newMoreInfoModal);
    newMoreInfoModal.appendChild(newMoreInfoModalDialog);
    newMoreInfoModalDialog.appendChild(newMoreInfoModalContent);
    newMoreInfoModalContent.appendChild(newMoreInfoModalBody);
    newMoreInfoModalBody.appendChild(newMoreInfoModalBodyTopRow);
    newMoreInfoModalBodyTopRow.appendChild(newMoreInfoModalBodyTopRowCol5);
    newMoreInfoModalBodyTopRowCol5.appendChild(newMoreInfoModalTitle);
    newMoreInfoModalBodyTopRow.appendChild(newMoreInfoModalBodyTopRowCol7);
    newMoreInfoModalBodyTopRowCol7.appendChild(newMoreInfoModalBodyTopRowCol7Wrapper);
    newMoreInfoModalBodyTopRowCol7Wrapper.appendChild(newMoreInfoModalBodyTopRowRatingWrapper);
    newMoreInfoModalBodyTopRowRatingWrapper.appendChild(newMoreInfoModalBodyTopRowRatingImg);
    newMoreInfoModalBodyTopRowRatingWrapper.appendChild(newMoreInfoModalBodyTopRowRating);
    newMoreInfoModalBodyTopRowCol7Wrapper.appendChild(newMoreInfoModalBodyTopRowYearWrapper);
    newMoreInfoModalBodyTopRowYearWrapper.appendChild(newMoreInfoModalBodyTopRowYearImg);
    newMoreInfoModalBodyTopRowYearWrapper.appendChild(newMoreInfoModalBodyTopRowYear);
    newMoreInfoModalBodyTopRowCol7Wrapper.appendChild(newMoreInfoModalBodyTopRowDurationWrapper);
    newMoreInfoModalBodyTopRowDurationWrapper.appendChild(newMoreInfoModalBodyTopRowDurationImg);
    newMoreInfoModalBodyTopRowDurationWrapper.appendChild(newMoreInfoModalBodyTopRowDuration);

    newMoreInfoModalBody.appendChild(newMoreInfoModalBodyBottomRow);
    newMoreInfoModalBodyBottomRow.appendChild(newMoreInfoModalBodyBottomRowCol5);
    newMoreInfoModalBodyBottomRowCol5.appendChild(newMoreInfoModalBodyBottomRowIframeWrapper);
    newMoreInfoModalBodyBottomRowIframeWrapper.appendChild(newMoreInfoModalBodyBottomRowIframe);
    newMoreInfoModalBodyBottomRow.appendChild(newMoreInfoModalBodyBottomRowCol7);
    newMoreInfoModalBodyBottomRowCol7.appendChild(newMoreInfoModalCategories);
    newMoreInfoModalBodyBottomRowCol7.appendChild(newMoreInfoModalSummary);
    newMoreInfoModalBodyBottomRowCol7.appendChild(newMoreInfoModalImdbLinkWrapper);
    newMoreInfoModalImdbLinkWrapper.appendChild(newMoreInfoModalImdbLink);

  });
};

renderFilms(movies, elList);
generateGenres(movies);