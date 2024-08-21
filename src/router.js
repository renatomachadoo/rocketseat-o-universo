export class Router{
  routes = []

  //ADD NEW ROUTES
  add(routeName, link, bgImage) {
    // Check if the routeName exists, if not, initialize it
    if (!this.routes[routeName]) {
      this.routes[routeName] = {}
    }
  
    // Assign the link to the route
    this.routes[routeName].link = link
  
    // If bgImage is provided, assign it to the route
    if (bgImage) {
      this.routes[routeName].bgImage = bgImage
    }
  }

  //CHANGE THE ROUTE
  route(event){
    event = event || window.event
    event.preventDefault()
  
    window.history.pushState({}, "", event.target.href)
  
    this.handle()
  }

  //LOADS THE PAGE HTML AND CHANGES
  handle(){
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    this.changeSelectedLink(pathname)
    fetch(route.link)
    .then(data => data.text())
    .then(html => {
      document.querySelector("#app").innerHTML = html
      if(!route.bgImage){
        return
      }
      document.body.style.backgroundImage = `url('${route.bgImage}')`;
    })
  }

  changeSelectedLink(pathname){
    const selectedApplied = document.querySelector("nav-selected")
    if(selectedApplied){
      selectedApplied.classList.remove("nav-selected")
    }
    let formattedPathname = pathname.replace("/", "")
    if(!formattedPathname){
      formattedPathname = "home"
    }
    const selectedLink = document.querySelector(`#nav-${formattedPathname}`)
    if(selectedLink){
      selectedLink.classList.add("nav-selected")
    }
  }
}