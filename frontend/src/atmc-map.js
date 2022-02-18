import { el } from 'redom';
// import ymaps from 'ymaps';

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

const scriptMap = el('script', {
  src: 'https://api-maps.yandex.ru/2.1?apikey=вашAPI-ключ&lang=ru_RU',
});

export { mainAtmcMap, scriptMap, yandexMap };

function yandexMap(ymaps) {
  // ymaps
  //   .load()
  //   .then((maps) => {
  //     const map = new maps.Map('your-map-container', {
  //       center: [-8.369326, 115.166023],
  //       zoom: 7,
  //     });
  //     // return map;
  //   })
  //   .catch((error) => console.log('Failed to load Yandex Maps', error));
  ymaps.ready(() => {
    let myMap = new ymaps.Map('myMap1', {
      center: [55.159897, 61.402554],
      zoom: 11.5,
    });
    let myPlacemark = new ymaps.Placemark(
      [55.176826, 61.364584],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/map.svg',
        iconImageSize: [28, 40],
        // iconImageOffset: [-3, -42]
      }
    );
    let myPlacemark1 = new ymaps.Placemark([55.181968, 61.448524], {}, {});
    let myPlacemark2 = new ymaps.Placemark([55.177151, 61.450672], {}, {});
    myMap.geoObjects.add(myPlacemark);
    myMap.geoObjects.add(myPlacemark1);
    myMap.geoObjects.add(myPlacemark2);
  });
}
