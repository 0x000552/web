/*
SubscriptionItem__wrapper

0   Link SubscriptionItem__title

1   SubscriptionSelectedParams
    0   SubscriptionSelectedParams__item
        0  SubscriptionSelectedParams__name  Example: .textContent == "Цена: до 600 000 ₽"
        1  SubscriptionSelectedParams__value
*/
{
    'use strict'

    const REQ_CARS_PROP = ['цена', 'пробег', 'коробка']
    let saved_cars = []
    let car_props = []
    let error_flag = false


    for (car_descr of document.getElementsByClassName('SubscriptionItem__wrapper')) {
        for (let i=0; i < REQ_CARS_PROP.length; i++) {
            car_props[i] = ""
        }
        // Get propeties of car(s)
        let car_descr_props = car_descr.children[1]
        if (car_descr_props.className == 'SubscriptionSelectedParams') {
            for (car_prop of car_descr_props.children) {
                // TODO: Bad var name car_prop_name, mb car_prop_first_child
                if (car_prop.children[0].className == 'SubscriptionSelectedParams__name') {
                    let car_prop_name_value = car_prop.textContent.split(': ')
                    let index_of_prop = REQ_CARS_PROP.indexOf(car_prop_name_value[0].toLowerCase())
                    if (index_of_prop != -1) {
                        car_props[index_of_prop] = car_prop_name_value[1].replace(/, /g, '; ')
                    }
                } 
            }
        } else {
            console.error('car_descr.children[1].className not SubscriptionSelectedParams. car_descr: ' + car_descr)
            error_flag = true
        } 
        console.log(car_props)
        
        
        // Get name of car(s)
        let car_descr_name = car_descr.children[0] 
        if (car_descr_name.className == 'Link SubscriptionItem__title') {
            for (car_name of car_descr_name.text.replace(/,(?![^(]*\))/g, "{").split('{ ')) {
                car_name = car_name.replace('Автомобили ', '')
                // Check if the same car exists 
                let flag_car_exists = false
                for (saved_car of saved_cars) {
                    if (saved_car.name == car_name) {
                        for (let i=0; i < car_props; i++) {
                            if (saved_car.props[i] != car_props[i]){
                                break
                            }
                        }
                        flag_car_exists = true
                    }
                }
                if (!flag_car_exists) {
                    saved_cars.push( { name: car_name, props: car_props.slice() } )
                }
                
            }
        }  else {
            console.error('car_descr.children[0].className not Link SubscriptionItem__title. car_descr: ' + car_descr)
            error_flag = true
        }
        
    }

    // Sorting by name...
    saved_cars.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    console.log(saved_cars)

    let csvContent = "data:text/csv;charset=utf-8,\n"
    csvContent += "марка/модель," + REQ_CARS_PROP + "\n"
    csvContent += saved_cars.map(e=>e.name + ',' + e.props).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}