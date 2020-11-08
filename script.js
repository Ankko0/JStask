Study.GetData(Process);

function Process(array) {
    HtmlLog('Исходный массив', array)
    const funcs = [SortById, SortByTypeAndIdDesc, TakeItemsByType.bind(null, array, 2),
        TakeItemsWithNames, SortWithNanIdDesc, CutElems.bind(null, array, 3, 5)]
    for (let f of funcs)
        HtmlLog(f.name, f(array))
}

/* Логгирование через консоль */
function ConsoleLog(item) {
    if (Array.isArray(item))
        for (let obj of item) {
            console.log(`ID : ${obj.id} | Имя : ${obj.name} | Тип : ${obj.type}`)
        }
    else
        console.log(item.toString())
}

/* Вывод данных на страницу
* (!) Доделать вывод таблицей */
function HtmlLog(event, item) {
    let m = document.createElement('div')
    m.innerHTML = `<strong>${event}</strong> <br>`
    if (Array.isArray(item))
        for (let obj of item) {
            m.innerHTML += `ID : ${obj.id} ` + "\t" + `| Имя : ${obj.name}` + "\t" + `| Тип : ${obj.type} ` + "\t" + `<br>`
        }
    else
        m.innerHTML += item.toString()
    document.body.append(m)
}

/* Сортировка по ID по возростанию */
function SortById(array) {
    ConsoleLog('Сортировка по ID по возростанию')
    let res = Object.assign([], array)
    return res.sort((a, b) => a.id - b.id)
}

/* Сортировка по Type по возр. и ID по убыв. */
function SortByTypeAndIdDesc(array) {
    ConsoleLog('Сортировка по Type по возр. и ID по убыв.')
    let res = Object.assign([], array)
    return res.sort((a, b) => {
        if (a.type !== b.type)
            return a.type - b.type > 0 ? 1 : -1
        else
            return b.id - a.id
    })
}

/* Выборка по Type === 2 */
function TakeItemsByType(array, type) {
    ConsoleLog('Выборка по Type === 2')
    let res = []
    array.map((a) => {
        if (a.type === type)
            res.push(a)
    })
    return res
}

/* Выборка с непустым именем */
function TakeItemsWithNames(array) {
    ConsoleLog('Выборка с непустым именем')
    let res = []
    array.map((a) => {
        if (typeof a.name !== 'undefined' && a.name !== null)
            res.push(a)
    })
    return res
}

/* Сортировка по ID по убыванию */
function SortWithNanIdDesc(array) {
    ConsoleLog('Сортировка по ID по убыванию')
    let res = Object.assign([], array)
    res.push({name: 'Z', type: 9})
    res.push({id: null, name: 'W', type: 3})
    return res.sort((a, b) => {
        return b.id - a.id
    })
}

/* Удаление элементов c 3 по 5 */
function CutElems(array, from, to) {
    ConsoleLog('Удаление значений c 3 по 5')
    let res = Object.assign([], array)
    res.splice(from, to - from)
    return res
}