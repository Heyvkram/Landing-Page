 /**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

// Create class Navbar
class Navbar {
    // constructor function to create the class
    constructor () {        
        this.navbar = document.querySelector(".navbar__menu");
        this.navbarlist = document.querySelector("#navbar__list");
        this.sections = {
            section1: {
                id: "section1",
                datanav: "Section 1"
            }, 
            section2: {
                id: "section2",
                datanav: "Section 2"
            }, 
            section3:{
                id: "section3",
                datanav: "Section 3"
            }, 
            section4:{
                id: "section4",
                datanav: "Section 4"
            }
        };

        this.sections_array = [...document.getElementsByTagName('section')];
        this.active_section = document.getElementById('section1');
        this.active_link = null;
        this.nav_links = {};
        this.init();
    }

    // initialize the functions
    init() {
        this.createLinks();    
        this.addListeners(); 
    }
    
    //Function to create the navegation bar items, trigger the click event listener and adding the active-link class
    createLinks(){
        for(let section in this.sections) {
            
            let link = document.createElement("li"); // create a list item element
            let anchornav = document.createElement("a"); // create an anchor element
            anchornav.style.color = "black"; // change the anchor css propery
            anchornav.dataset.section = this.sections[section].id; // add the section id to the anchor element
            anchornav.innerText = this.sections[section].datanav; // add text inside the anchor 
            link.appendChild(anchornav); // append the anchor to the list item
            link.addEventListener('click', ()=> {this.clickEvent(this.sections[section].id)} ); // add the event listener
            this.nav_links[this.sections[section].id] = link; // anchor the section to the list element
            this.addLink(link); // addlink function (Append the navegation bar items to the navegation bar)
            link.classList.add('menu__link'); // add the class menu__link to the list item            

            if ( section === "section1" ) {
                link.classList.add('active-link');
                this.active_link = link;
            }
        }
    }

    // Append the navegation bar items to the navegation bar
    addLink(link){
        this.navbarlist.appendChild( link );
    }

    // Function to scroll to selected section when click on the nav item and make the scroll smooth
    clickEvent (id) {
        let target_section = document.getElementById(id);
        target_section.scrollIntoView({behavior: "smooth"});
        this.highlightActiveLink(id)
        this.highlightActiveSection(target_section);
    }

    // Function to highlight the menu item and the section if it's in the viewport
    scrollEvent (e) {
        this.sections_array.forEach(section => {
            if (this.inViewport(section)) {
                this.highlightActiveLink(section.id);
                this.highlightActiveSection(section);   
            }
        });
    }

    // Function to highlight the current active menu item
    highlightActiveLink ( id ) {
       let target_link = this.nav_links[id];
       this.active_link.classList.remove('active-link');
       target_link.classList.add('active-link');
       this.active_link = target_link;
                       
    }
    
    // Function to highlight the current active section 
    highlightActiveSection ( section ) {        
        this.active_section.classList.remove('your-active-class');
        section.classList.add( 'your-active-class')
        this.active_section = section;
    }

    // Add class 'active' to section when near top of viewport
    addListeners() {
        document.addEventListener('scroll', (e)=> { this.scrollEvent(e) } );
    }

    //Determine if an element is in the viewport
    inViewport(section) {
        let size = section.getBoundingClientRect();
        return (
            size.top >= 0 &&
            size.left >= 0 &&
            size.bottom <= window.innerHeight &&
            size.right <= window.innerWidth
        );
    }

}

//call the function to create the Navbar.
new Navbar();