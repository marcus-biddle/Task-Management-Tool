export const showIf = (x: boolean) => (content: any) => (x ? content : null);

export const showIfOrElse = (x: boolean) => (content: any) => (fallbackContent: any) => (x ? content : fallbackContent);

export const useDate = (date?: string) => {
    const currentDay = new Date().toLocaleString('en-us', {  weekday: 'long' });
    const currentDate = new Date().toLocaleString('en-us', { dateStyle: 'long'});
    const clock = `${currentDay}, ${currentDate}`

    return date ? new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: '2-digit', day: '2-digit', year: 'numeric'}) : clock
}