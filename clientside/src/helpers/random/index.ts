export const formatDateTime = (dateTimeString: string): string => {
    const dateTime = new Date(dateTimeString);
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
  
    const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
    const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);
  
    return `${formattedDate} ${formattedTime}`;
  };
  
  export const capitalizeFirstLetter = (word: string): string => {
    if (word.length === 0) {
      return word; // Return empty string if the word is empty
    }
    const firstLetter = word.charAt(0).toUpperCase();
    const remainingLetters = word.slice(1);
    return `${firstLetter}${remainingLetters}`;
  };
  
  