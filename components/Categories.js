import React, {useState} from 'react'

function Categories({ categories, setSelectedCategory, selectedCategory }) {
  const [active, setActive] = useState(selectedCategory)

  const handleActive = (id) => {
    setActive(id)
    setSelectedCategory(id)
  }

  return (
    <>
      <ul className='list-group'>
        {categories.map(category => (
          <li
            type="button"
            className={`list-group-item list-group-item-action ${active === category.id ? 'active' : ''}`}
            onClick={() => handleActive(category.id)}
            key={category.id}
          >
            {category.name}
          </li>
        ))}
      </ul>
      
    </>
  )
}

export default Categories