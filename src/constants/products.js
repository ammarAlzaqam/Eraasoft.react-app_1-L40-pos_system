import burgerImg from "../assets/products/burger.png";
import pizzaImg from "../assets/products/pizza.png";
import avocadoImg from "../assets/products/avocado.png";
import crispyImg from "../assets/products/crispy.png";

const productsList = [
  {
    id: 1,
    img: burgerImg,
    title: "Classic Wagyu Burger",
    dis: "Organic beef, cheddar, truffle mayo",
    price: 18.5,
  },
  {
    id: 2,
    img: pizzaImg,
    title: "Truffle Margherita",
    dis: "Buffalo mozzarella, fresh basil",
    price: 22.0,
  },
  {
    id: 3,
    img: avocadoImg,
    title: "Avocado Power Bowl",
    dis: "Quinoa, baby spinach, citrus dressing",
    price: 14.2,
  },
  {
    id: 4,
    img: crispyImg,
    title: "Crispy Calamari",
    dis: "Zesty lemon, homemade tartare",
    price: 12.5,
  },
];

export default productsList;
