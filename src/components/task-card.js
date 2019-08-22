import {getFormattedDate, createElement, DateOption, unrenderElement} from '../utils';

class Task {
  constructor({description, dueDate, tags, color, repeatingDays, isArchive, isFavorite}) {
    this._description = description;
    this._dueDate = dueDate;
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    unrenderElement(this._element);
    this._element = null;
  }

  getTemplate() {
    return `
      <article class="card
        ${this._color ? `card--${this._color}` : ``}
        ${Object.values(this._repeatingDays).some((it) => it) ? `card--repeat` : ``}">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive ${this._isFavorite ? `card__btn--disabled` : ``}">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${this._isArchive ? `card__btn--disabled` : ``}"
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
              <p class="card__text">${this._description}</p>
            </div>
      
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date">${getFormattedDate(this._dueDate, DateOption.NUMERIC_DAY, DateOption.FULL_MONTH)}</span>
                      <span class="card__time">${getFormattedDate(this._dueDate, DateOption.SHORT_TIME)}</span>
                    </p>
                  </div>
                </div>
      
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${[...this._tags].map((it) => `
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
  }
}

export default Task;
