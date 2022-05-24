const toast = class Toast {
    constructor({
        top_level_parent,
        position,
        width,
        timing,
        user_action_required,
        type,
        theme,
        colors
    }){
        this.parent = top_level_parent // Id or class of top level parent
        this.position = position // top-right / top-left / bottom-right / bottom-left // top-center // bottom-center
        this.width = width
        this.timing = timing
        this.action_required = user_action_required
        this.type = type
        this.theme = theme
        this.colors = colors
        this.icons = {
            warning:'<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm9.907-6.881c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z" fill-rule="nonzero"/></svg>',
            success:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/></svg>'
        }
    }
    createToastParent(){
        const main = document.querySelector('.main')
        const toastParent = document.querySelector('.toast_parent');
        if(toastParent){
            toastParent.classList = this.positionToast()
            return false
        }
        const newParent = document.createElement('div');
        newParent.classList = this.positionToast();
        main.append(newParent)
    }
    createToast(message){
        this.createToastParent()
        const parent = document.querySelector(`.toast_parent`);
        const toast_kids = parent.children;
        const toast_alert = document.createElement('div');
        const toast_id = `toast_alert_id_`+ Math.floor(Math.random() * 1000)
        toast_alert.id = toast_id;
        toast_alert.className = "toast-"+ this.theme
        toast_alert.textContent = message
        if(!this.action_required){
            const toast_progress = document.createElement('div');
            toast_progress.className= "toast_progress_bar";
            toast_progress.style.backgroundColor =this.colors.progress;
            toast_progress.style.animationDuration = this.timing +"ms"
            toast_alert.append(toast_progress)
        }
        const toast_close = document.createElement('div');
        toast_close.className = "toast_close";
        //toast_close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>';
        toast_close.innerHTML = "close"
        toast_close.addEventListener('click', ()=>{
            this.destroyToast(toast_id);
        })
        toast_alert.append(toast_close);
        if(toast_kids.length === 0 ){
            parent.append(toast_alert);
        }else{
            parent.insertBefore(toast_alert, toast_kids[0])
        }
        if(!this.action_required){
            setTimeout(()=>{
                this.destroyToast(toast_id)
            },parseInt(this.timing.replace('s','')))
        }

    }
    destroyToast(id){
        var to_remove = document.getElementById(id);
        var remove_direction = this.removeToastAnimation()
        to_remove.className = to_remove.className  + ` ${remove_direction}`
        setTimeout(()=>{
            to_remove.remove()
        },3000)
    }
    positionToast(){
        var prefPos = this.position;
        switch(prefPos){
            case "top-left":
                return "toast_parent toast-position-top toast-position-left";
                break
            case "top-right":
                return "toast_parent toast-position-top toast-position-right";
                break
            case "top-center":
                return "toast_parent toast-position-top toast-position-center"
                break
            case "bottom-left":
                return "toast_parent toast-position-bottom toast-position-left";
                break
            case "bottom-right":
                return "toast_parent toast-position-bottom toast-position-right";
                break
            case "bottom-center":
                return "toast_parent toast-position-bottom toast-position-center";
                break    
        }

    }

    removeToastAnimation(){
        var pos = this.position;
        switch(pos){
            case "top-left":
                return "toast_remove_left"
                break
            case "top-right":
                return "toast_remove_right";
                break
            case "top-center":
                return "toast_remove_up"
                break
            case "bottom-left":
                return "toast_remove_left";
                break
            case "bottom-right":
                return "toast_remove_right";
                break
            case "bottom-center":
                return "toast_remove_down";
                break    
        }

    }

    setPosition(pos){
        this.position = pos
    }

    setTheme(theme){
        this.theme = theme.toLowerCase()
    }


}


const toastAlert = new toast({
    top_level_parent:".main", //Main parent wrapper to attach container to 
    position:"top-right", // Position of toast container on screen
    width: "40%", // Width of toast display
    timing: "10000", // Time toast appears until disappear- accepts millisecond value,
    user_action_required:false,
    type:"regular",
    theme:"dark",
    colors:{
        text:"#333",
        progress:"#f44336"
    },

})

window.addEventListener('load', ()=>{
  
})

const testToast=()=>{
    var input = document.getElementById("testInput");
    var value = input.value.replaceAll(" ","");
    if(value.length===0){
        return 
    }
    toastAlert.createToast(input.value , "regular", "")
}

const changePosition =(position)=>{
    var positionCards = document.querySelectorAll('.position_option');
    var pos = position.replaceAll("-","").toUpperCase();

    positionCards.forEach((card)=>{
        card.classList.remove("active_position")
    })
    event.currentTarget.classList = "position_option active_position";
    var sel_pos = event.currentTarget.getAttribute('data-toast-position')
    toastAlert.setPosition(sel_pos);
    toastAlert.createToast("Great you changed your position !", "regular", "")
}

const changeTheme = ()=>{
    var toggle = document.querySelector('.toggle');
    if(toggle.className.includes("light")){
        toggle.classList= "toggle dark-active"
        toastAlert.setTheme("dark")
    }else{
        toggle.classList= "toggle light-active"
        toastAlert.setTheme("light")
    }
}