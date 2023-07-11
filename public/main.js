const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach(element => element.addEventListener('click', deleteQuotes))

async function deleteQuotes(){
   const fullName = this.parentNode.childNodes[1].innerText
   const fullQuote = this.parentNode.childNodes[3].innerText

   try{
      const response = await fetch("deleteQuotes", {
         method: 'delete',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            'nameS': fullName,
            'quoteS': fullQuote
         })
      })

      const data = await response.json()
      console.log(data)
      location.reload()
   }catch(error){
      console.error(error);
   }
}