const deleteText = document.querySelectorAll('.del')
const likeIcon = document.querySelectorAll('.thumbs-up')

Array.from(deleteText).forEach(element => element.addEventListener('click', deleteQuotes))
Array.from(likeIcon).forEach(element => element.addEventListener('click', updateLikes))

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

async function updateLikes(){
   const fullName = this.parentNode.childNodes[1].innerText
   const fullQuote = this.parentNode.childNodes[3].innerText
   const fullLikes = Number(this.parentNode.childNodes[5].innerText)

   try{
      const response = await fetch('updateLikes', {
         method: "put",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({
            "nameS": fullName,
            "quoteS": fullQuote,
            "likeS": fullLikes
         })
      })

      const data = await response.json()
      console.log(data)
      // location.reload()
   }catch(error){
      console.error(error);
   }
}