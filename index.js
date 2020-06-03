module.exports = function(targetElement, repositionTarget = null){
    if(!targetElement || !(repositionTarget instanceof Element))
    return console.warn('Could not modify:', targetElement);
    
    var moveableArea = targetElement.querySelector(repositionTarget);
    
    if(!moveableArea)
    moveableArea = targetElement;

    var isMouseDown = false;
    
    var scale = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    var starts = {
        x: null,
        y: null,
        top: parseInt(targetElement.offsetLeft),
        left: parseInt(targetElement.offsetRight),
        width: parseInt(targetElement.offsetWidth),
        height: parseInt(targetElement.offsetHeight)
    };

    targetElement.addEventListener('mousedown', onMouseDown);
    targetElement.addEventListener('mouseover', onMouseOver);
    moveableArea.addEventListener('mousedown', onMouseDown);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    function onMouseDown(event){
        if(event.target === targetElement){
            //  
        }
    }
    function onMouseOver(event){
        if(event.target === targetElement){
            mouseX = event.clientX;
            mouseY = event.clientY;
            scale.up = starts.y >= starts.top && starts.y <= (starts.top + 10);
            scale.down = starts.y <= starts.top + targetElement.offsetHeight && starts.y >= ((starts.top + targetElement.offsetHeight) - 10);
            scale.left = starts.x >= starts.left && starts.x <= (starts.left + 10);
            scale.right = starts.x <= starts.left + targetElement.offsetWidth && starts.x >= ((starts.left + targetElement.offsetWidth) - 10);
        }
        var cursorString = `${scale.up ? 'n' : ''}${scale.down ? 's' : ''}${scale.left ? 'w' : ''}${scale.right ? 'e' : ''}`;
        targetElement.style.cursor = cursorString === '' ? 'default' : `${cursorString}-resize`;
    }
    function onMouseMove(event){}
    function onMouseUp(event){}
};