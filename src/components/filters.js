export const returnFiltersHtml = (filters) => `
  <section class="main__filter filter container">
    ${filters.map((it) => `
      <input
        type="radio"
        id="filter__${it.title}"
        class="filter__input visually-hidden"
        name="filter"
        ${(it.title === `All`) ? `checked` : ``} ${!it.count ? `disabled` : ``}
      />
      <label for="filter__${it.title}" class="filter__label">
        ${it.title} <span class="filter__${it.title}-count">${it.count}</span></label
      >`).join(``)}
  </section>`;
