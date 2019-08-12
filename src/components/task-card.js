import {formatDate} from "../utils";

export const returnTaskCardHtml = ({description, dueDate, tags, color}) => `
  <article class="card card--${color}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>
  
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
  
        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>
  
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${formatDate(dueDate, {day: `numeric`})} ${formatDate(dueDate, {month: `long`})}</span>
                  <span class="card__time">${formatDate(dueDate, {hour: `numeric`, minute: `numeric`})}</span>
                </p>
              </div>
            </div>
  
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${Array.from(tags).map((it) => `
                  <span class="card__hashtag-inner">
                    <span class="card__hashtag-name">
                      #${it}
                    </span>
                  </span>`).join(``)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
