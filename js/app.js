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

class Navbar {
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

    init() {
        this.createLinks();      
        this.addListeners();
    }

    createLinks(){
        for(let section in this.sections) {
            
            let link = document.createElement("li");
            let anchornav = document.createElement("a");
            anchornav.style.color = "black";
            anchornav.dataset.section = this.sections[section].id;
            anchornav.innerText = this.sections[section].datanav;
            link.appendChild(anchornav);
            link.addEventListener('click', ()=> {this.clickEvent(this.sections[section].id)} );
            this.nav_links[this.sections[section].id] = link;
            this.addLink(link);
            link.classList.add('menu__link');            

            if ( section === "section1" ) {
                link.classList.add('active-link');
                this.active_link = link;
            }
        }
    }

    addLink(link){
        this.navbarlist.appendChild( link );
    }

    clickEvent (id) {
        let target_section = document.getElementById(id);
        target_section.scrollIntoView({behavior: "smooth"});
        this.highlightActiveLink(id)
        this.highlightActiveSection(target_section);
    }

    scrollEvent (e) {
        this.sections_array.forEach(section => {
            if (this.inViewport(section)) {
                this.highlightActiveLink(section.id);
                this.highlightActiveSection(section);   
            }
        });
    }

    highlightActiveLink ( id ) {

       let target_link = this.nav_links[id];

       this.active_link.classList.remove('active-link');
       target_link.classList.add('active-link');
       this.active_link = target_link;
                       
    }

    highlightActiveSection ( section ) {        
        this.active_section.classList.remove('your-active-class');
        section.classList.add( 'your-active-class')
        this.active_section = section;
    }

    addListeners() {
        document.addEventListener('scroll', (e)=> { this.scrollEvent(e) } );
    }

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

new Navbar();

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active