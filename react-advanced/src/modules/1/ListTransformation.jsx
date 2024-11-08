import React from 'react'

const data = [
  {
    id: 1,
    title: 'Tiramisu',
    description: "Tiramisu is a coffee-flavoured Italian dessert. It is made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese, flavoured with cocoa.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Tiramisu_%282%29.jpg',
    price: 5.99
  },
  {
    id: 2,
    title: 'Pavlova',
    description: "Pavlova is a meringue-based dessert named after the Russian ballerina Anna Pavlova. It has a crisp crust and soft, light inside, usually topped with fruit and whipped cream.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Pavlova_with_raspberries_and_passionfruit.jpg',
    price: 7.99
  },
  {
    id: 3,
    title: 'Cheesecake',
    description: "Cheesecake is a sweet dessert consisting of one or more layers. The main, and thickest layer, consists of a mixture of soft, fresh cheese, eggs, and sugar.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Cheesecake_with_raspberries.jpg',
    price: 6.99
  }
]

// The map method is used to transform the data array into a new array of objects with the desired properties
// It returns a new array with the same length as the original array
const topDesserts = data.map(dessert => {
  return {
    id: dessert.id,
    content: `${dessert.title} - ${dessert.description}`,
    price: dessert.price
  }
})

const ListTransformation = () => {

  console.log(topDesserts);

  // The map method is used to rendera simple list to a react component
  const listItems = data.map(dessert => {
    const itemText = `${dessert.title} - $  ${dessert.price}`
    return <li key={dessert.id}>{itemText}</li>
  })

  return (
    <>
      <h1>Top Desserts</h1>
      <ul>
        {listItems}
      </ul>
    </>
  )
}

export default ListTransformation