module.exports = function(targetElement, repositionTarget = null){
    
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

    var start = {
        x: null,
        y: null,
        top: parseInt(targetElement.offsetTop),
        left: parseInt(targetElement.offsetLeft),
        width: parseInt(targetElement.offsetWidth),
        height: parseInt(targetElement.offsetHeight)
    };

    targetElement.addEventListener('mousedown', onMouseDownResize);
    targetElement.addEventListener('mouseover', onMouseOverResize);
    moveableArea.addEventListener('mousedown', onMouseDownMove);
    moveableArea.addEventListener('mouseover', onMouseOverMove);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    function onMouseDownResize(event){
        if(isMouseDown) return;
        if(event.target === targetElement || event.target === moveableArea){
            isMouseDown = true;
            start.x = event.clientX;
            start.y = event.clientY;
        }
    }

    function onMouseDownMove(event){
        if(isMouseDown) return;
        if(event.target === moveableArea || event.target.parentNode === moveableArea){
            isMouseDown = true;
            start.x = event.clientX;
            start.y = event.clientY;
        }
    }

    function onMouseOverResize(event){
        if(isMouseDown) return;
        var cursorString;
        if(event.target === targetElement){
            start.x = event.clientX;
            start.y = event.clientY;
            scale.up = start.y >= start.top && start.y <= (start.top + 10);
            scale.down = start.y <= start.top + targetElement.offsetHeight && start.y >= ((start.top + targetElement.offsetHeight) - 10);
            scale.left = start.x >= start.left && start.x <= (start.left + 10);
            scale.right = start.x <= start.left + targetElement.offsetWidth && start.x >= ((start.left + targetElement.offsetWidth) - 10);
            cursorString = `${scale.up ? 'n' : ''}${scale.down ? 's' : ''}${scale.left ? 'w' : ''}${scale.right ? 'e' : ''}`;
        }
        targetElement.style.cursor = cursorString === '' ? 'default' : `${cursorString}-resize`;
    }

    function onMouseOverMove(event){
        if(isMouseDown) return;
        if(event.target === moveableArea || event.target.parentNode === moveableArea){
            targetElement.style.cursor = 'move';
        } else {
            targetElement.style.cursor = 'default';
        }
    }
    
    function onMouseMove(event){
        if(!isMouseDown)    return;
        var diff = {
            x: event.clientX - start.x,
            y: event.clientY - start.y
        }
        if(scale.up || scale.down || scale.left || scale.right){
            if(scale.up || scale.down){
                if(scale.up){
                    targetElement.style.top = `${start.y + diff.y}px`;
                    diff.y *= -1;
                }
                targetElement.style.height = `${start.height + diff.y}px`;
            }
            if(scale.left || scale.right){
                if(scale.left){
                    targetElement.style.left = `${start.x + diff.x}px`;
                    diff.x *= -1;
                }
                targetElement.style.width = `${start.width + diff.x}px`;
            }
        } else {
            targetElement.style.top = `${start.top + diff.y}px`;
            targetElement.style.left = `${start.left + diff.x}px`;
        }
    }

    function onMouseUp(event){
        if(!isMouseDown)    return;
        start.x = null;
        start.y = null;
        start.top = parseInt(targetElement.offsetTop);
        start.left = parseInt(targetElement.offsetLeft);
        start.width = parseInt(targetElement.offsetWidth);
        start.height = parseInt(targetElement.offsetHeight);

        scale.up = scale.down = scale.left = scale.right = isMouseDown = false;
    }
};