import {COLORS} from '../data';
import {getFormattedDate, DateOption, createElement} from '../utils';

class TaskEdit {
  constructor({description, dueDate, tags, color, repeatingDays, isArchive, isFavorite}) {
    this._description = description;
    this._dueDate = dueDate;
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `
      <article class="card card--edit
        ${this._color ? `card--${this._color}` : ``}
        ${Object.values(this._repeatingDays).some((it) => it) ? `card--repeat` : ``}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}"
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
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>
    
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                  </button>
    
                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder=""
                        name="date"
                        value="${getFormattedDate(this._dueDate, DateOption.NUMERIC_DAY, DateOption.FULL_MONTH, DateOption.SHORT_TIME)}"
                      />
                    </label>
                  </fieldset>
    
                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${Object.values(this._repeatingDays).some((it) => it) ? `yes` : `no`}</span>
                  </button>
    
                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                      ${Object.keys(this._repeatingDays).map((it) => `
                        <input
                          class="visually-hidden card__repeat-day-input"
                          type="checkbox"
                          id="repeat-${it.toLowerCase()}-4"
                          name="repeat"
                          value="${it.toLowerCase()}"
                          ${this._repeatingDays[it] ? `checked` : ``}
                        />
                        <label class="card__repeat-day" for="repeat-${it.toLowerCase()}-4"
                          >${it.toLowerCase()}</label
                        >
                      `).join(``)}
                    </div>
                  </fieldset>
                </div>
    
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${[...this._tags].map((it) => `
                      <span class="card__hashtag-inner">
                        <input
                          type="hidden"
                          name="hashtag"
                          value="repeat"
                          class="card__hashtag-hidden-input"
                        />
                        <p class="card__hashtag-name">
                          #${it}
                        </p>
                        <button type="button" class="card__hashtag-delete">
                          delete
                        </button>
                      </span>`).join(``)}
                  </div>
    
                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>
    
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${COLORS.map((it) => `
                    <input
                      type="radio"
                      id="color-${it}-4"
                      class="card__color-input card__color-input--${it} visually-hidden"
                      name="color"
                      value="${it}"
                      ${(it === this._color) ? `checked` : ``}
                    />
                    <label
                      for="color-${it}-4"
                      class="card__color card__color--${it}"
                      >${it}</label
                    >
                  `).join(``)}
                </div>
              </div>
            </div>
    
            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`;
  }
}

export default TaskEdit;
