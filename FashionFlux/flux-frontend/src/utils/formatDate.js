// export const formatDate = (isDate) => {
//     const date = new Date(isDate);

//     if (isNaN(date.getTime())) return "Invalid Date"; 

//     return date.toLocaleDateString('en-US', { 
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     });
// };
export const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    // Handle invalid dates
    if (isNaN(date.getTime())) return "Invalid Date"; 

    return date.toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
