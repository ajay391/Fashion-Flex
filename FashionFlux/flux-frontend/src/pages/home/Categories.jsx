import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";
import category5 from "../../assets/category-5.jpg";
import category6 from "../../assets/category-6.jpg";
import category7 from "../../assets/category-7.jpg";

// Styled component for category cards
const CategoryCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  aspectRatio: "1 / 1", // Makes it a perfect square
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[10],
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: '1px',
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)", 
  },
  "& h4": {
    position: "relative",
    zIndex: 1,
    margin: 0,
  },
}));

const Categories = () => {
  const categories = [
    { id: 1, name: "Tshirts", path: "accessories", image: category1 },
    { id: 2, name: "Oversized-Tshirts", path: "dress", image: category2 },
    { id: 3, name: "Hoodies", path: "jewellery", image: category3 },
    { id: 4, name: "Oversized-Fullsleeve", path: "cosmetics", image: category4 },
    { id: 5, name: "Jeans", path: "cosmetics", image: category5 },
    { id: 6, name: "Polos", path: "cosmetics", image: category6 },
    { id: 7, name: "Shirts", path: "cosmetics", image: category7 },
  ];

  return (

    <section className='px-0 py-10 '>
     <h2 className="text-center text-4xl md:text-4xl font-bold mb-6 uppercase text-gray-800">
      Discover Collections
    </h2>
    <p className='section__subheader mb-5 mx-auto text-gray-500'>Find the best in every category!</p>
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {/* First Row - Two Large Square Categories */}
        {categories.slice(0, 3).map((category) => (
          <Grid item xs={6} sm={4} key={category.id}>
            <Link to={`/categories/${category.path}`} style={{ textDecoration: "none", display: "block" }}>
              <CategoryCard style={{ backgroundImage: `url(${category.image})` }}>
                <h4 className="text-2xl md:text-3xl">{category.name}</h4>
              </CategoryCard>
            </Link>
          </Grid>
        ))}

        {/* Second Row - Two Smaller Square Categories */}
        {categories.slice(3).map((category) => (
          <Grid item xs={6} sm={3} md={3} key={category.id}>
            <Link to={`/categories/${category.path}`} style={{ textDecoration: "none", display: "block" }}>
              <CategoryCard style={{ backgroundImage: `url(${category.image})` }}>
                <h4>{category.name}</h4>
              </CategoryCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>

    </section>
  );
};

export default Categories;
