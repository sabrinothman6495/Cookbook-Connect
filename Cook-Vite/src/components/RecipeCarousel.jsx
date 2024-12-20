import React from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';
import PropTypes from 'prop-types';
import classes from '../styles/CardsCarousel.module.css';

const Card = ({ image, title, category, onRemove }) => (
  <Paper
    shadow="md"
    p="xl"
    radius="md"
    style={{ backgroundImage: `url(${image})` }}
    className={classes.card}
  >
    <div>
      <Text className={classes.category} size="xs">{category}</Text>
      <Title order={3} className={classes.title}>{title}</Title>
    </div>
    <Button variant="white" color="dark" onClick={onRemove}>
      Remove Recipe
    </Button>
  </Paper>
);

export function CardsCarousel({ recipes, onRemoveRecipe }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const slides = recipes.map((recipe) => (
    <Carousel.Slide key={recipe.id}>
      <Card
        {...recipe}
        onRemove={() => onRemoveRecipe(recipe.id)}
      />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: rem(2), sm: 'xl' }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

CardsCarousel.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveRecipe: PropTypes.func.isRequired,
};

export default CardsCarousel;