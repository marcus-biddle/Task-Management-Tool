export const showIf = (x: boolean) => (content: any) => (x ? content : null);

// TODO format true validation
export const getDate = (date?: string) => {
    const currentDay = new Date().toLocaleString('en-us', {  weekday: 'long' });
    const currentDate = new Date().toLocaleString('en-us', { dateStyle: 'long'});
    const clock = `${currentDay}, ${currentDate}`

    return date ? 'date received' : clock
    
}