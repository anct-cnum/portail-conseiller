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
    <div className="fr-container">
      <nav className="fr-pagination fr-grid-row fr-grid-row--center" aria-label="Pagination navigation">
        <ul className="fr-pagination__list fr-col-8">
          <li className={`fr-pagination__item--first fr-pagination__item ${isFirstPage ? 'fr-pagination__item--disabled' : ''}`}>
            <a className="fr-pagination__link"
              href="#"
              onClick={e => !isFirstPage ? onClick(e, 1) : () => { }}
              aria-label="Premi&egrave;re page"
              title="Premi&egrave;re page">
            </a>
          </li>
          <li className={`fr-pagination__item--prev fr-pagination__item ${isFirstPage ? 'fr-pagination__item--disabled' : ''}`}>
            <a className="fr-pagination__link" onClick={e => !isFirstPage ? onClick(e, previousPage) : () => { }}
              href="#"
              aria-label="Page pr&eacute;c&eacute;dente"
              title="Page pr&eacute;c&eacute;dente">
              <span className="fr-pagination__label">Page pr&eacute;c&eacute;dente</span>
            </a>
          </li>
          <li className={`fr-pagination__item ${isFirstPage ? 'fr-pagination__item--active' : ''}`}>
            <a href="/#" className="fr-pagination__link" onClick={e => onClick(e, 1)}>1</a>
          </li>
          {
            (pageCount > 5 && current > 3) &&
            <li className="fr-pagination__item fr-pagination__item--from-md">
              <a href="/#" className="fr-pagination__link">...</a>
            </li>
          }
          {
            showPrevious &&
            <li className="fr-pagination__item">
              <a
                href="/#"
                className="fr-pagination__link"
                onClick={e => onClick(e, previousPage)}>{previousPage}
              </a>
            </li>
          }
          {
            (!isFirstPage && !isLastPage) &&
            <li className="fr-pagination__item fr-pagination__item--active">
              <a
                href="/#"
                className="fr-pagination__link"
                onClick={e => onClick(e, current)}>{current}
              </a>
            </li>
          }
          {
            (nextPage < lastPage) &&
            <li className="fr-pagination__item">
              <a href="/#" className="fr-pagination__link" onClick={e => onClick(e, nextPage)}>{nextPage}</a>
            </li>
          }
          {
            (current < pageCount - 2) &&
            <li className="fr-pagination__item fr-pagination__item--from-md">
              <a href="/#" className="fr-pagination__link">...</a>
            </li>
          }
          <li className={`fr-pagination__item ${isLastPage && 'fr-pagination__item--active'}`}>
            <a href="/#" className="fr-pagination__link" onClick={e => onClick(e, lastPage)}>{lastPage}</a>
          </li>
          <li className={`fr-pagination__item--next fr-pagination__item ${isLastPage ? 'fr-pagination__item--disabled' : ''}`}>
            <a className="fr-pagination__link"
              onClick={e => !isLastPage ? onClick(e, nextPage) : () => { }}
              href="#"
              aria-label="Page suivante"
              title="Page suivante">
              <span className="fr-pagination__label">Page suivante</span>
            </a>
          </li>
          <li className={`fr-pagination__item--last fr-pagination__item ${isLastPage ? 'fr-pagination__item--disabled' : ''}`}>
            <a className="fr-pagination__link"
              href="#" onClick={e => !isLastPage ? onClick(e, lastPage) : () => { }}
              aria-label="Derni&egrave;re page"
              title="Derni&egrave;re page">
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
