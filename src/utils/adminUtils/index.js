export const validateNumber = (e) => {
    const inputValue = e.target.value;
  
    // If the first character is '0' and the user tries to type another '0', prevent it
    if (inputValue === '0' && e.key === '0') {
      e.preventDefault(); // Prevent typing another '0'
      return;
    }
  
    // Allow backspace, delete, arrow keys, etc.
    const validKey = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
  
    // If the key is not a number or one of the valid control keys, prevent input
    if (!/^[0-9]$/.test(e.key) && !validKey.includes(e.key)) {
      e.preventDefault();
    }
  };

   // remove multiple spaces from text 
   export const handleExtraSpaces = (text) =>{
    let newText = text.split(/[ ]+/);
    return (newText.join(" "))
 }