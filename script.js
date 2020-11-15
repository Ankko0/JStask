
Study.GetData(Process);

/* Обработка данных из Study.GetData. */
function Process(array) {
    HtmlLog('Исходный массив', array);
    const funcs = [SortById, SortByTypeAndIdDesc, TakeItemsByType.bind(null, array,2),TakeItemsWithNames, SortWithNanIdDesc, CutElems.bind(null, array, 3, 5)];
    funcs.forEach(function(value) {
        HtmlLog(value.name, value(array))
    });
}

/* Логгирование через консоль. */
function ConsoleLog(item) {
    let divResult = document.createElement('div');
    if (Array.isArray(item))
        item.forEach(function(value) {
            console.log('ID : '+ value.id+ ' | Имя : '+ value.name + ' | Тип : '+value.type);
        })
    else
        console.log(item.toString());
}

/* Вывод данных на страницу. В IE 11 не отображается название функции. */
function HtmlLog(event, item) {
    let divResult = document.createElement('div');
    divResult.innerHTML = "<strong>" +event + "</strong> <br>";
    if (Array.isArray(item))
        item.forEach(function(value) {
            divResult.innerHTML +='ID : '+ value.id+ ' | Имя : '+ value.name + ' | Тип : '+value.type + '<br>';
        })
    else
        divResult.innerHTML += item.toString();
    divResult.innerHTML += '<br>';
    document.body.appendChild(divResult);
}

/* Сортировка по ID по возростанию. Возвращает копию массива после сортировки.  */
function SortById(array) {
    ConsoleLog('Сортировка по ID по возростанию');
    let res = array.slice();
    return res.sort(function (a, b) {
       return  a.id - b.id
    })
}

/* Сортировка по Type по возр. и ID по убыв. Возвращает копию массива после сортировки. */
function SortByTypeAndIdDesc(array) {
    ConsoleLog('Сортировка по Type по возр. и ID по убыв.');
    let res = array.slice();
    return res.sort(function (a, b)  {
        if (a.type !== b.type)
            return a.type - b.type > 0 ? 1 : -1
        else
            return b.id - a.id
    })
}

/* Выборка по Type === 2. Возвращает копию массива после выборки. */
function TakeItemsByType(array, type) {
    ConsoleLog('Выборка по Type === 2');
    let res = [];
    array.map(function (a) {
        if (a.type === type)
            res.push(a)
    });
    return res
}

/* Выборка с непустым именем. Возвращает копию массива после выборки. */
function TakeItemsWithNames(array) {
    ConsoleLog('Выборка с непустым именем');
    let res = [];
    array.map(function (a) {
        if (typeof a.name !== 'undefined' && a.name !== null)
            res.push(a)
    });
    return res
}

/* Сортировка по ID по убыванию. Возвращает копию массива после сортировки. */
function SortWithNanIdDesc(array) {
    ConsoleLog('Сортировка по ID по убыванию');
    let res = array.slice();
    res.push({name: 'Z', type: 9});
    res.push({id: null, name: 'W', type: 3});
    return res.sort(function (a, b) {
        return b.id - a.id
    });
}

/* Удаление элементов c 3 по 5. Возвращает копию массива после удаления элементов. */
function CutElems(array, from, to) {
    ConsoleLog('Удаление значений c 3 по 5');
    let res = array.slice();
    res.splice(from, to - from);
    return res
}