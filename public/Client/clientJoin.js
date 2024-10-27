const clientName = document.getElementById("client-name")
const hostId = document.getElementById("host-id")
const buttonEl = document.getElementById("join-button")

buttonEl.addEventListener("click", function(){
  console.log(clientName.value)
  console.log(hostId.value)
})
