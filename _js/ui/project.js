import { UI } from '../ui';

let project = {

    changeCover : function(e) {
        const numOfImages = e.target.parentElement.children.length
        const elementWidth = e.target.clientWidth
        const columnWidth = elementWidth / numOfImages
        const rect = e.target.getBoundingClientRect()
        let x = e.clientX - rect.left
        let result = Math.floor(x / columnWidth)
        if (result < numOfImages) {
          setActiveImage(result)
        }
    }


}