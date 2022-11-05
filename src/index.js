import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce'
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;



const refs = {
     countryInput: document.querySelector('#search-box'),
     countryList: document.querySelector('.country-list'),
     countryInfo: document.querySelector('.country-info'),
 };

refs.countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(e) {
    e.preventDefault();

    const name = refs.countryInput.value.trim()
  if (name === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '')
    };

    fetchCountries(name)
        .then(countries => {
            refs.countryList.innerHTML = ''
            refs.countryInfo.innerHTML = ''
            if (countries.length === 1) {
                refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
                refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries))
            } else if (countries.length >= 10) {
                alertManyMatches()
            } else {
                refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
            }
        })
        .catch(alertWrongName)
};

function renderCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 25px height = 25px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
    })
    .join('')
  return markup
};

function renderCountryInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    })
    .join('')
  return markup
};

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
};

function alertManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
};













    



