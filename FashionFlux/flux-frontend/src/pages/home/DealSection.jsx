import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


const Item = styled(Box)(({ theme, background }) => ({
    background: `url(${background}) center/cover no-repeat`,
    padding: theme.spacing(4),
    textAlign: 'start',
    color: '#fff',
    borderRadius: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    gap: theme.spacing(2),
    height: '600px', // Set height
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(5px)',
    backgroundPosition: 'top',
  }));

const DealSection = () => {
  return (
    <section className='py-[3rem]'>
      <h2 className="text-center text-4xl md:text-4xl font-bold mb-6 uppercase text-gray-800">
        Popular Picks
      </h2>
      <p className="section__subheader mb-5 pb-[16px] mx-auto text-gray-500">
        Find your perfect fit from our best categories!
      </p>

      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={0}>
          {/* Oversized T-Shirts Section */}
          <Grid item xs={12} sm={6}>
            <Item background="https://i.pinimg.com/736x/52/72/cc/5272cc7e75c85bc34e2c3a883e85536d.jpg">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">Oversized T-Shirts</h3>
              <p className="text-xl">Explore our collection of comfortable and stylish oversized tees.</p>
              <button variant="contained" className='bg-black text-white px-4 py-3'>
                Explore Tees
              </button>
            </Item>
          </Grid>

          {/* Hoodies Section */}
          <Grid item xs={12} sm={6}>
            <Item background="https://i.pinimg.com/736x/d5/53/ab/d553ab113d3c4695b63ff06119619420.jpg">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">Hoodies</h3>
              <p className="text-xl">Stay cozy and trendy with our premium quality hoodies.</p>
              <button variant="contained" className='bg-white text-black px-4 py-3'>
                Stay Cozy
              </button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default DealSection;
