export function projectViewDate(dateHour: Date | string): string | null {
    const data = new Date(dateHour)

    const day = String(data.getUTCDate()).padStart(2, '0')
    const month = String(data.getUTCMonth() + 1).padStart(2, '0')
    const year = data.getUTCFullYear()
    const hour = String(data.getUTCHours()).padStart(2, '0')
    const min = String(data.getUTCMinutes()).padStart(2, '0')

    const date = `${ day }/${ month }/${ year }`
    const minHour = `${ hour }:${ min }`

    if (date == '01/01/1') {
        return 'Não finalizado'
    }

    return `${ minHour } - ${ date }`
}