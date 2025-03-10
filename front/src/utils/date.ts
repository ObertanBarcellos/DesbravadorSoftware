export function projectViewDate(dateHour: Date | string): string | null {
    const newDate = new Date(dateHour)

    const day = String(newDate.getDate()).padStart(2, '0')
    const month = String(newDate.getMonth() + 1).padStart(2, '0')
    const year = newDate.getFullYear()
    const hour = String(newDate.getHours()).padStart(2, '0')
    const min = String(newDate.getMinutes()).padStart(2, '0')

    const date = `${ day }/${ month }/${ year }`
    const minHour = `${ hour }:${ min }`

    if (date == '01/01/1') {
        return 'Não finalizado'
    }

    return `${ minHour } - ${ date }`
}