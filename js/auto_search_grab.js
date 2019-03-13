/*
SubscriptionItem__wrapper

0   Link SubscriptionItem__title

1   SubscriptionSelectedParams
    0   SubscriptionSelectedParams__item
        0  SubscriptionSelectedParams__name  Example: .textContent == "Цена: до 600 000 ₽"
        1  SubscriptionSelectedParams__value
*/
{
    const REQ_CARS_PROP = ['цена', 'пробег', 'коробка']
    let cars = []
    let error_flag = false

    for (car_descr of document.getElementsByClassName('SubscriptionItem__wrapper')) {
        
        // Get propeties of car(s)
        let car_descr_props = car_descr.children[1]
        if (car_descr_props.className == 'SubscriptionSelectedParams') {
            for (car_prop of car_descr_props.children) {
                let car_prop_name = car_prop.children[0]
                if ( (car_prop_name.className == 'SubscriptionSelectedParams__name')
                     && (REQ_CARS_PROP.includes(car_prop.children[0].textContent.split(':')[0])) ) 
                {
                        console.log("WOW")
                }
            }
        } else {
            console.error('car_descr.children[1].className not SubscriptionSelectedParams. car_descr: ' + car_descr)
            error_flag = true
        }
        
        // Get name of car(s)
        let car_descr_name = car_descr.children[0] 
        if (car_descr_name.className == 'Link SubscriptionItem__title') {
            // HERE CHECK IF ALREADY EXISTS 
            for (car_name of car_descr_name.text.split(', ')) {
                cars.push( { name: cars.replace('Автомобили ', ''), cur_car_props } )
            }
        } else {
            console.error('car_descr.children[0].className not Link SubscriptionItem__title. car_descr: ' + car_descr)
            error_flag = true
        }

        
    }
    console.log(cars)
}