import React from 'react';

import PropTypes from 'prop-types';

function Pagination({ pageCount, current, navigate }) {
  let previousPage = current - 1;
  let nextPage = current + 1;
  let lastPage = pageCount;
  let isFirstPage = current === 1;
  let isLastPage = current === lastPage;
  let showPrevious = current > 2;

  const onClick = (e, page) => {
    e.preventDefault();
    navigate(page);
  };

  if (pageCount <= 1) {
    return (<ul className="pagination" />);
  }

  return (
    <div className="rf-container rf-mt-2w">
      <nav className="rf-pagination rf-grid-row rf-grid-row--center" aria-label="Pagination navigation">
        <ul className="rf-pagination__list rf-col-8">
          <li className={`rf-pagination__item--first rf-pagination__item ${isFirstPage ? 'rf-pagination__item--disabled' : ''}`}>
            <a className="rf-pagination__link"
              href="#"
              onClick={e => !isFirstPage ? onClick(e, 1) : () => { }}
              aria-label="Première page"
              title="Première page">
            </a>
          </li>
          <li className={`rf-pagination__item--prev rf-pagination__item ${isFirstPage ? 'rf-pagination__item--disabled' : ''}`}>
            <a className="rf-pagination__link" onClick={e => !isFirstPage ? onClick(e, previousPage) : () => { }}
              href="#"
              aria-label="Page précédente"
              title="Page précédente">
              <span className="rf-pagination__label">Page précédente</span>
            </a>
          </li>
          <li className={`rf-pagination__item ${isFirstPage ? 'rf-pagination__item--active' : ''}`}>
            <a href="/#" className="rf-pagination__link" onClick={e => onClick(e, 1)}>1</a>
          </li>
          {
            (pageCount > 5 && current > 3) &&
            <li className="rf-pagination__item rf-pagination__item--from-md">
              <a href="/#" className="rf-pagination__link">...</a>
            </li>
          }
          {
            showPrevious &&
            <li className="rf-pagination__item">
              <a
                href="/#"
                className="rf-pagination__link"
                onClick={e => onClick(e, previousPage)}>{previousPage}
              </a>
            </li>
          }
          {
            (!isFirstPage && !isLastPage) &&
            <li className="rf-pagination__item rf-pagination__item--active">
              <a
                href="/#"
                className="rf-pagination__link"
                onClick={e => onClick(e, current)}>{current}
              </a>
            </li>
          }
          {
            (nextPage < lastPage) &&
            <li className="rf-pagination__item">
              <a href="/#" className="rf-pagination__link" onClick={e => onClick(e, nextPage)}>{nextPage}</a>
            </li>
          }
          {
            (current < pageCount - 2) &&
            <li className="rf-pagination__item rf-pagination__item--from-md">
              <a href="/#" className="rf-pagination__link">...</a>
            </li>
          }
          <li className={`rf-pagination__item ${isLastPage && 'rf-pagination__item--active'}`}>
            <a href="/#" className="rf-pagination__link" onClick={e => onClick(e, lastPage)}>{lastPage}</a>
          </li>
          <li className={`rf-pagination__item--next rf-pagination__item ${isLastPage ? 'rf-pagination__item--disabled' : ''}`}>
            <a className="rf-pagination__link"
              onClick={e => !isLastPage ? onClick(e, nextPage) : () => { }}
              href="#"
              aria-label="Page suivante"
              title="Page suivante">
              <span className="rf-pagination__label">Page suivante</span>
            </a>
          </li>
          <li className={`rf-pagination__item--last rf-pagination__item ${isLastPage ? 'rf-pagination__item--disabled' : ''}`}>
            <a className="rf-pagination__link"
              href="#" onClick={e => !isLastPage ? onClick(e, lastPage) : () => { }}
              aria-label="Dernière page"
              title="Dernière page">
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number,
  current: PropTypes.number,
  navigate: PropTypes.func
};

export default Pagination;
