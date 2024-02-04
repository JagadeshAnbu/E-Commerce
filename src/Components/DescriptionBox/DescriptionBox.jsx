import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>

        <div className='descriptionbox-navigator'>
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>

        <div className="descriptionbox-description">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                A repellat aspernatur odit necessitatibus culpa ratione 
                veniam aperiam sequi vel minus!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, est quia 
                exercitationem itaque quidem excepturi eos ea ducimus minus odit, 
                reprehenderit laudantium necessitatibus aperiam deleniti at earum tempore iste ipsam.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                A repellat aspernatur odit necessitatibus culpa ratione 
                veniam aperiam sequi vel minus!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, est quia 
                exercitationem itaque quidem excepturi eos ea ducimus minus odit, 
                reprehenderit laudantium necessitatibus aperiam deleniti at earum tempore iste ipsam.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox