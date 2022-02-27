import { el } from 'redom';
import ymaps from 'ymaps';

function mainAtmcMap() {
  const mainAtmcMap = el('div', { class: 'atms-map' }, [
    el('section', { class: 'accounts-top container' }, [
      el(
        'div',
        { class: 'accounts-top__left' },
        el(
          'h1',
          { class: 'currency-conversions-title title' },
          'Карта банкоматов'
        )
      ),
    ]),
    el(
      'section',
      {
        class: ' margin-top-window  container',
      },
      el('div', { class: 'atms-map-window__container', id: 'myMap1' })
    ),
  ]);
  return mainAtmcMap;
}

function yandexMap(arrGeo) {
  ymaps
    .load()
    .then((maps) => {
      const map = new maps.Map('myMap1', {
        center: [44.8482948, 36.7001151],
        zoom: 8,
      });
      for (let placemark of arrGeo) {
        let label = `placemark_${arrGeo.indexOf(placemark) + 1}`;
        label = new maps.Placemark([placemark.lat, placemark.lon], {}, {});
        map.geoObjects.add(label);
      }
      console.log('end spinner');
      return map;
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error));
}

export { mainAtmcMap, yandexMap };
