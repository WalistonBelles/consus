/**
 * Usado para verificar se a reserva está no passado.
 * @param {number} year  Ano da reserva.
 * @param {number} month  Mês da reserva.
 * @param {number} day  Dia da reserva.
 * @param {number} hour  Hora da reserva.
 * @param {number} minute  Minuto da reserva.
 * @returns {boolean}  Retorna um booleano que representa se o livro está no passado.
 */
function isInPast(year, month, day, hour, minute) {
    const todayDate = Date.now();
    let reqDate = {};
    if (hour !== undefined) {
        reqDate = Date.UTC(year, month - 1, day, hour, minute);
    } else if (day !== undefined) {
        reqDate = Date.UTC(year, month - 1, day);
    } else {
        reqDate = Date.UTC(year, month);
    }
    return reqDate < todayDate;

}

/**
 * Usado para verificar se a reserva é feita com pelo menos 24 horas de antecedência.
 * @param {number} year  Ano da reserva.
 * @param {number} month  Mês da reserva.
 * @param {number} day  Dia da reserva.
 * @param {number} hour  Hora da reserva.
 * @param {number} minute  Minuto da reserva.
 * @returns {boolean}  Retorna um booleano que representa se o livro tem 24 horas de antecedência.
 */
function is24HoursInAdvance(year, month, day, hour, minute) {
    const todayDate = new Date(Date.now());
    const plus24Hours = todayDate.setUTCHours(todayDate.getUTCHours() + 24);
    const reqDate = Date.UTC(year, month-1, day, hour, minute);
    return reqDate > plus24Hours;
}

/**
 * Usado para verificar se a reserva está dentro do período de reserva (em um dia da semana entre 9h e 17h).
 * @param {number} year  Ano da reserva.
 * @param {number} month  Mês da reserva.
 * @param {number} day  Dia da reserva.
 * @param {number} hour  Hora da reserva.
 * @param {number} minute  Minuto da reserva.
 * @returns {boolean}  Retorna um booleano que representa se a reserva está no período de tempo que pode ser reservado.
 */
function isInBookableTimeframe(year, month, day, hour, minute) {
    if (hour !== undefined) {
        const reqDate = new Date(Date.UTC(year, month-1, day, hour, minute));
        const reqDay = reqDate.getUTCDay();
        if (reqDay === 6 || reqDay === 0) return false; // 6 é sábado, 0 é domingo.
        const reqHour = reqDate.getUTCHours();
        if (reqHour < 9 || reqHour > 17) return false;
    } else {
        const reqDate = new Date(Date.UTC(year, month-1, day));
        const reqDay = reqDate.getUTCDay();
        if (reqDay === 6 || reqDay === 0) return false; // 6 é sábado, 0 é domingo.
    }
    return true;
}

/**
 * Usado para verificar se há entradas de parâmetros REST ausentes antes de prosseguir com a solicitação.
 * @param {number} year  Valor do ano para verificar. Denote com '0' se não estiver verificando esta variável.
 * @param {number} month  Valor do mês a ser verificado Denote com '0' se não estiver checando para esta variável.
 * @param {number} day  Valor de dia a ser verificado Denote com '0' se não estiver verificando para esta variável.
 * @param {number} hour  Valor da hora a verificar. Denote com '0' se não estiver verificando esta variável.
 * @param {number} minute  Valor de minuto para verificar. Denote com '0' se não estiver verificando esta variável.
 * @returns {object}  Retorna um objeto com informações sobre qual parâmetro estava faltando.
 */
function checkMissingInputs(year, month, day, hour, minute) {
    if (!year) return {success: false, message: 'Pedido sem parâmetro: year'};
    if (!month) return {success: false, message: 'Pedido sem parâmetro: month'};
    if (!day) return {success: false, message: 'Pedido sem parâmetro: day'};
    if (!hour) return {success: false, message: 'Pedido sem parâmetro: hour'};
    if (!minute) return {success: false, message: 'Pedido sem parâmetro: minute'};
}

/**
 * Used to validate bookings.
 * @param {number} year  Year of booking to check.
 * @param {number} month  Month of booking to check.
 * @param {number} day  Day of booking to check.
 * @param {number} hour  Hour of booking to check.
 * @param {number} minute  Minute of booking to check.
 * @returns {object}  Returns an object with info on why the booking was invalid.
 */
function validateBooking(year, month, day, hour, minute) {
    const missingInputs = checkMissingInputs(year, month, day, hour, minute);
    if (missingInputs) return missingInputs;
    if (isInPast(year, month, day, hour, minute))
        return {success: false, message: 'Não é possível reservar uma data que já passou.'};
    if (!isInBookableTimeframe(year, month, day, hour, minute))
        return {success: false, message: 'Não é possível reservar fora do período de reserva'};
    if (!is24HoursInAdvance(year, month, day, hour, minute))
        return {success: false, message: 'Não é possível reservar com menos de 24 horas de antecedência'};
}

/**
 * Used to validate GET Timeslot requests.
 * @param {number} year  Year parameter to check.
 * @param {number} month  Month parameter to check.
 * @param {number} day  Day parameter to check.
 * @returns {object}  Returns an object with info on why the request was invalid.
 */
function validateGetTimeslots(year, month, day) {
    const missingInputs = checkMissingInputs(year, month, day, '0', '0');
    if (missingInputs) return missingInputs;
    if (isInPast(year, month, day, undefined, undefined))
        return {success: false, message: 'Nenhum intervalo de tempo disponível no passado'};
    if (!isInBookableTimeframe(year, month, day, undefined, undefined))
        return {success: false, message: 'Não existem intervalos de tempo fora do período de reserva'};
}

/**
 * Used to validate GET Days requests.
 * @param {number} year  Year parameter to check.
 * @param {number} month  Month parameter to check.
 * @returns {object}  Returns an object with info on why the request was invalid.
 */
function validateGetDays(year, month) {
    const missingInputs = checkMissingInputs(year, month, '0', '0', '0');
    if (missingInputs) return missingInputs;
    if (isInPast(year, month, undefined, undefined, undefined))
        return {success: false, message: 'Nenhum intervalo de tempo disponível no passado'};
}

module.exports = {
    checkMissingInputs,
    validateBooking,
    validateGetTimeslots,
    validateGetDays
};